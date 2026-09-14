# Contributing to JESA

## Setup

Install Git, Node 24 (see `.nvmrc`), and the Bun version recorded in
`package.json`'s `packageManager` field. Then:

```sh
git clone https://github.com/University-Of-Sri-Jayewardenepura/JESA.git
cd JESA
bun install --frozen-lockfile
cp .env.example .env.local
bun run dev
```

Use the existing environment template and obtain development credentials from a
maintainer when exercising backend features. Keep local environment files private.
The public pages can be developed without running database import or export jobs.
Open [localhost:3000](http://localhost:3000).

## Checks

```sh
bun run lint
bun run typecheck
bun run test:unit
bun run knip
bun run build
```

`lint` and `check` use the same installed Biome version. `fix` applies Biome fixes;
pass explicit file paths for a focused change. The unit test command runs the
colocated Bun tests without starting a database. The service tests simulate
submission in memory, so they do not establish production backend correctness.

For browser work, install Chromium with `bunx --no-install playwright install chromium`
and run `bun run test:e2e` against an isolated test environment. Some existing tests
submit applications. Do not run the full suite with production credentials. For a
layout-only change, run the relevant non-submitting scenarios by title.

## Dependency updates

- Use Bun exclusively for dependency installation. `bun.lock` is the canonical
  lockfile; do not add npm, Yarn, or pnpm lockfiles.
- Review `bun outdated`, upstream release notes, engine requirements, and peer
  dependencies. Update named packages, not the entire graph indiscriminately.
- `bunfig.toml` disables runtime auto-install, saves exact versions for new
  additions, and delays new resolutions by three days. Existing locked versions
  are not re-aged. Do not bypass the delay by default.
- Review any dependency lifecycle script before adding its package to
  `trustedDependencies`. An explicit empty list disables Bun's default trusted
  package list; build verification must confirm optional native packages work.
- Use local pinned executables for checks; do not fetch a fresh formatter on every
  run. Commit manifest and lockfile changes together, then verify a frozen install.
- Preserve Firebase SDKs and authentication dependencies during general updates.
  Keep Zod 3 while the unchanged submission service uses `ZodError.errors`.
- Keep Mongoose on its compatible major until the sequence plugin and legacy
  routes are verified against a major upgrade. It is not an unused dependency.
- Keep Lucide below 1.0 while existing pages use its removed brand icons. Updating
  those icons is a separate UI change, including the sign-in page.

See [Bun install security settings](https://bun.sh/docs/pm/cli/install) and
[Knip configuration](https://knip.dev/overview/configuration) for tool behavior.
Knip findings require review: an unlinked page can still be a public route, and a
CLI script can be a maintained entry point. Avoid blanket ignore patterns.

## Operational scripts and local files

The `backup`, `data`, `contacts`, and `regtable` commands are maintained legacy
operations, not build steps. `data/verify-database.ts` is a manual verification CLI.
Inspect their source, paths, and database target before running them. Import and
export workflows must be explicitly requested and use the intended dataset.

Keep scratch scripts and local source documents in ignored `scratch/`. Applicant
backups, generated contacts/CSVs, environment files, Playwright reports, and local
Word documents must not enter commits. Maintained structured faculty content lives
under `constants/`.

## Pull requests

Reference the issue, explain the resulting behavior and compatibility decisions,
and list checks with their actual outcomes. Include screenshots for visual changes
and relevant test cases for changed business behavior. Keep unrelated formatting,
data migrations, dependency upgrades, and authentication changes out of the diff.
Read [DESIGN.md](DESIGN.md) and [AGENTS.md](AGENTS.md) before a larger refactor.
