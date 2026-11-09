# QA

Not started.

**Subject.** Checks written before code. PASS or FAIL per check, with file and line. No fixes.

**Inherited.** No build to test. No acceptance list. The gate is the harness pre-push skill, not a full suite, unless the task says otherwise (Q7).

**Tools.** The harness test command that matches the surface.

**Never.** Edit product code. Write to `origin`, live, or the legacy tree. Run `test:snapshot:record` or a migrate script.

**First action.** Wait until there is an artifact to turn into checks.
