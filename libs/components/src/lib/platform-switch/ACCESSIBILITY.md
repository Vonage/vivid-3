## Implementation

- Platform Switch does not add any semantic meaning to its content. It is a purely presentational component that conditionally shows or hides children.
- Non-matching children are hidden via `display: none`, which removes them from both the visual layout and the accessibility tree. This uses an inline style to ensure it takes effect even on custom elements with `:host` display styles.
- The visible child retains its full semantics (e.g., a `vwc-kbd-shortcut` inside will still use `role="group"` and `<kbd>` elements).

## Best Practices

- Always include a fallback child (without any `data-*` attributes) as the last child, so that content is shown on all platforms.
- Place more specific matches before less specific ones — the first match wins.

## Resources

- [MDN: Navigator.userAgent](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent)
