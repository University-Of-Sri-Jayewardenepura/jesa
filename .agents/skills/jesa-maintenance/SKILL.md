---
name: jesa-maintenance
description: Review and update JESA dependencies, Bun configuration, and Knip findings while preserving active routes and backend contracts. Use for repository maintenance and dead-code cleanup, not backend migrations or routine content edits.
---

# JESA maintenance

Read `AGENTS.md`, `CONTRIBUTING.md`, and `DESIGN.md` at the repository root before
changing dependencies or removing files. Inspect the working tree and the issue
discussion with `gh issue view <number> --comments` when an issue is supplied.

## Compatibility decisions

- The Firebase submission and admin paths are maintained separately from legacy
  MongoDB routes. A generic upgrade request does not retire either backend.
- Preserve Firebase packages and authentication dependency resolutions unless the
  request explicitly scopes their upgrade. Check both `package.json` and the
  resolved entries in `bun.lock`; named package updates can still move transitive
  dependencies. Avoid regenerating the lockfile from scratch.
- The 2026 service reads `result.error.errors`. Zod 4 removes that alias; retaining
  Zod 3 is necessary when the submission service must remain unchanged.
- `mongoose-sequence` implements legacy applicant numbering. Before a Mongoose
  major upgrade, inspect its hook compatibility and test registration-number
  behavior with an isolated database. Type checking alone is insufficient.

## Dependency and dead-code review

Use `bun outdated` and upstream package metadata to identify stable releases.
Update named dependencies with the repository's minimum release age enabled.
Check peer dependencies and Node engine support, then inspect the resulting lock
diff. Keep `bun.lock` canonical and use local package scripts for checks.

Run `bun run knip` and trace each finding before deleting it. Next.js route files
are entry points even without imports or navigation links. Package scripts and
`data/verify-database.ts` are maintained manual entry points. Distinguish generated
output from maintained data tooling. Record narrow, explained exceptions instead
of hiding entire directories or using automatic dead-code deletion.

Run lint, type checking, unit tests, and a production build for dependency changes.
Verify `bun install --frozen-lockfile` leaves the manifest and lock unchanged.
Browser submission tests require an isolated environment: they can create records.
Report the scope actually tested and unresolved findings; the in-memory submission
simulator does not exercise Firebase. Never run operational data commands as a
generic verification step.
