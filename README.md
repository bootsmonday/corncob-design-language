# Corncob DL (Design Language)

# Currently Vaporware

A lightweight, accessible, and responsive vanilla JavaScript design system with no dependencies. Built for enterprise applications with a focus on accessibility, performance, and modern CSS features.

## Features

- 🎨 **100% Vanilla JavaScript** - No frameworks or libraries
- ♿ **Fully Accessible** - WCAG 2.1 AA compliant
- 🌓 **Light & Dark Mode** - Built-in theme support
- 📱 **Mobile-First** - Responsive design
- 🚀 **Zero Dependencies** - Pure vanilla JS, HTML5, CSS3
- 📦 **npm-Ready** - Immediately publishable package

## Installation

```bash
npm install @corncob/edl
```

## Usage

### Via CDN/Script Tags

```html
<link rel="stylesheet" href="node_modules/@corncob/edl/dist/edl.css" />
<script src="node_modules/@corncob/edl/dist/edl.js"></script>

<button class="cob-button cob-button--primary">Click me</button>
```

### Via ES Modules

```js
import '@corncob/edl/dist/edl.css';
import '@corncob/edl/dist/edl.esm.js';
```

## Components

- **Button** - Multiple variants (primary, secondary, outline, ghost, danger) and sizes
- **Input** - Text input with label, error message, prefix/suffix icons
- **Textarea** - Resizable textarea with validation support
- **Select** - Custom dropdown with keyboard navigation
- **Checkbox & Radio** - Single and grouped selections
- **Toggle/Switch** - Binary toggles
- **Card** - Container with header, footer, media sections
- **Modal/Dialog** - Accessible modal with focus trap and esc handling
- **Tabs** - Horizontal tabs with underline style
- **Table** - Striped tables with hover states
- **Tooltip** - CSS-based tooltips with fallbacks
- **Alert/Banner** - Success, info, warning, error variants
- **Badge** - Accent badges and pills
- **Avatar** - User avatars with initials support

## Design Tokens

The design system uses CSS custom properties for easy customization:

```css
/* Colors */
--color-primary: #007bff;
--color-secondary: #6c757d;
--color-success: #28a745;
--color-danger: #dc3545;

/* Typography */
--font-family: Inter, ui-sans-serif, system-ui, sans-serif;
--font-size-base: 1rem;

/* Spacing */
--spacing-unit: 12px;

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
```

Customize by overriding in your CSS:

```css
:root {
  --color-primary: #ff6b6b;
  --spacing-unit: 16px;
}
```

## Dark Mode

Enable dark mode by adding `[data-theme="dark"]` to the root element:

```html
<html data-theme="dark">
  <!-- Content -->
</html>
```

Or use automatic detection:

```js
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
```

## Development

### Install Dependencies

```bash
npm install
```

### Run Dev Server

```bash
npm run dev
```

Visit http://localhost:5173 for the component gallery.

### Build Distribution

```bash
npm run build
```

### Run Tests

```bash
npm test
npm run test:watch
```

### Lint CSS

```bash
npm run lint:css
```

### Format Code

```bash
npm run format
```

## Component Gallery

The `public/index.html` file showcases all components and serves as both documentation and a playground for development.

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## License

MIT © 2026 Corncob
