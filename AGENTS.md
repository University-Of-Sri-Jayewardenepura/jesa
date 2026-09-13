# Working on JESA

Read [CONTRIBUTING.md](CONTRIBUTING.md) for setup and checks, and
[DESIGN.md](DESIGN.md) for architecture and visual conventions.

## Project boundaries

- Use Bun and commit `bun.lock` with dependency changes. Node 24 is the deployment
  runtime declared in `.nvmrc` and `package.json`.
- Keep Firebase SDKs, authentication, Firestore access, collection contracts, and
  configuration unchanged during general maintenance. A Firebase change requires
  an explicitly scoped maintainer request; a dependency cleanup is not one.
- MongoDB is still used by `/api/register/internal`, `/api/register/external`,
  `/api/getregno`, and the legacy operational scripts. Do not remove Mongoose or
  its sequence plugin merely because the 2026 application uses another store.
- Preserve registration availability, award eligibility, public URLs, and stored
  field names unless the task explicitly changes them.
- Do not run data imports, backups, or submission tests against live applicant
  data as part of routine verification. The existing Playwright submission tests
  can write records; use an isolated test environment for those scenarios.
- Never commit credentials, applicant exports, source office documents, generated
  reports, or scratch scripts. Use ignored `scratch/` for temporary local work.

## Implementation and verification

- Keep Server Components as the default; add client boundaries only for browser
  APIs, state, or interaction. Keep server dependencies out of browser modules.
- Use the existing `@/` alias, shared UI components, Tailwind tokens, and strict
  TypeScript configuration. Prefer explicit types and validation at boundaries.
- Run the local tools through package scripts. Do not use `bunx …@latest` for
  routine checks or apply repository-wide autofixes to an unrelated task.
- Run `bun run lint`, `bun run typecheck`, `bun run test:unit`, and
  `bun run knip`. For dependency or runtime changes, also run `bun run build`.
- Review Knip findings against Next.js entry points and operational scripts before
  deleting anything. Report existing findings separately from regressions.
- Report changes, verification results, and any checks that could not run. Do not
  claim that the in-memory submission simulator validates the real backend.

## Repository skill

For dependency and dead-code maintenance, use
[jesa-maintenance](.agents/skills/jesa-maintenance/SKILL.md). It explains the
compatibility constraints and package review workflow specific to this repository.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
