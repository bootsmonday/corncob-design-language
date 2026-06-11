---
type: Fixed
scope: popovers
---

Fixed an issue where the popover would not open when the trigger element was clicked. The `_toggle` method now accepts an event parameter (`evt`) that is passed to the `_open` method, allowing the popover to be opened in response to user interactions. Additionally, the `_open` method has been updated to set the `activeElement` based on the event target, ensuring that keyboard navigation works correctly for accessibility.
