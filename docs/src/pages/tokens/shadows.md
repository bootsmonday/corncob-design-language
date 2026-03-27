---
layout: ../../layouts/DocsLayout.astro
title: Tokens | Shadows | Corncob
---

# Shadow Tokens

Basic shadow tokens for elevations. These can be used in components or directly in your own styles. These are the foundation for shadows in Corncob, but we recommend using them as a starting point and building on top of them with your own custom tokens as needed.

The text shadows are designed to be used with white text on a pretty much any background and still pass accessibility standards. The drop shadows are designed to be subtle and work well on light backgrounds, but you may want to use heavier shadows or different colors on dark backgrounds.

We recommend using shadows sparingly and intentionally to create a sense of depth and hierarchy in your designs, rather than as a default style for all elements. Shadows can be a powerful tool for creating visual interest and guiding the user's attention, but they can also be overused and create visual clutter if not used thoughtfully.

```css
:root {
  /* standard shadow */
  --cc-shadow--drop: 0 1px 8px 0px rgb(from var(--cc-black) r g b / 6%);
  --cc-shadow--drop--heavy: 0 1px 8px 0px rgb(from var(--cc-black) r g b / 12%);
  --cc-shadow--inset: inset 0 0 18px 0 rgb(from var(--cc-black) r g b / 23%);
  --cc-shadow--inset--heavy: inset 0 0 18px 0 rgb(from var(--cc-black) r g b / 36%);

  /* this should pass accessibity with white text on a pretty much any background */
  --cc-shadow--text: 0 0 2px rgb(from var(--cc-black) r g b / 48%);
  --cc-shadow--text--reverse: 0 0 1px rgb(from var(--cc-white) r g b / 48%);
}
```
