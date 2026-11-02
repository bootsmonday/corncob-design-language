@AGENTS.md

# Copilot instructions

Follow `AGENTS.md` for all work in this repository.

- Use only vanilla HTML/CSS/JS and `corn-*` classes. Never Tailwind or Bootstrap.
- When generating UI, open `components.json` and use only `"implemented": true` entries. Copy the canonical `example` before enhancing.
- Always set `type="button"`, `type="submit"`, or `type="reset"` on buttons.
- Planned components (`card`, `tabs`, `table`, `alert`, `avatar`) have no markup. Use `corn-panel` instead of a card and `corn-message` instead of an alert.
- Do not hand-edit `dist/` or `docs/public/assets/`.
- `src/` changes need a `.changelog/*.md` fragment.

For adding a component, follow `.agents/skills/add-component/SKILL.md`.
For catalog updates after component or token changes, follow `.agents/skills/sync-ai-manifests/SKILL.md`.
