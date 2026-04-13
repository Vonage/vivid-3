## Name

The `name` attribute controls which key the Kbd Key component displays.

```html preview blocks
<vwc-kbd-key name="A"></vwc-kbd-key>
<vwc-kbd-key name="Enter"></vwc-kbd-key>
<vwc-kbd-key name="Cmd"></vwc-kbd-key>
<vwc-kbd-key name="Shift"></vwc-kbd-key>
<vwc-kbd-key name="Tab"></vwc-kbd-key>
<vwc-kbd-key name="Space"></vwc-kbd-key>
<vwc-kbd-key name="Backspace"></vwc-kbd-key>
<vwc-kbd-key name="Escape"></vwc-kbd-key>
```

## Arrow Keys

Arrow keys render as directional symbols.

```html preview inline
<vwc-kbd-key name="ArrowUp"></vwc-kbd-key>
<vwc-kbd-key name="ArrowDown"></vwc-kbd-key>
<vwc-kbd-key name="ArrowLeft"></vwc-kbd-key>
<vwc-kbd-key name="ArrowRight"></vwc-kbd-key>
```

## Modifier Keys

Modifier keys like Cmd, Shift, Ctrl, Alt, and Mod are displayed with their respective symbols or labels.

The special `Mod` key displays `⌘` on Apple platforms and `Ctrl` otherwise.

```html preview inline
<vwc-kbd-key name="Cmd"></vwc-kbd-key>
<vwc-kbd-key name="Shift"></vwc-kbd-key>
<vwc-kbd-key name="Ctrl"></vwc-kbd-key>
<vwc-kbd-key name="Alt"></vwc-kbd-key>
<vwc-kbd-key name="Mod"></vwc-kbd-key>
```

## Letter and Number Keys

Letter and number keys display as-is.

```html preview inline
<vwc-kbd-key name="A"></vwc-kbd-key>
<vwc-kbd-key name="Z"></vwc-kbd-key>
<vwc-kbd-key name="0"></vwc-kbd-key>
<vwc-kbd-key name="9"></vwc-kbd-key>
```

## Function Keys

Function keys display as-is.

```html preview inline
<vwc-kbd-key name="F1"></vwc-kbd-key>
<vwc-kbd-key name="F5"></vwc-kbd-key>
<vwc-kbd-key name="F12"></vwc-kbd-key>
```

## Custom Content

Set `name="Custom"` to provide arbitrary content via the default slot.

```html preview inline
<vwc-kbd-key name="Custom">Fn</vwc-kbd-key>
<vwc-kbd-key name="Custom">PgUp</vwc-kbd-key>
<vwc-kbd-key name="Custom">⏎</vwc-kbd-key>
```

## Adapting to Context

Kbd Key inherits the font size, color, and adapts to its surroundings. This makes it flexible across different visual contexts.

### Different Font Sizes

```html preview blocks
<span style="font-size: 12px;">Small: <vwc-kbd-key name="Mod"></vwc-kbd-key> + <vwc-kbd-key name="S"></vwc-kbd-key></span>
<span style="font-size: 16px;">Medium: <vwc-kbd-key name="Mod"></vwc-kbd-key> + <vwc-kbd-key name="S"></vwc-kbd-key></span>
<span style="font-size: 24px;">Large: <vwc-kbd-key name="Mod"></vwc-kbd-key> + <vwc-kbd-key name="S"></vwc-kbd-key></span>
<span style="font-size: 32px;">Extra large: <vwc-kbd-key name="Mod"></vwc-kbd-key> + <vwc-kbd-key name="S"></vwc-kbd-key></span>
```

### Different Text Colors

```html preview blocks
<span style="color: #1a1a2e;">Dark: <vwc-kbd-key name="Enter"></vwc-kbd-key></span>
<span style="color: #e94560;">Red: <vwc-kbd-key name="Enter"></vwc-kbd-key></span>
<span style="color: #0f3460;">Navy: <vwc-kbd-key name="Enter"></vwc-kbd-key></span>
<span style="color: #16c79a;">Green: <vwc-kbd-key name="Enter"></vwc-kbd-key></span>
```

### Different Background Colors

```html preview blocks
<div style="background: #f0f0f0; padding: 8px 12px; display: inline-block; border-radius: 4px;">Light gray background: <vwc-kbd-key name="Shift"></vwc-kbd-key> + <vwc-kbd-key name="A"></vwc-kbd-key></div>
<div style="background: #1a1a2e; color: #eee; padding: 8px 12px; display: inline-block; border-radius: 4px;">Dark background: <vwc-kbd-key name="Shift"></vwc-kbd-key> + <vwc-kbd-key name="A"></vwc-kbd-key></div>
<div style="background: #e8f4f8; color: #0f3460; padding: 8px 12px; display: inline-block; border-radius: 4px;">Blue background: <vwc-kbd-key name="Shift"></vwc-kbd-key> + <vwc-kbd-key name="A"></vwc-kbd-key></div>
<div style="background: #fff3e0; color: #e65100; padding: 8px 12px; display: inline-block; border-radius: 4px;">Orange background: <vwc-kbd-key name="Shift"></vwc-kbd-key> + <vwc-kbd-key name="A"></vwc-kbd-key></div>
```
