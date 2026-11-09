import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const memoryDir = join(root, "docs", "memory");
const lessonsDir = join(memoryDir, "lessons");

function parseFrontmatter(text) {
  if (!text.startsWith("---")) return { error: "missing frontmatter" };
  const end = text.indexOf("\n---", 3);
  if (end < 0) return { error: "unclosed frontmatter" };
  const data = {};
  let key = null;
  for (const line of text.slice(3, end).split(/\r?\n/)) {
    if (!line.trim()) continue;
    const item = line.match(/^\s+-\s+(.+)$/);
    if (item && key) {
      if (!Array.isArray(data[key])) data[key] = [];
      data[key].push(item[1].trim().replace(/^["']|["']$/g, ""));
      continue;
    }
    const field = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!field) return { error: `bad frontmatter line: ${line}` };
    key = field[1];
    const value = field[2].trim();
    if (value === "" || value === ">") data[key] = [];
    else if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((part) => part.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else data[key] = value.replace(/^["']|["']$/g, "");
  }
  return { data, bodyStart: end + 4 };
}

async function lessonFiles() {
  try {
    const names = await readdir(lessonsDir);
    return names.filter((name) => name.endsWith(".md")).sort();
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function loadLessons() {
  const loaded = [];
  for (const name of await lessonFiles()) {
    const path = join(lessonsDir, name);
    const text = await readFile(path, "utf8");
    const parsed = parseFrontmatter(text);
    loaded.push({ name, path, text, ...parsed });
  }
  return loaded;
}

async function roleLogs() {
  const entries = await readdir(memoryDir, { withFileTypes: true });
  const logs = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name === "lessons") continue;
    const path = join(memoryDir, entry.name, "log.md");
    try {
      const text = await readFile(path, "utf8");
      logs.push({ role: entry.name, path, text });
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  return logs.sort((a, b) => a.role.localeCompare(b.role));
}

function firstEntry(text) {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex((line) => line.startsWith("## "));
  if (start < 0) return "(no dated entry)";
  const chunk = [];
  for (let i = start; i < lines.length; i++) {
    if (i > start && lines[i].startsWith("## ")) break;
    chunk.push(lines[i]);
  }
  return chunk.join("\n").trim();
}

async function commandIndex() {
  const lessons = await loadLessons();
  const blocks = ["# Lesson index", "", "Generated. Do not hand-edit. Re-run `node scripts/memory.mjs index`.", ""];
  if (lessons.length === 0) blocks.push("No lessons.");
  for (const lesson of lessons) {
    if (lesson.error) {
      blocks.push(`- ${lesson.name}: MALFORMED (${lesson.error})`);
      continue;
    }
    const triggers = Array.isArray(lesson.data.triggers) ? lesson.data.triggers.join(", ") : "";
    blocks.push(`- ${lesson.data.id || lesson.name} — ${lesson.data.title || ""} — ${triggers}`);
  }
  blocks.push("");
  await mkdir(memoryDir, { recursive: true });
  await writeFile(join(memoryDir, "INDEX.md"), blocks.join("\n"), "utf8");
  console.log(`index lessons=${lessons.length}`);
}

async function commandReport() {
  const logs = await roleLogs();
  const blocks = ["# Last report", "", "Generated. Do not hand-edit. Re-run `node scripts/memory.mjs report`.", ""];
  if (logs.length === 0) blocks.push("No logs.");
  for (const log of logs) {
    blocks.push(`## ${log.role}`, "", firstEntry(log.text), "");
  }
  await writeFile(join(root, "LAST_REPORT.md"), blocks.join("\n"), "utf8");
  console.log(`report logs=${logs.length}`);
}

async function commandMem(topic) {
  if (!topic) {
    console.error("usage: node scripts/memory.mjs mem <topic>");
    process.exit(1);
  }
  const needle = topic.toLowerCase();
  const hits = [];
  for (const lesson of await loadLessons()) {
    if (lesson.error) continue;
    const triggers = Array.isArray(lesson.data.triggers) ? lesson.data.triggers : [];
    if (triggers.some((trigger) => String(trigger).toLowerCase().includes(needle))) hits.push(lesson);
  }
  if (hits.length === 0) {
    console.log(`no matching lessons for ${topic}`);
    return;
  }
  for (const lesson of hits) {
    console.log(`# ${lesson.data.id} ${lesson.data.title}`);
    console.log(lesson.text.slice(lesson.bodyStart).trim());
    console.log("");
  }
}

async function commandCheck() {
  const lessons = await loadLessons();
  const problems = [];
  for (const lesson of lessons) {
    if (lesson.error) {
      problems.push(`${lesson.name}: ${lesson.error}`);
      continue;
    }
    for (const field of ["id", "date", "title", "status"]) {
      if (!lesson.data[field]) problems.push(`${lesson.name}: missing ${field}`);
    }
    const files = Array.isArray(lesson.data.files) ? lesson.data.files : [];
    for (const file of files) {
      if (file.includes('"') || file.includes("'")) {
        problems.push(`${lesson.name}: quoted files entry ${file}`);
      }
      const target = join(root, file);
      try {
        await readFile(target);
      } catch (error) {
        if (error.code === "ENOENT") problems.push(`${lesson.name}: missing file ${file}`);
        else if (error.code !== "EISDIR") throw error;
      }
    }
  }
  const agents = join(root, "AGENTS.md");
  const claude = join(root, "CLAUDE.md");
  const agentsText = await readFile(agents, "utf8");
  const claudeText = await readFile(claude, "utf8");
  const budget = agentsText.length + claudeText.length;
  console.log(`check lessons=${lessons.length} always_loaded_chars=${budget} problems=${problems.length}`);
  for (const problem of problems) console.log(`PROBLEM ${problem}`);
  if (problems.length > 0) process.exit(1);
}

const [command, arg] = process.argv.slice(2);
if (command === "index") await commandIndex();
else if (command === "report") await commandReport();
else if (command === "mem") await commandMem(arg);
else if (command === "check") await commandCheck();
else {
  console.error("usage: node scripts/memory.mjs <index|report|mem|check>");
  process.exit(1);
}
