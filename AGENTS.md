# AGENTS.md — Bunny AI family

Working agreement for sessions on `https://github.com/AnfalHaider/bunny-ai`. Daily work is branch `Dev`. Harness code rules for a pure upstream tree are on branch `harness` in `AGENTS.md`. This file on `Dev` is the family agreement. When the two disagree about a code change, read `git show harness:AGENTS.md` before editing harness packages.

The long form is the store playbook: `C:\Users\anfal\AppData\Local\Cursor\AgentStores\cursor_agent_stores\bc-a83c409a-a6a8-4ab8-b264-7a6f67cadec9\files\docs\session-family-playbook.md`. The bootstrap record is beside it as `bootstrap-environment.md`. If those two disagree with this file, the playbook wins. This file is the short copy a session restates.

Research has not started. Do not start it in this setup.

## What this is

A family of eight sessions around a harness Anfal can change. The repo is `https://github.com/AnfalHaider/bunny-ai`. The legacy IDE folder is read-only and is not the target. Daily commits do not go to `https://github.com/AnfalHaider/deepseek-harness`. That repo is the GitHub fork used only to update `harness`.

Accepted 2026-11-09:

| Branch | Role |
| --- | --- |
| `harness` | Receives updates from `deepseek-ai/deepseek-harness` only. No family files. |
| `Dev` | Daily work. Harness updates merge here first. Family files live here. |
| `main` | Stable. Updated only by promoting `Dev`. |

| Remote | URL | Rule |
| --- | --- | --- |
| `origin` | `https://github.com/AnfalHaider/bunny-ai` | Push `Dev` for daily work. Promote to `main` only as a fast-forward or merge from `Dev`. Never force-push `main` or `Dev`. |
| GitHub fork | `https://github.com/AnfalHaider/deepseek-harness` | Parent is `deepseek-ai/deepseek-harness`. This is how `harness` is updated. No local upstream remote is required. |

## Updating `harness`

GitHub will not add a parent to `bunny-ai` after creation. Setting `parent` left `fork: false` and `parent: null`.

`https://github.com/AnfalHaider/deepseek-harness` is a real fork of `https://github.com/deepseek-ai/deepseek-harness`. Its default branch is `master`. `bunny-ai`'s `harness` branch points at that same commit and stays free of family files.

From a clone of `bunny-ai`, this updates `harness` from upstream. It does not use a local upstream remote and it does not use a local deepseek-harness checkout:

```
cmd /c "gh repo sync AnfalHaider/deepseek-harness && git fetch https://github.com/AnfalHaider/deepseek-harness.git master:harness && git push origin refs/heads/harness:refs/heads/harness"
```

`gh repo sync` fast-forwards the fork from its parent. The fetch maps the fork's `master` onto local `harness`. The push moves only `bunny-ai`'s `harness`. Do not add `--force`. Merge `harness` into `Dev` when daily work should take the update. `main` changes only when `Dev` is promoted.

## Operating rules

Each rule keeps the failure that produced it.

**Evidence, or UNKNOWN.** "Done" needs the command, the output, and the file. A report from a helper is not proof until the Chief of Staff checks the diff. *Why:* helpers have reported fixes that were not in the tree.

**One gate, the one the harness already has.** Before a push to `origin` `Dev`, follow `.agents/skills/dsh-pre-push-checks` and run the checks that match the surface. Do not default to the full suite. There is no `npm run verify` here. *Why:* a prose list gets skipped, and a second full-suite command would contradict the harness.

**Design before build, when a person will look at a screen.** Today beside the proposal, both themes, phone and desktop, using `dsh-client-ui-ux` and `dsh-responsive-ui`. Then build that. *Why:* builds from a sentence were rebuilt; builds from a drawing went in once.

**One coordinator.** Anfal talks to the Chief of Staff. Builders build from a written spec. Release Ops holds the live key, once a live target exists, and only on `release <scope>` typed in its chat. *Why:* relayed releases have shipped unreviewed work.

**Tour the data before a rule, when there is data.** This family folder has none. Do not invent a database. The legacy tree is not a data source to query for figures. *Why:* the costly surprises on the original project were data, not code.

**Live commands are written first.** No server is named. If one is named later, the exact command is shown and waits, then logged with the server time. Credentials never go on the command line. *Why:* a read-only command is the one most often pasted wrong.

**Docs stay next to the change they describe.** Harness doc rules in the harness `AGENTS.md` apply when harness docs change. This family does not add a screenshot farm. *Why:* docs written later die.

**A walk after a batch that changes screens.** Use the harness's own browser check for that surface, not a new crawler. *Why:* a green unit run has hidden a broken screen before.

**Rules can carry dates.** The HIGH-go rule below is dated. Do not argue it without the date. *Why:* an undated rule gets relitigated every time it bites.

**HIGH go, 9 Nov 2026.** Schema, auth, credentials, session format, persistence, and deploy need Anfal's go: typed in the building session, or carried by the Chief of Staff with his exact words and the date. `release` and `apply` are never carried. *Why:* the playbook's dated rule overrides the bootstrap line that says a relayed word never counts. Release words stayed unrelayed because a relayed release is how unreviewed work ships.

**Sign-off before any code push.** QA, Design when a screen changed, Librarian, Chief of Staff. Then `origin` branch `Dev` only. *Why:* commits reached the shared branch before anyone looked.

**Do not link `node_modules`.** When a code task exists, one worktree, its own install. Not now. *Why:* a linked dependency folder tested the wrong tree.

**Do not push `upstream`, `main` from a feature commit, or taskmasterx.** `main` moves only when `Dev` is promoted. Never force-push. *Why:* the wrong push is not recoverable by deleting a branch.

## Roster

| Role | Does | Never |
| --- | --- | --- |
| Chief of Staff | Anfal's only contact. Tasks, assignment, diff re-read, board. | Live push, server commands, deciding for him, starting research early |
| Librarian | Lessons, register, board hygiene, memory script. | Code, decisions, blocking |
| Researcher | File-and-line facts, options, trade-offs. Not started. | App code, writes |
| Design | Artifacts and built-screen sign-off, harness UI skills only. | Code, a second design system |
| Builder | Approved spec, small commits on `Dev`, proof. | `upstream`, `harness` family-file edits, push before sign-off, legacy tree |
| QA | Checks written beforehand. Findings, not fixes. | Code fixes, live writes |
| Release Ops | Live key, only after a live target exists. | Hotfixes, relayed release, any push now |
| Hotfix | Live breakage, cloud only, `apply` in its chat. Not started. | Features, running on this PC |

Model routing: strongest for Chief of Staff, mid for the working sessions, cheapest for the Librarian. Host not chosen. Remote Control on when a local session is actually opened. None is open.

Hand-overs: `plans/sessions/`. Start prompt: `plans/sessions/coordinating-handover.md`.

## Memory

```
node scripts/memory.mjs index
node scripts/memory.mjs report
node scripts/memory.mjs mem <topic>
node scripts/memory.mjs check
```

One log per role under `docs/memory/<role>/log.md`. Newest entry on top. Only that role appends after the setup line. Lessons, when any exist, are one immutable file each. `INDEX.md` and `LAST_REPORT.md` are generated. On conflict, re-run the script.

## Plugins and skills

Installed in this folder: the `family-session` skill and the memory script. Nothing else.

Used in place, not copied: the harness skills named in the playbook, and Ponytail already present in Cursor. Rejected: Laravel tooling, a second UI kit, a new Playwright dependency, Firecrawl, paid APIs, eight harness worktrees. Blocked: harness pnpm pin mismatch, unset `DEEPSEEK_API_KEY`, no live target.

## Decisions recorded 2026-11-09

Anfal confirmed this layout. These are binding.

| Topic | Decision |
| --- | --- |
| Branches | `harness` tracks upstream only. `Dev` is daily work. `main` is stable and moves only by promoting `Dev`. |
| Repo | Family files are committed on `Dev` in `AnfalHaider/bunny-ai`. |
| Upstream | `deepseek-ai/deepseek-harness` is the parent of `AnfalHaider/deepseek-harness`. Update `harness` with the command in "Updating harness". |
| Not daily work | Do not commit project work on `AnfalHaider/deepseek-harness`. Do not touch the legacy IDE tree or taskmasterx. |
| Secrets | Do not commit secrets. `DEEPSEEK_API_KEY` stays unset. |
| Gate | `.agents/skills/dsh-pre-push-checks` plus the tests for the surface being changed. |
| pnpm | Do not reinstall. The harness pins `pnpm@11.28.5`. |
