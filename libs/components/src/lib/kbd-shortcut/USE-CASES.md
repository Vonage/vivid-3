## Shortcut in a Tooltip

Use the `kbd-shortcut` slot of the [Tooltip](/components/tooltip/) to display a keyboard shortcut alongside the tooltip text.

```html preview center 150px
<vwc-tooltip text="Copy" placement="right">
	<vwc-button slot="anchor" appearance="filled" icon="copy-line" aria-label="Copy"></vwc-button>
	<vwc-kbd-shortcut slot="kbd-shortcut">
		<vwc-kbd-key name="Ctrl"></vwc-kbd-key>
		<vwc-kbd-key name="C"></vwc-kbd-key>
	</vwc-kbd-shortcut>
</vwc-tooltip>
```

## Shortcut in a Menu Item

Use the `kbd-shortcut` slot of the [Menu Item](/components/menu-item/) to display keyboard shortcuts in menus.

```html preview 250px
<vwc-menu open aria-label="Edit menu">
	<vwc-menu-item text="Cut" icon="crop-line">
		<vwc-kbd-shortcut slot="kbd-shortcut">
			<vwc-kbd-key name="Ctrl"></vwc-kbd-key>
			<vwc-kbd-key name="X"></vwc-kbd-key>
		</vwc-kbd-shortcut>
	</vwc-menu-item>
	<vwc-menu-item text="Copy" icon="copy-line">
		<vwc-kbd-shortcut slot="kbd-shortcut">
			<vwc-kbd-key name="Ctrl"></vwc-kbd-key>
			<vwc-kbd-key name="C"></vwc-kbd-key>
		</vwc-kbd-shortcut>
	</vwc-menu-item>
	<vwc-menu-item text="Paste" icon="clipboard-assign-line">
		<vwc-kbd-shortcut slot="kbd-shortcut">
			<vwc-kbd-key name="Ctrl"></vwc-kbd-key>
			<vwc-kbd-key name="V"></vwc-kbd-key>
		</vwc-kbd-shortcut>
	</vwc-menu-item>
</vwc-menu>
```

## Platform-Specific Shortcuts

Use the [Platform Switch](/components/platform-switch/) component to show the correct keyboard shortcut for the user's operating system. On macOS/iOS the ⌘ key is shown, while other platforms see Ctrl.

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

Combine [Platform Switch](/components/platform-switch/) with the Tooltip `kbd-shortcut` slot to show a platform-aware shortcut.

```html preview center 150px
<vwc-tooltip text="Paste" placement="right">
	<vwc-button slot="anchor" appearance="filled" icon="clipboard-assign-line" aria-label="Paste"></vwc-button>
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
</vwc-tooltip>
```

## Platform-Specific Shortcuts in a Menu

Combine [Platform Switch](/components/platform-switch/) with the Menu Item `kbd-shortcut` slot for a complete platform-aware menu.

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

## Multiple Shortcuts

Display several shortcuts to compare platform differences.

```html preview
<p>
	Save (Windows):
	<vwc-kbd-shortcut>
		<vwc-kbd-key name="Ctrl"></vwc-kbd-key>
		<vwc-kbd-key name="S"></vwc-kbd-key>
	</vwc-kbd-shortcut>
</p>
<p>
	Save (Mac):
	<vwc-kbd-shortcut>
		<vwc-kbd-key name="Cmd"></vwc-kbd-key>
		<vwc-kbd-key name="S"></vwc-kbd-key>
	</vwc-kbd-shortcut>
</p>
```
