# Corncob Design System - AI Integration Guide

This document explains how AI systems should consume and use the Corncob Design Language files for code generation, validation, and design system enforcement.

## Non-Negotiable Contract

Use these rules as the default behavior for AI code generation:

1. Use the Corncob grid for page and section layout unless a component's docs specify a different internal layout.
2. Start from the canonical component code before enhancing or customizing it.
3. Preserve documented class names, child order, and required relationships before adding wrappers, styling hooks, or behavior.
4. Use the grid around components that have their own internal structure. Do not rewrite the inside of the component just to satisfy a page layout.

## Default Layout Rule

When a prompt asks for a page, section, dashboard, hero, sidebar layout, cards, or any other general composition, default to the Corncob grid:

```html
<main class="corn-main corn-container">
  <div class="corn-row">
    <section class="corn-col-12">...</section>
  </div>
</main>
```

Use these classes unless the component documentation gives a more specific structure:

- `corn-container` for page width and horizontal alignment
- `corn-row` for the grid context
- `corn-col-*` and responsive `corn-col-sm-*`, `corn-col-md-*`, `corn-col-lg-*`, `corn-col-xl-*`, `corn-col-xxl-*` for layout spans

Avoid inventing a parallel layout system with custom `display: grid` wrappers when the Corncob grid already applies.

## Canonical Before Enhancement

The required generation order is:

1. Find the canonical example in `components.json` or the component docs page.
2. Emit that code with the documented structure intact.
3. Replace placeholder content with task-specific content.
4. Place the component inside the Corncob grid if page layout is needed.
5. Add optional enhancement only after the canonical component code is already correct.

Enhancements include:

- custom wrapper classes
- additional decorative markup
- custom styling hooks
- alternate compositions
- JavaScript behavior beyond what the component docs require

If the canonical version is wrong, enhancement should stop until the base structure is fixed.

## File Structure & Purpose

### 1. `components.json`

**Purpose**: Component inventory and configuration for UI generation.

**Contains**:

- Component metadata (name, description, accessibility notes)
- Base CSS classes and modifier classes
- Size and variant options
- JavaScript requirements
- Implementation status
- Full HTML examples

**Usage by AI**:

- When generating UI code, reference the `baseClass` and `example` fields
- Treat `example` as canonical component code unless a `fullExamples` entry is a closer match to the task
- Check `jsRequired` to determine if interactivity setup is needed
- Use `variants` and `sizes` arrays to validate generated classes
- Follow component accessibility requirements in `accessibility` field
- Follow `layoutManifest`/`layouts.json`, `codeGenerationWorkflow`, and any component-specific `layoutPolicy` metadata

**Example Reference**:

```json
{
  "button": {
    "baseClass": "corn-button",
    "variants": ["primary", "secondary", "danger"],
    "sizes": ["xs", "sm", "md", "lg", "xl"],
    "jsRequired": false,
    "example": "<button class=\"corn-button corn-button--md\">Primary Button</button>"
  }
}
```

### 2. `tokens.json`

**Purpose**: Design token values for styling, spacing, typography, and theming.

**Contains**:

- Color scales and semantic color mappings
- Sizing scale with modular ratio explanation
- Spacing values
- Typography configuration
- Border and transition tokens
- Component-specific token mappings
- HTML/CSS patterns for common UI structures
- Accessibility minimums

**Usage by AI**:

- Reference CSS variable names (e.g., `var(--cc-gray-100)`) for dynamic styling
- Use modular scale values for consistent sizing
- Apply semantic colors (success, error, warning, info) for status messaging
- Follow patterns section for common component structures

---

## How AI Should Reference These Files

### For HTML/CSS Generation

1. **Always start with component pattern from `tokens.json`**:
   - Use the provided HTML structure under `patterns.*`
   - Ensures accessibility and proper nesting

2. **Apply class names from `components.json`**:
   - Use `baseClass` as foundation
   - Add modifier classes for variants/sizes (e.g., `corn-button--md`, `corn-button--danger`)

3. **Reference design tokens for styling**:
   - Use CSS variables from `tokens.json` in inline styles if customization needed
   - Example: `style="color: var(--cc-gray-100); background: var(--cc-blue-60);"`

### Example Workflow

**AI Task**: "Create a primary button that's large with an error state"

1. Look up `button` in `components.json`:
   - Base: `corn-button`
   - Default variant: `primary` (implicit)
   - Size: `lg`

2. Generate: `<button class="corn-button corn-button--lg">Action</button>`

3. For error styling, look up `colors.semantic.error` in `tokens.json`:
   - Use red color scale or error variant if available

### For Page and Section Layout

1. Start with the Corncob grid from the grid docs
2. Use `corn-container` and `corn-row` for the outer layout
3. Assign spans with `corn-col-*`
4. Only use a component-specific internal layout when the component docs demonstrate one

Example shell:

```html
<main class="corn-main corn-container">
  <div class="corn-row">
    <aside class="corn-col-12 corn-col-lg-4">Sidebar</aside>
    <section class="corn-col-12 corn-col-lg-8">Content</section>
  </div>
</main>
```

---

## Best Practices for AI Code Generation

### 1. Form Controls

**Always follow this pattern** (from `tokens.json.patterns.formControl`):

```html
<div class="corn-form--item">
  <div class="corn-text-input corn-text-input--md">
    <input id="name" name="name" placeholder="Enter text..." />
    <label for="name">Label Text</label>
  </div>
  <div class="corn-status">Optional status/error message</div>
</div>
```

**Validation**:

- ✅ Input and label must have matching `id`/`for` attributes
- ✅ Always wrap in `corn-form--item`
- ✅ Include `corn-status` container for validation messages

### 2. Grouped Form Elements (Checkboxes/Radio Buttons)

**Always follow this pattern**:

```html
<fieldset class="corn-form--item corn-checkbox-group">
  <legend>Group Label</legend>
  <div class="corn-checkbox">
    <input type="checkbox" id="option1" name="options" />
    <label for="option1">Option One</label>
  </div>
  <div class="corn-checkbox">
    <input type="checkbox" id="option2" name="options" />
    <label for="option2">Option Two</label>
  </div>
</fieldset>
```

**Validation**:

- ✅ Use `<fieldset>` with `<legend>` for grouping
- ✅ All items share same `name` attribute
- ✅ Each input has unique `id` matching its `label for`
- ✅ Use `corn-checkbox-group--inline` for inline layout

### 3. Interactive Components (Tooltips, Popovers, Expandables)

**Check `jsRequired` field**:

- If `true`, the component needs JavaScript setup
- Reference `customElement` field for web component tag name
- Follow exact pattern structure from `tokens.json.patterns.*`

**Example - Popover**:

```html
<div class="corn-popover--anchor">
  <button class="corn-button corn-pop" aria-controls="my-popover">Open Menu</button>
  <corn-popover position="bottom" id="my-popover" class="corn-popover">
    <ul>
      <li><a href="#" class="corn-link">Item 1</a></li>
      <li><a href="#" class="corn-link">Item 2</a></li>
    </ul>
  </corn-popover>
</div>
```

**Validation**:

- ✅ Trigger element uses `aria-controls` pointing to popover `id`
- ✅ Anchor wrapper has proper class
- ✅ Position attribute matches options: `top|right|bottom|left`

### 4. Class Naming Rules

**Modifiers follow pattern**: `corn-[component]--[variant|size]`

Examples:

- Size: `corn-button--xs`, `corn-button--sm`, `corn-button--md`
- Variant: `corn-button--secondary`, `corn-button--danger`
- State: `corn-checkbox-group--inline`
- Layout: `corn-radio-button-group--inline`

**Validation**:

- ✅ Always include base class (e.g., `corn-button`)
- ✅ Only use modifiers listed in `components.json` for that component
- ✅ Never mix unrelated component classes

### 5. Components With Required Internal Structure

Some components define a required internal DOM shape. Headers are the clearest example.

For these components:

- keep the documented direct children in the same order
- preserve required wrappers such as `corn-company` or `corn-popover--anchor`
- use the Corncob grid outside the component for page placement
- do not introduce custom wrappers inside the component unless the docs explicitly show them

---

## Validation Rules for AI Systems

### Color References

```css
// VALID - using semantic names
background: var(--cc-gray-100);
color: var(--cc-blue-60);

// VALID - using scale values
border-color: var(--cc-red-80);

// INVALID - hex codes should use token variables instead
background: #23211f; // ❌ Use var(--cc-gray-100) instead
```

### Sizing References

```css
// VALID - using modular scale
padding: var(--cc-spacing-0);
margin: var(--cc-spacing-2);
width: var(--cc-size-3);

// VALID - explicit size values
font-size: 1rem;
height: 20px;

// AVOID - hardcoded values that don't match scale
padding: 15px; // ❌ Use var(--cc-spacing-1) or var(--cc-spacing-2)
```

### Typography

```json
// VALID - using token scale
font-size: var(--cc-font-size--lg);
font-weight: 600; // or var(--cc-font-weight--semibold)

// VALID - semantic size names
font-size: var(--cc-size-1);

// INVALID - random sizes
font-size: 18px; // ❌ Use token system instead
```

### Component Class Validation

```json
// VALID - button with size and variant
<button class="corn-button corn-button--md corn-button--secondary">

// INVALID - missing base class
<button class="corn-button--md"> // ❌ Must include corn-button

// INVALID - undefined modifier
<button class="corn-button corn-button--extra-large"> // ❌ Only xs|sm|md|lg|xl
```

---

## Common AI Tasks & How to Handle Them

### Task 1: Generate a form with validation

**Process**:

1. Check `patterns.formControl` in tokens.json
2. For each field, use `components.json` entry (text-input, checkbox, etc.)
3. Add `corn-status` element for error/success messages
4. Use error color from `colors.semantic.error`

### Task 2: Create a status message

**Process**:

1. Look up `message` component in `components.json`
2. Use variant from `components.message.variants`: info|success|error|warning
3. Check `components.message.tokens` for colors
4. Include icon (SVG structure not specified in token files)

### Task 3: Build navigation menu

**Process**:

1. Use `panelMenu` component from components.json
2. Reference `patterns.panelMenu` for structure
3. Use `corn-expandable` for collapsible items
4. Apply `.corn-panel-menu--item--active` for current page

### Task 4: Ensure keyboard accessibility

**Process**:

1. Check `accessibility` field in relevant components
2. For interactive elements, ensure proper ARIA attributes
3. For form groups, use `<fieldset>` + `<legend>`
4. For collapsibles, use native `<details>` or `corn-expandable`
5. Maintain tab order and keyboard navigation

---

## File Update Protocol

Whenever these files are updated:

1. **Version field** in `metadata` will increment
2. **changelog** section should document breaking changes
3. **deprecated** components will be marked explicitly
4. AI systems should check version before generating code to ensure compatibility

---

## Example: Complete Form Generation

Here's how an AI system should generate a contact form:

```html
<!-- Structure from tokens.json patterns -->
<form class="corn-form">
  <!-- Text input pattern -->
  <div class="corn-form--item">
    <div class="corn-text-input corn-text-input--md">
      <input id="name" name="name" placeholder="Your name..." />
      <label for="name">Full Name</label>
    </div>
    <div class="corn-status"></div>
  </div>

  <!-- Checkbox group pattern -->
  <fieldset class="corn-form--item corn-checkbox-group">
    <legend>Interests</legend>
    <div class="corn-checkbox">
      <input type="checkbox" id="design" name="interests" value="design" />
      <label for="design">Design</label>
    </div>
    <div class="corn-checkbox">
      <input type="checkbox" id="dev" name="interests" value="dev" />
      <label for="dev">Development</label>
    </div>
  </fieldset>

  <!-- Button from components.json -->
  <button class="corn-button corn-button--md corn-button--primary">Submit</button>
</form>
```

**Validation checklist**:

- ✅ Uses `corn-form` wrapper class
- ✅ Form items wrapped in `corn-form--item`
- ✅ All inputs have matching id/for labels
- ✅ Checkbox group uses `<fieldset>` + `<legend>`
- ✅ Button uses valid size and variant
- ✅ All class names exist in components.json

---

## Quick Reference: Component Size Options

All these components support these sizes: `xs`, `sm`, `md` (default), `lg`, `xl`

```
corn-button--xs          → Extra small button
corn-text-input--sm      → Small text input
corn-checkbox            → Checkbox (no size modifier = default)
corn-message--info       → Info message (no size system)
```

---

## Accessibility Minimums (from tokens.json)

AI systems **must** ensure:

- Focus outline width: 2px
- Focus outline color: var(--cc-blue-60)
- Minimum touch target: 44px × 44px
- Minimum clickable size: 24px × 24px
- Form controls must have associated labels
- Interactive elements must be keyboard accessible
- Status messages must be announced to screen readers
