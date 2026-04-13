## Platform-Specific Keyboard Shortcuts

Use Platform Switch with [Kbd Shortcut](/components/kbd-shortcut/) to show the correct keyboard shortcut for the user's operating system.

```html preview inline
<vwc-platform-switch>
	<vwc-kbd-shortcut data-os="apple">
		<vwc-kbd-key name="Cmd"></vwc-kbd-key>
		<vwc-kbd-key name="C"></vwc-kbd-key>
	</vwc-kbd-shortcut>
	<vwc-kbd-shortcut>
		<vwc-kbd-key name="Ctrl"></vwc-kbd-key>
		<vwc-kbd-key name="C"></vwc-kbd-key>
	</vwc-kbd-shortcut>
</vwc-platform-switch>
```

## Platform-Specific Shortcut in a Tooltip

Combine Platform Switch with the [Tooltip](/components/tooltip/) `kbd-shortcut` slot to show a platform-aware shortcut.

```html preview center 150px
<vwc-tooltip text="Copy" placement="right">
	<vwc-button slot="anchor" appearance="filled" icon="copy-line" aria-label="Copy"></vwc-button>
	<vwc-platform-switch slot="kbd-shortcut">
		<vwc-kbd-shortcut data-os="apple">
			<vwc-kbd-key name="Cmd"></vwc-kbd-key>
			<vwc-kbd-key name="C"></vwc-kbd-key>
		</vwc-kbd-shortcut>
		<vwc-kbd-shortcut>
			<vwc-kbd-key name="Ctrl"></vwc-kbd-key>
			<vwc-kbd-key name="C"></vwc-kbd-key>
		</vwc-kbd-shortcut>
	</vwc-platform-switch>
</vwc-tooltip>
```

## Platform-Specific Shortcuts in a Menu

Combine Platform Switch with the [Menu Item](/components/menu-item/) `kbd-shortcut` slot to display the correct shortcut per platform.

```html preview 250px
<vwc-menu open aria-label="Edit menu">
	<vwc-menu-item text="Cut" icon="crop-line">
		<vwc-platform-switch slot="kbd-shortcut">
			<vwc-kbd-shortcut data-os="apple">
				<vwc-kbd-key name="Cmd"></vwc-kbd-key>
				<vwc-kbd-key name="X"></vwc-kbd-key>
			</vwc-kbd-shortcut>
			<vwc-kbd-shortcut>
				<vwc-kbd-key name="Ctrl"></vwc-kbd-key>
				<vwc-kbd-key name="X"></vwc-kbd-key>
			</vwc-kbd-shortcut>
		</vwc-platform-switch>
	</vwc-menu-item>
	<vwc-menu-item text="Copy" icon="copy-line">
		<vwc-platform-switch slot="kbd-shortcut">
			<vwc-kbd-shortcut data-os="apple">
				<vwc-kbd-key name="Cmd"></vwc-kbd-key>
				<vwc-kbd-key name="C"></vwc-kbd-key>
			</vwc-kbd-shortcut>
			<vwc-kbd-shortcut>
				<vwc-kbd-key name="Ctrl"></vwc-kbd-key>
				<vwc-kbd-key name="C"></vwc-kbd-key>
			</vwc-kbd-shortcut>
		</vwc-platform-switch>
	</vwc-menu-item>
	<vwc-menu-item text="Paste" icon="clipboard-assign-line">
		<vwc-platform-switch slot="kbd-shortcut">
			<vwc-kbd-shortcut data-os="apple">
				<vwc-kbd-key name="Cmd"></vwc-kbd-key>
				<vwc-kbd-key name="V"></vwc-kbd-key>
			</vwc-kbd-shortcut>
			<vwc-kbd-shortcut>
				<vwc-kbd-key name="Ctrl"></vwc-kbd-key>
				<vwc-kbd-key name="V"></vwc-kbd-key>
			</vwc-kbd-shortcut>
		</vwc-platform-switch>
	</vwc-menu-item>
</vwc-menu>
```
