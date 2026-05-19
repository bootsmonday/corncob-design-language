---
type: Fixed
scope: overlays
---

- Fixed a Shadow DOM error in `corn-popover` by correctly traversing from `ShadowRoot` to `host` while finding a scroll parent.
- Fixed the same Shadow DOM scroll-parent detection error in `corn-tooltip`.
