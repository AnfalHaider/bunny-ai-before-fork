# Board

Setup wrote this on 2026-11-09. No code row is open. Research has not started.

## Ownership

| Area | Session | Notes |
| --- | --- | --- |
| Family files in `D:\Projects\Bunny AI IDE\Bunny AI` | Chief of Staff, then the session named on the row | Not a git repo yet |
| Harness code in `D:\Projects\Bunny AI IDE\deepseek-harness` | Builder after sign-off, pushes only to `fork` | `origin` is upstream. Do not push it |
| Legacy IDE | nobody | Read only, and only if a task names it |
| Live | Release Ops, later | No live target named |

## QUESTIONS

### Q1 — 2026-11-09 — Branches

Anfal confirmed the layout on 2026-11-09. `harness` receives deepseek-ai/deepseek-harness only. `Dev` is daily work. `main` is stable and is updated only by promoting `Dev`. No separate production deploy was named.

Status: ANSWERED.

### Q2 — 2026-11-09 — What is real?

Which folders and services hold real people, money, or private sessions?

Recommendation: treat the legacy IDE folder and any harness session data already on this PC as real and read-only. The family folder has no customer data. No database was set up.

Status: UNANSWERED.

### Q3 — 2026-11-09 — What stays on this machine?

What must never leave this machine?

Recommendation: do not commit `.env`, API keys, or screenshots of real sessions. Do not publish the legacy tree.

Status: UNANSWERED.

### Q4 — 2026-11-09 — Upstream push URL

On the bunny-ai clone, `upstream` is `https://github.com/deepseek-ai/deepseek-harness` and its push URL is disabled. The separate checkout `D:\Projects\Bunny AI IDE\deepseek-harness` was not modified.

Status: ANSWERED.

### Q5 — 2026-11-09 — Where do family files live in git?

Anfal said to set up `https://github.com/AnfalHaider/bunny-ai`. Family files are committed on `Dev` only.

Status: ANSWERED.

### Q6 — 2026-11-09 — Which pnpm?

The harness pins `pnpm@11.28.5`. This machine's `pnpm` is 12.3.4. `corepack` is not on PATH. The checkout's pnpm shim failed (missing `node_modules\pnpm\bin\pnpm.mjs`).

Recommendation: do not run `pnpm install` or delete `node_modules` until you choose.

Status: UNANSWERED.

### Q7 — 2026-11-09 — What is the gate?

Is the gate the harness skill `dsh-pre-push-checks` plus the tests for the surface you changed, or do you want one new command?

Recommendation: keep the harness skill. Do not add `npm run verify`.

Status: UNANSWERED.

### Q8 — 2026-11-09 — Who hosts the sessions?

Claude Code nested sessions, or Cursor? You open Chief of Staff. Setup did not launch anyone, so Remote Control was not toggled.

Recommendation: you open Chief of Staff in the host you want. Use the prompt in `plans/sessions/coordinating-handover.md`.

Status: UNANSWERED.

### Q9 — 2026-11-09 — API key

`DEEPSEEK_API_KEY` is unset in the environment that ran setup. How should a later task supply it when `dsh` needs it?

Recommendation: you write a gitignored env file in the harness checkout. Do not paste the value into chat.

Status: UNANSWERED.

## OPEN

None.

## DONE

| Row | What | Sha |
| --- | --- | --- |
| SETUP-2026-11-09 | Family files, fork remote, playbook and bootstrap in the store. No research. No harness edits. | none — family folder is not a git repo. Fork head matches checkout `fcc0ad462172522aaf5c93a7b2e01f6b9f0b0159`. |
