---
name: add-component
description: Add a Corncob design-system component with tokens, CSS, optional JS, stickersheet, visual test, docs, catalog entry, and changelog fragment. Use when creating a new corn-* component or scaffolding component files.
---

# Add a Corncob component

Work in this repository. Do not generate a React/Vue-first API. Wrappers, if any, stay thin around vanilla markup.

## 1. Name and location

- Folder: `src/components/<plural-or-natural-name>/`
- Public class prefix: `corn-`
- Modifiers use `--`, never BEM `__` (`corn-badge--status`, not `corn-badge__status`)
- Custom element tag, if needed: `corn-<name>`

Look at an existing sibling (buttons, badges, selects) and match that file set.

## 2. Required files

Create:

- `<name>-tokens.css` — component tokens
- `<name>.css` — imports tokens, defines `.corn-<name>` and modifiers
- `stickersheet.html` — canonical markup used by the gallery and visual tests
- `<name>.visual.js` — Backstop scenarios, following a nearby `*.visual.js`

Add JS only when native HTML is not enough:

- `<name>.js` — custom element, then `customElements.define('corn-<name>', ...)`
- `<name>.test.js` — unit tests for behavior

## 3. Register the component

In `src/index.js`:

- import the CSS
- import the JS module if it exists
- re-export the class from `src/components/index.js` when there is a custom element

## 4. Documentation

- Add `docs/src/pages/components/<name>.mdx` using a nearby component page as the template
- Live examples in the MDX must match the stickersheet structure
- Link the page from `docs/src/pages/components.mdx`

## 5. Catalog

Add an `"implemented": true` entry to `components.json`:

- `sourceDir` pointing at the new folder
- `baseClass`, variants, sizes, `jsRequired`, `customElement` when relevant
- `example` copied from the stickersheet (placeholder icons may use `[icon]`)
- Buttons in examples include `type="button"` unless they submit a form

Bump `components.json` `version` only when the package version changes.

Then follow `.agents/skills/sync-ai-manifests/SKILL.md`.

## 6. Changelog

Add `.changelog/YYYY-MM-DD-short-topic.md` with `type: Added` and a `scope`. See `.changelog/README.md`.

## 7. Verify

- `npm test`
- `npm run lint:css`
- `npm run changelog:check`

Do not edit `dist/` by hand.
