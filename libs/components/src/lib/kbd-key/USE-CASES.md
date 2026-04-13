## Keyboard Shortcut

You can combine multiple Kbd Key components to display a keyboard shortcut.

```html preview inline
<vwc-kbd-key name="Cmd"></vwc-kbd-key> + <vwc-kbd-key name="Shift"></vwc-kbd-key> + <vwc-kbd-key name="P"></vwc-kbd-key>
```

## Shortcut in Context

You can display a keyboard shortcut alongside a description.

```html preview
<p>Press <vwc-kbd-key name="Ctrl"></vwc-kbd-key> + <vwc-kbd-key name="C"></vwc-kbd-key> to copy the selected text.</p>
<p>Press <vwc-kbd-key name="Ctrl"></vwc-kbd-key> + <vwc-kbd-key name="V"></vwc-kbd-key> to paste.</p>
```

## Navigation Instructions

Arrow keys can be used to indicate navigation patterns.

```html preview
<p>Use <vwc-kbd-key name="ArrowUp"></vwc-kbd-key> and <vwc-kbd-key name="ArrowDown"></vwc-kbd-key> to navigate the list, then press <vwc-kbd-key name="Enter"></vwc-kbd-key> to select.</p>
```

## Platform-Adaptive Shortcut

Use the `Mod` key for cross-platform shortcuts that show `⌘` on Apple and `Ctrl` elsewhere.

```html preview inline
<vwc-kbd-key name="Mod"></vwc-kbd-key> + <vwc-kbd-key name="S"></vwc-kbd-key>
```
