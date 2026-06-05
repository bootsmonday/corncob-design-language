---
type: Added
scope: css tokens
---

Added `:host` selector to all CSS token files to ensure tokens are available in both global and shadow DOM contexts. This allows components using shadow DOM to access the design tokens without needing to redefine them.
