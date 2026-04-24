# Corncob Design Language

**A lightweight, accessible, and responsive vanilla JavaScript design system with zero dependencies.**

Built for fast development of enterprise applications and websites. Perfect for hand-coding, AI-assisted development, and teams that want clean, semantic HTML without framework lock-in.

- **100% Vanilla** — No React, Vue, Tailwind, or any runtime dependencies
- **WCAG 2.1 AA** compliant with excellent keyboard and screen reader support
- **Light & Dark Mode** built-in via CSS custom properties
- **Mobile-first** and fully responsive
- **AI-Friendly** — Designed from the ground up for reliable code generation by LLMs

**[Corncob Component Documentation](https://bootsmonday.github.io/corncob-design-language)**

## Why Corncob?

Corncob is ideal when you want:

- Maximum performance and minimal bundle size
- Full control over markup and behavior
- Easy theming without fighting a heavy design system

## Quick Start

### 1. Configure GitHub Packages Registry

```bash
npm config set @bootsmonday:registry https://npm.pkg.github.com
```

If you have not authenticated to GitHub Packages yet, create a GitHub personal access token (classic) with the `read:packages` scope (and `repo` if installing from a private repository), then add it to your npm config:

> Important: Do not commit your token to source control. This command writes to your user-level `~/.npmrc`.

```bash
npm config set //npm.pkg.github.com/:_authToken YOUR_GITHUB_PAT
```

### 2. Installation

```bash
npm install @bootsmonday/corncob-design-language@beta
```

### 3. Include in Your Project

Option A: Use the compiled CSS and JS files

```html
<link rel="stylesheet" href="./corncob-design-language.css" />
<script type="module" src="/assets/corncob-design-language.esm.js"></script>
```

Option B: ES Modules

```javascript
import '@bootsmonday/corncob-design-language/style.css';
import '@bootsmonday/corncob-design-language';
```

### 4. Use Markup

```html
<button class="corn-button">Save</button>
<button class="corn-button corn-button--secondary">Cancel</button>
```

## About Corncob

Corncob Design Language is a design system created by BootsMonday to provide a consistent and cohesive user experience across products. It is built on the principles of simplicity, accessibility, and scalability, and includes components, patterns, and guidelines to help designers and developers create functional interfaces.

### Our Story

Corncob Design Language was born from a need for a unified system across experiments. The goal was consistency with enough flexibility to support the unique needs of each product. After months of research, design, and development, Corncob Design Language launched in early 2026 as a foundation for future experiments.

### Our Tools

- [Vite](https://vitejs.dev/) for fast development and builds
- [Astro](https://astro.build/) for documentation
- [Jest](https://jestjs.io/) for unit testing
- [BackstopJS](https://github.com/garris/BackstopJS) for visual regression testing
- [Axe Core](https://www.deque.com/axe/) for accessibility testing
- [GitHub Actions](https://github.com/features/actions) for automation
- [Copilot](https://github.com/features/copilot) for AI-assisted development
- [Grok](https://grok.com/) for AI-assisted code search and second-opinion checks

### Goals

- Keep the core package vanilla and portable
- Use as much built-in browser functionality as possible
- HTML and CSS first, Web Components and JavaScript as needed
- 10-step color palette to ease accessibility
- Design tokens from primitive, categorical, and component levels

### Documentation

- [Getting Started](https://bootsmonday.github.io/corncob-design-language/getting-started/) - Installation and setup
- [Components](https://bootsmonday.github.io/corncob-design-language/components/) - Component library and examples
- [Tokens](https://bootsmonday.github.io/corncob-design-language/tokens/) - Design tokens and theming
- [Guides](https://bootsmonday.github.io/corncob-design-language/guides/) - Detailed guides for specific use cases
- [AI Integration Guide](https://bootsmonday.github.io/corncob-design-language/guides/ai-integration/) - AI-assisted code generation guidance

## AI Usage Guide

Corncob is built to work exceptionally well with AI coding assistants (Claude, Cursor, Grok, Copilot, etc.).
Recommended System Prompt
Copy this when asking an AI to build pages with Corncob:

> "You are an expert frontend developer using the Corncob Design Language.
> Use only corn-\* class names and vanilla HTML/JS.
> Never use Tailwind, Bootstrap, or any other CSS framework.
> Prioritize accessibility (WCAG 2.1 AA), semantic HTML, and clean code.
> Use the official component variants and sizes exactly as documented.
> Use the Corncob grid for page and section layout unless a component page documents a different internal layout.
> Start from the canonical component code before adding enhancements or custom wrappers.
> For toggles, use fieldset.corn-toggle-group with legend, shared radio name, and matching input id/label for.
> For icon toggles, keep icons inside labels and provide aria-label on .corn-icon.
> For modals, always include proper focus management and ARIA attributes."

### Example AI Prompts

- "Build a clean marketing landing page using only Corncob components"
- "Create a responsive dashboard layout with sidebar, header, data table, and cards"
- "Make an accessible login form with email, password, remember me toggle, and error states"

### For AI Tools

Download or reference [`components.json`](components.json) — this machine-readable manifest helps AI coding assistants better understand the core components and their common variants (it is not an exhaustive list of every component).

If you host the documentation site, publish `llms.txt` and `llms-full.txt` so AI agents and crawlers can discover the grid default, canonical component rules, and implementation priorities without scraping every page.

When generating layouts with Corncob:

- use `corn-container`, `corn-row`, and `corn-col-*` by default
- preserve canonical component structure from the docs before customizing it
- use component-specific internal layouts only when the docs explicitly define them
- use `corn-toggle-group` + `corn-toggles` + `corn-toggle` structure for toggle groups, with shared radio names and matching `id`/`for`

See [`DESIGN_SYSTEM_FOR_AI.md`](DESIGN_SYSTEM_FOR_AI.md) for the full AI integration contract.

## Development & Contribution

### Install & Run Locally

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
