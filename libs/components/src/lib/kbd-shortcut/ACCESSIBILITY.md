## Implementation

- The Kbd Shortcut component uses `role="group"` to semantically group the contained key elements.
- Each slotted Kbd element renders a native `<kbd>` element, which is the correct semantic for keyboard input.

## Best Practices

- Use Kbd Shortcut to display keyboard shortcut combinations, not individual keys. For individual keys, use the Kbd component directly.
- Order modifier keys before action keys (e.g., Ctrl + Shift + P, not P + Ctrl + Shift).

## Resources

- [MDN: kbd element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd)
