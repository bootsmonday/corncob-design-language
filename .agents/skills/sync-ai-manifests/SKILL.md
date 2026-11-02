---
name: sync-ai-manifests
description: Keep Corncob AI catalog files honest after component or token changes. Use when updating components.json, tokens.json, layouts.json, llms.txt, or canonical examples, and after adding or changing a component.
---

# Sync AI manifests

`components.json` is the structured source of truth for AI generation. If it drifts from `src/`, Copilot, Cursor, and Grok will copy the wrong markup.

## When to run

After any change to:

- `src/components/**`
- `src/tokens/**`
- stickersheets or component docs examples
- `components.json`, `tokens.json`, `layouts.json`, `llms.txt`, `llms-full.txt`

## Steps

1. Confirm every folder under `src/components/` is referenced by an `"implemented": true` catalog entry via `sourceDir`.
2. For each shipped component, set `"implemented": true` and copy canonical markup from the stickersheet into `example` / `fullExamples`.
3. For planned components, keep `"implemented": false` and **delete** `example` and `fullExamples`. Do not invent markup.
4. Keep catalog `version`, `tokens.json` `metadata.version`, and `layouts.json` `version` equal to `package.json` `version`.
5. Point token file lists at `src/tokens/*.css`, not a single `src/tokens.css`.
6. If a generation rule changed (grid, canonical-before-enhancement, button `type`, implemented-only), update in this order:
   - `llms.txt` (short rules)
   - `llms-full.txt` (full contract)
   - copy both files to `docs/public/llms.txt` and `docs/public/llms-full.txt`
   - `DESIGN_SYSTEM_FOR_AI.md` and `docs/src/pages/guides/ai-integration.mdx` only if the human guide needs the same rule
7. Do not duplicate `AGENTS.md` into those files. `AGENTS.md` is the in-repo contributor contract.

## Verify

Run `npm test` and fix any `testing/ai-catalog.test.js` failures before finishing.
