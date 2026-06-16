## Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Entries are generated from markdown fragments in `.changelog/` using
the "Changelog Release" GitHub Actions workflow.

## [Unreleased]

## [0.1.1] - 2026-06-16

### Fixed

- popovers: - Fixed popovers throwing on outside clicks in some browsers. - Adjusted popover width to fit its content.


## [0.1.0] - 2026-06-15

### Fixed

- popovers: Fixed issue where popover would close when nested in the shadow DOM of another component.


## [0.0.10] - 2026-06-11

### Fixed

- popovers: Fixed popovers not opening when their trigger was clicked, and ensured focus returns to the trigger when the popover is closed.


## [0.0.9] - 2026-06-05

### Added

- css tokens: Added `:host` selector to all CSS token files to ensure tokens are available in both global and shadow DOM contexts. This allows components using shadow DOM to access the design tokens without needing to redefine them.

## [0.0.8] - 2026-05-26

- not published

## [0.0.7] - 2026-05-19

### Fixed

- shadow-dom: - Fixed a Shadow DOM error in `corn-popover` by correctly traversing from `ShadowRoot` to `host` while finding a scroll parent. - Fixed the same Shadow DOM scroll-parent detection error in `corn-tooltip`.

## [0.0.6] - 2026-05-05

### Added

- forms: added `corn-form` class for better form layout and spacing, and updated stickersheet examples to use it.
- grid: added `corn-container--fluid` class for full-width containers
- sliders: Added missing name attribute to slider input elements.

## [0.0.5] - 2026-05-01

### Added

- package: Added AI documentation to `corncob-design-language` package. This includes:
  - A `DESIGN_SYSTEM_FOR_AI.md` file with guidelines for using AI tools in development and documentation.
  - A `components.json` file with AI-generated component suggestions for the design system.
  - A `layouts.json` file with AI-generated layout suggestions for the design system.
  - A `tokens.json` file with AI-generated design token suggestions for the design system.
  - A `llms.txt` file with notes on using large language models for design system development.
  - An expanded `llms-full.txt` file with detailed notes and examples on using large language models for design system development.

## [0.0.4] - 2026-04-30

### Changed

- docs: Updated the Changelog page to import and render the generated `CHANGELOG.md` file. Updated Getting Started documentation to include instructions for installing the package from npmjs or GitHub Packages, and to clarify the process for configuring npm registries and authentication tokens.

### Fixed

- Headers: Fixed missing `aria-label` attribute in action icons in the Header component stickersheets.

## [0.0.3] - 2026-04-30

### Added

- badges: Added `corn-badge` component with support for status variants (neutral, success, warning, error, info) and small size (`corn-badge--sm`).
- links: Added support for `corn-link-list` styles and documentation examples.
- modals: Added support for `corn-modal` styles and documentation examples.
- toggles: Added `corn-toggles` component with support for sizes (`corn-toggle--xs`, `corn-toggle--sm`, `corn-toggle--md`, `corn-toggle--lg`) and support for icons.
- sliders: Added `corn-sliders` component with support for sizes (`corn-slider--xs`, `corn-slider--sm`, `corn-slider--md`, `corn-slider--lg`, `corn-slider--xl`).
- buttons: Added Button Group component to group related buttons together.
- development: Added `@stylistic/stylelint-config` and `@stylistic/stylelint-plugin` to dev dependencies for linting.

### Changed

- colors: Updated the color tokens used across the design language.
- forms: Changed form tokens from `--cc-form--item--color--background*` to `--cc-form--item--background*` for consistency with other tokens and to better reflect their purpose as background colors for form items. Updated references to these tokens in the codebase accordingly.
- popovers: Updated popover event listeners to use `handleEvent` with `this` as the handler, allowing for better management of event listeners and ensuring proper cleanup when the popover is destroyed.
- tooltips: Updated tooltip event listeners to use `handleEvent` with `this` as the handler, allowing for better management of event listeners and ensuring proper cleanup when the tooltip is destroyed. Adjust spacing on tooltip to give more breathing room when the element is focused.

### Fixed

- buttons: Fixed icon button hover styles.
- icons: Fixed the page icon color bug where icons were colorizing the stroke instead of the fill.
- all: Normalized sizing to use variables instead of hardcoded values, improving consistency and maintainability across the codebase. Normalized how disabled styles are applied to ensure a consistent appearance and behavior for disabled components throughout the design language.

## [0.0.1] - 2026-04-13

### Added

- Initial release of Corncob Design Language
- **Components**: Button, Text Input, Checkbox, Radio Button, Link, Message, Tooltip, Popover, Expandable, Panel Menu
- **Web Components**: `<corn-tooltip>`, `<corn-popover>`, `<corn-expandable>`, `<corn-button-bar>`
- Design token system with 10-step color scales (yellow, blue, orange, red, green, gray)
- Modular sizing scale based on major 3rd ratio (1.25)
- Spacing scale built on 16px base unit
- Typography tokens: font families, sizes, weights, line heights, letter spacing
- Border and transition tokens
- `components.json` — AI-consumable component inventory with class names, variants, sizes, and examples
- `tokens.json` — AI-consumable design token reference with semantic mappings and component patterns
- `DESIGN_SYSTEM_FOR_AI.md` — Integration guide for AI code generation tools
- Automated accessibility testing via Axe Core and Playwright
- Visual regression testing via BackstopJS
