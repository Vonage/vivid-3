## Keyboard Semantics

The Kbd Key component renders a `<kbd>` element, which conveys that the text represents user keyboard input. Screen readers announce the content as keyboard input when appropriate.

## Key Display

- Modifier keys (Shift, Ctrl, Alt, Cmd, Mod) display their standard symbols or labels.
- The `Mod` key adapts to the platform: it displays `⌘` on Apple platforms and `Ctrl` on all others, helping users quickly identify the correct key.
- Symbol keys (Enter, Tab, Backspace, etc.) display their Unicode symbols for universal recognition.
- Letter, number, and function keys display as-is.
