---
layout: ../layouts/DocsLayout.astro
title: Getting Started | Corncob
---

# Getting Started

## Install

```bash
npm install @corncob/edl
```

### Optional framework wrappers

```bash
npm install @corncob/edl-react
npm install @corncob/edl-vue
```

## Include Styles

```js
import '@corncob/edl/style.css';
```

## Use Markup

```html
<button class="corn-button">Save</button>
<button class="corn-button corn-button--secondary">Cancel</button>
```

## React Wrapper

```jsx
import '@corncob/edl/style.css';
import { CcButton } from '@corncob/edl-react';

export function Example() {
  return <CcButton variant="danger">Delete</CcButton>;
}
```

## Vue Wrapper

```js
import '@corncob/edl/style.css';
import { CcButton } from '@corncob/edl-vue';
```

## Development and Build

```bash
npm run docs:dev
npm run docs:build
npm run docs:preview
```

Production files are generated into `dist-docs/`.
