# Corncob Design Language

This file is for coding agents working **in this repository** (Grok, Copilot, Cursor, and others). Downstream UI generation rules live in `DESIGN_SYSTEM_FOR_AI.md`.

## Stack

- Vanilla HTML, CSS, and JavaScript. Prefix all public classes with `corn-`.
- Do not use Tailwind, Bootstrap, utility CSS frameworks, or BEM `__` element names.
- Tokens live in `src/tokens/*.css`. Component tokens live next to each component as `*-tokens.css`.
- Do not hand-edit `dist/` or `docs/public/assets/`.

## Generation contract

When generating or updating Corncob markup:

1. Open `components.json`. Use only entries with `"implemented": true`.
2. Copy the canonical `example` (or a closer `fullExamples` match) before changing content.
3. Place page layout in the Corncob grid (`corn-container`, `corn-row`, `corn-col-*`). Do not rewrite a component's internal DOM to satisfy layout.
4. Always set `type="button"`, `type="submit"`, or `type="reset"` on `<button>` elements.
5. Planned components (`implemented: false`) have no example on purpose. Use `corn-panel` instead of a card, and `corn-message` instead of an alert.

Full contract: `DESIGN_SYSTEM_FOR_AI.md`, `layouts.json`, `llms.txt`, and `docs/src/pages/guides/ai-integration.mdx`.

## Changing this repo

- New or changed product behavior under `src/` needs a `.changelog/*.md` fragment. See `.changelog/README.md`.
- After adding or changing a component or token, follow `.agents/skills/sync-ai-manifests/SKILL.md`.
- To add a component, follow `.agents/skills/add-component/SKILL.md`.

## Commands

- `npm test` — unit tests, including the AI catalog sync check
- `npm run lint:css` — Stylelint
- `npm run changelog:check` — required fragment when `src/` changes
- `npm run dev` — component gallery at http://localhost:5173
- `npm run docs:dev` — documentation site

## Do not

- Invent classes or modifiers that are not in `components.json` or the component CSS.
- Replace Corncob structure with a second layout or CSS system.
- Commit secrets, GitHub Packages tokens, or copies of `~/.grok/auth.json`.
