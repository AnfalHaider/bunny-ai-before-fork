# AGENTS.md

Guidance for AI agents working in the **bunny-ai** repository.

## Project overview

**Bunny AI** is a greenfield project. As of the initial commit, the repository contains only a `README.md` with the project name — no application source, dependency manifests, Docker configuration, CI workflows, or test suites.

When application code is added, update this file with stack-specific run, test, and lint commands.

## Repository layout

```
/workspace/
├── README.md    # Project title and tagline
└── AGENTS.md    # Agent guidance (this file)
```

## Development commands

| Task | Command | Status |
|------|---------|--------|
| Install dependencies | *(none defined)* | N/A — no package manager lockfile |
| Lint | *(none defined)* | N/A |
| Test | *(none defined)* | N/A |
| Build | *(none defined)* | N/A |
| Run (dev) | *(none defined)* | N/A |

## Git hooks

No custom pre-commit or pre-push hooks are configured. Only default Git sample hooks exist under `.git/hooks/`.

## Cursor Cloud specific instructions

### Current state

This repository is **README-only**. There are no services to start, no ports to bind, and no environment variables or secrets required for local development.

### VM update script

The startup update script is a no-op (`true`) because there are no dependencies to refresh. When a package manager lockfile is added (e.g. `package-lock.json`, `pnpm-lock.yaml`, `uv.lock`), update the VM update script to run the appropriate install command.

### When application code lands

1. Identify the package manager from the lockfile and run its install command.
2. Read `README.md` (or `CONTRIBUTING.md`) for run/test/lint instructions and add them to the table above.
3. Document required services (database, Redis, etc.) in this section — including startup order and non-obvious caveats.
4. Replace the no-op update script with the minimal dependency-refresh command only (not service startup).

### Sanity checks (current repo)

To verify the workspace is usable before any app code exists:

```bash
git status
test -f README.md && head README.md
```

Both commands should succeed from `/workspace`.
