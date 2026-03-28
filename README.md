# Corncob Design Language

# Project is in progress, but here is a quick overview of the project:

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
npm install @corncob/design-language
```

## Usage

### Via CDN/Script Tags

```html
<link rel="stylesheet" href="node_modules/@corncob/design-language/dist/design-language.css" />
<script src="node_modules/@corncob/design-language/dist/design-language.js"></script>

<button class="corn-button corn-button--primary">Click me</button>
```

### Via ES Modules

```js
import '@corncob/design-language/dist/design-language.css';
import '@corncob/design-language/dist/design-language.esm.js';
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
