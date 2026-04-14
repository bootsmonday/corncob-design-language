# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Entries are generated from markdown fragments in `.changelog/` using
the "Changelog Release" GitHub Actions workflow.

## [Unreleased]
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
