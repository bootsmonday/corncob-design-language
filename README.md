# Corncob Design Language

**A lightweight, accessible, and responsive vanilla JavaScript design system with zero dependencies.**

Built for fast development of enterprise applications and websites. Perfect for hand-coding, AI-assisted development, and teams that want clean, semantic HTML without framework lock-in.

- **100% Vanilla** — No React, Vue, Tailwind, or any runtime dependencies
- **WCAG 2.1 AA** compliant with excellent keyboard and screen reader support
- **Light & Dark Mode** built-in via CSS custom properties
- **Mobile-first** and fully responsive
- **AI-Friendly** — Designed from the ground up for reliable code generation by LLMs

**[Live Component Gallery](https://bootsmonday.github.io/corncob-design-language)** (deploy via GitHub Pages or your preferred host)

## Why Corncob?

Corncob is ideal when you want:

- Maximum performance and minimal bundle size
- Full control over markup and behavior
- AI tools to generate pixel-perfect, accessible UIs using your exact components
- Easy theming without fighting a heavy design system

## Quick Start

### 1. Installation

```bash
npm install @corncob/design-language
```

### 2. Include in Your Project

Option A: Use the compiled CSS and JS files

```html
<link rel="stylesheet" href="node_modules/@corncob/design-language/dist/corncob.css" />
<script src="node_modules/@corncob/design-language/dist/corncob.js"></script>
```

Option B: ES Modules

```javascript
import '@corncob/design-language/dist/design-language.css';
import '@corncob/design-language/dist/design-language.esm.js';
```

## Component Reference

All components use semantic HTML + `corn-*` class names and Web Components. No JavaScript framework required.

- Text Input — `corn-text-input`
- Checkbox / Radio — `corn-checkbox`, `corn-radio`
- Button — `corn-button` with variants like `corn-button--primary`, `corn-button--secondary`, etc.
- Popover — `<corn-popover />` with focus management and ARIA support
- Tooltip — `<corn-tooltip />`
- Button Bar — `<corn-button-bar />` for grouping buttons with proper spacing and responsive stacking
- Panel — `corn-panel`
- Expandable Section — `<corn-expandable />` with smooth height transitions and ARIA attributes
- Panel Menu — `corn-panel-menu`
- Headers / Navigation — `corn-header`
- And more! See the [Component Gallery](https://bootsmonday.github.io/corncob-design-language) for full documentation and examples.

## AI Usage Guide

Corncob is built to work exceptionally well with AI coding assistants (Claude, Cursor, Grok, Copilot, etc.).
Recommended System Prompt
Copy this when asking an AI to build pages with Corncob:

> "You are an expert frontend developer using the Corncob Design Language.
> Use only corn-\* class names and vanilla HTML/JS.
> Never use Tailwind, Bootstrap, or any other CSS framework.
> Prioritize accessibility (WCAG 2.1 AA), semantic HTML, and clean code.
> Use the official component variants and sizes exactly as documented.
> For modals, always include proper focus management and ARIA attributes."

### Example AI Prompts

- "Build a clean marketing landing page using only Corncob components"
- "Create a responsive dashboard layout with sidebar, header, data table, and cards"
- "Make an accessible login form with email, password, remember me toggle, and error states"

### For AI Tools

Download or reference [`components.json`](components.json) — this machine-readable manifest helps AI coding assistants better understand the core components and their common variants (it is not an exhaustive list of every component).

## Development & Contribution

### Instal & Run Locally

```bash
git clone https://github.com/bootsmonday/corncob-design-language.git
cd corncob-design-language
npm install
npm run dev
```

Open http://localhost:5173 — this launches the live component gallery and playground.

### Other Scripts

- npm run build — Build distribution files
- npm test — Run tests
- npm run test:watch — Watch mode
- npm run lint:css — Lint styles
- npm run format — Format code with Prettier

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with improvements, bug fixes, or new components. Please see the component gallery for visual consistency and follow existing patterns for accessibility.

## License

This project is licensed under the Boost Software License. See the [LICENSE](LICENSE) file for details.
