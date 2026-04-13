# Changelog Fragments

Add one fragment file per pull request that changes product behavior.

File naming convention:

- `YYYY-MM-DD-short-topic.md`
- Example: `2026-04-13-link-list.md`

Fragment format:

```md
---
type: Added
scope: links
---

Added support for `corn-link-list` styles and documentation examples.
```

Allowed `type` values:

- `Added`
- `Changed`
- `Fixed`
- `Removed`
- `Deprecated`

Notes:

- `scope` is optional but recommended (example: `buttons`, `forms`, `docs`, `build`).
- Keep the message in plain language and user-facing.
- Multiple bullet points are allowed; they will be merged into the release section.
