---
applyTo: "**/*.{ts,tsx,js,jsx}"
---

# JESA contributor instructions

Read the repository's `AGENTS.md`, `DESIGN.md`, and `CONTRIBUTING.md` before making
changes. Those files define the maintained architecture, backend boundaries,
validation commands, and contribution workflow.

Use Bun with the committed `bun.lock`, strict TypeScript, existing shared UI
components, and the configuration in `biome.jsonc`. Use `bun run check` and
`bun run fix <path>` for the installed formatter; do not download a new tool version
for each run.

For dependency or dead-code maintenance, read
`.agents/skills/jesa-maintenance/SKILL.md`. Check framework and operational entry
points before deleting code. General maintenance must preserve Firebase and the
active MongoDB routes. Run appropriate local checks and report their actual results.
