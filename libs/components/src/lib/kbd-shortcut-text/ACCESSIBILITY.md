## Implementation

The Kbd Shortcut Text component parses text content in the standard [`aria-keyshortcuts`](https://www.w3.org/TR/wai-aria-1.2/#aria-keyshortcuts) format. The text content provides the accessible description of the shortcut.

The component uses `role="group"` on its outer element. Each key is rendered as a [Kbd Key](/components/kbd-key/) component.
