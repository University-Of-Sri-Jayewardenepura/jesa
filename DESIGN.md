# JESA architecture and design

JESA is the public awards website and application administration interface for
the Career Skills Development Society, University of Sri Jayewardenepura.

## Application structure

The Next.js App Router lives in `app/`. Route groups organize layouts without
changing URLs:

| Location | Responsibility |
| --- | --- |
| `app/(site)/` | Public pages, awards, hall of fame, magazine, registration |
| `app/(site)/register/2026/` | Current multi-step application UI, schema, submission service and unit tests |
| `app/(admin)/` | Sign-in and administration layouts, dashboard and request UI |
| `app/admin/` | Shared admin authentication provider and server utilities |
| `app/api/admin/` | Admin application and access-management endpoints |
| `app/api/register/`, `app/api/getregno/` | Legacy MongoDB registration and registration-number endpoints |
| `components/ui/` | Shared Radix/shadcn-based UI primitives |
| `components/core/` | Animation and analytics components |
| `constants/` | Award, faculty, sponsor and other maintained content |
| `lib/`, `models/` | Infrastructure adapters, shared helpers, legacy Mongoose models |
| `data/` | Maintained operational import/export and verification commands |
| `e2e/` | Playwright browser tests |

The `@/` import alias points to the repository root. Keep route-specific code close
to its route; extract shared code only when it has multiple consumers or a clear
independent responsibility.

## Data boundaries

The 2026 form validates with the Zod business schema, then uses its existing
Firebase submission service. Administration uses the existing authentication and
server-side Firebase adapters. These interfaces and their dependency versions are
outside the scope of general repository maintenance.

Legacy internal/external registration and registration-number lookup still call
MongoDB through `lib/mongodb.ts`. The Mongoose models and `mongoose-sequence` are
therefore live dependencies. Their retirement needs a separate decision covering
public routes, historical data, and operational tooling.

Faculty registration formats, university email rules, and degree choices are
maintained in `constants/faculty-information.json` and its TypeScript helpers. The
root Word document was a local source artifact, not runtime input.

The `/register` page currently announces closure. `/register/new` redirects to
`/register/2026`, whose form remains directly reachable. Preserve this distinction
when refactoring; changing registration availability is a product decision.

## UI conventions

`app/globals.css` defines the dark purple and gold palette, gradients, typography,
and component tokens. Tailwind's slate and blue names are remapped to the brand
palette, so their rendered colors differ from Tailwind defaults. Reuse semantic
tokens such as `background`, `primary`, `muted`, `border`, and `ring`.

Use `components/ui/` before adding another primitive. Keep keyboard interaction,
visible focus, input labels, validation messages, and narrow-screen layouts usable.
Use Lucide for icons and Motion for existing animation patterns. Prefer Server
Components for static content and narrow client boundaries for interaction.

## Quality tooling

Bun owns dependency resolution through `bun.lock`; Node runs Next.js in deployment.
Biome owns formatting and linting using `biome.jsonc`. Knip discovers framework,
test, and command entry points before reporting unused code and dependencies.
TypeScript remains strict. Unit tests cover validation and an in-memory submission
simulator; browser submission tests require an isolated backend.
