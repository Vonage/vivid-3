## Shortcut in a Tooltip

Use the `kbd-shortcut` slot of the [Tooltip](/components/tooltip/) to display a keyboard shortcut alongside the tooltip text.

```html preview center 150px
<vwc-tooltip text="Copy" placement="right">
	<vwc-button slot="anchor" appearance="filled" icon="copy-line" aria-label="Copy"></vwc-button>
	<vwc-kbd-shortcut-text slot="kbd-shortcut">Control+C</vwc-kbd-shortcut-text>
</vwc-tooltip>
```

## Shortcut in a Menu Item

Use the `kbd-shortcut` slot of the [Menu Item](/components/menu-item/) to display keyboard shortcuts in menus.

```html preview 250px
<vwc-menu open aria-label="Edit menu">
	<vwc-menu-item text="Cut" icon="crop-line">
		<vwc-kbd-shortcut-text slot="kbd-shortcut">Control+X</vwc-kbd-shortcut-text>
	</vwc-menu-item>
	<vwc-menu-item text="Copy" icon="copy-line">
		<vwc-kbd-shortcut-text slot="kbd-shortcut">Control+C</vwc-kbd-shortcut-text>
	</vwc-menu-item>
	<vwc-menu-item text="Paste" icon="clipboard-assign-line">
		<vwc-kbd-shortcut-text slot="kbd-shortcut">Control+V</vwc-kbd-shortcut-text>
	</vwc-menu-item>
</vwc-menu>
```

## Function Key Shortcut

Display function key shortcuts.

```html preview inline
<vwc-kbd-shortcut-text>Control+F5</vwc-kbd-shortcut-text>
```
