---
layout: ../../layouts/DocsLayout.astro
title: Buttons | Corncob
---

# Buttons

Buttons are built from shared token values and semantic variants.

<div class="docs-demo-row">
  <button class="corn-button">Primary</button>
  <button class="corn-button corn-button--secondary">Secondary</button>
  <button class="corn-button corn-button--danger">Danger</button>
  <button class="corn-button corn-button--sm">Small</button>
  <button class="corn-button corn-button--xl">XL</button>
</div>

## HTML API

```html
<button class="corn-button">Primary</button>
<button class="corn-button corn-button--secondary">Secondary</button>
<button class="corn-button corn-button--danger">Danger</button>
```

## Notes

- Keep class naming token-driven.
- Wrappers should only map props to class names.
