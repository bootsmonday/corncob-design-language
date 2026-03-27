---
layout: ../layouts/DocsLayout.astro
title: Getting Started | Corncob
---

# Getting Started

## Install

```bash
npm install @corncob/design-language
```

## Include Styles

This contains the base styles for all the components and design tokens. You can also import individual component styles if you want to reduce the amount of CSS included in your project.

```js
import '@corncob/design-language/style.css';
```

HTML version:

```html
<link rel="stylesheet" href="./corncob-design-language.css" />
```

## Include Scripts

You can also include the JavaScript file for any components that require behavior. This is optional and only needed for components that have interactive behavior.

```js
import '@corncob/design-language';
```

HTML version:

```html
<script type="module" src="/corncob-design-language.esm.js"></script>
```

## Use Markup

```html
<button class="corn-button">Save</button>
<button class="corn-button corn-button--secondary">Cancel</button>
```
