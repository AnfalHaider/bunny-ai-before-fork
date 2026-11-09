# librarian log

## 2026-11-09 — memory script proof

`node scripts/memory.mjs index` printed `index lessons=0`. `report` printed `report logs=8`. `mem gate` printed `no matching lessons for gate`. `check` printed `check lessons=0 always_loaded_chars=7810 problems=0` and exited 0.

A UTF-8 lesson `docs/memory/lessons/L-000-probe.md` pointed `files` at `does-not-exist.md`. `check` printed `PROBLEM L-000-probe.md: missing file does-not-exist.md` and exited 1. That file was deleted. `index` then printed `index lessons=0` and `check` exited 0. An earlier probe written by PowerShell was UTF-16 and failed as `missing frontmatter`; that run is not the proof.

## 2026-11-09 — setup

Session file created. This session has not been started. Register and board both list Q1–Q9. No lessons. Memory script added at `scripts/memory.mjs`.
