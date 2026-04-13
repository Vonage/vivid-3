## Keys in Running Text

```html preview
<p>
	Press <vwc-kbd-shortcut><vwc-kbd-key name="Mod" size="condensed"></vwc-kbd-key><vwc-kbd-key name="C" size="condensed"></vwc-kbd-key></vwc-kbd-shortcut> to copy and <vwc-kbd-shortcut><vwc-kbd-key name="Mod" size="condensed"></vwc-kbd-key><vwc-kbd-key name="V" size="condensed"></vwc-kbd-key></vwc-kbd-shortcut> to paste.
</p>
```

## Shortcut in a Tooltip

Use the `kbd-shortcut` slot of the [Tooltip](/components/tooltip/) to display a keyboard shortcut alongside the tooltip text.

```html preview center 150px
<vwc-tooltip text="Save" placement="right">
	<vwc-button slot="anchor" appearance="filled" icon="save-line" aria-label="Save"></vwc-button>
	<vwc-kbd-shortcut slot="kbd-shortcut">
		<vwc-kbd-key name="Mod" size="condensed"></vwc-kbd-key>
		<vwc-kbd-key name="S" size="condensed"></vwc-kbd-key>
	</vwc-kbd-shortcut>
</vwc-tooltip>
```

## Shortcut in a Menu Item

Use the `kbd-shortcut` slot of the [Menu Item](/components/menu-item/) to display keyboard shortcuts in menus.

```html preview 250px
<vwc-menu open aria-label="Edit menu">
	<vwc-menu-item text="Cut" icon="crop-line">
		<vwc-kbd-shortcut slot="kbd-shortcut">
			<vwc-kbd-key name="Mod" appearance="dropshadow" size="condensed"></vwc-kbd-key>
			<vwc-kbd-key name="X" appearance="dropshadow" size="condensed"></vwc-kbd-key>
		</vwc-kbd-shortcut>
	</vwc-menu-item>
	<vwc-menu-item text="Copy" icon="copy-line">
		<vwc-kbd-shortcut slot="kbd-shortcut">
			<vwc-kbd-key name="Mod" appearance="dropshadow" size="condensed"></vwc-kbd-key>
			<vwc-kbd-key name="C" appearance="dropshadow" size="condensed"></vwc-kbd-key>
		</vwc-kbd-shortcut>
	</vwc-menu-item>
	<vwc-menu-item text="Paste" icon="clipboard-assign-line">
		<vwc-kbd-shortcut slot="kbd-shortcut">
			<vwc-kbd-key name="Mod" appearance="dropshadow" size="condensed"></vwc-kbd-key>
			<vwc-kbd-key name="V" appearance="dropshadow" size="condensed"></vwc-kbd-key>
		</vwc-kbd-shortcut>
	</vwc-menu-item>
</vwc-menu>
```
