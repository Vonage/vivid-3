## Keys

The `name` attribute of Kbd Key controls which key is displayed.

The supported key names are a subset of values from [aria-keyshortcuts](https://w3c.github.io/aria/#aria-keyshortcuts), plus the special `Mod` key.

```html preview
<style>
	td,
	th {
		padding: 4px 8px;
		vertical-align: middle;
	}
	th {
		text-align: left;
	}
</style>
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Standard</th>
			<th>Apple</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>Alt</code></td>
			<td><vwc-kbd-key name="Alt" keyboard="standard"></vwc-kbd-key></td>
			<td><vwc-kbd-key name="Alt" keyboard="apple"></vwc-kbd-key></td>
			<td>Alt / Option</td>
		</tr>
		<tr>
			<td><code>Control</code></td>
			<td><vwc-kbd-key name="Control" keyboard="standard"></vwc-kbd-key></td>
			<td><vwc-kbd-key name="Control" keyboard="apple"></vwc-kbd-key></td>
			<td>Control</td>
		</tr>
		<tr>
			<td><code>Shift</code></td>
			<td><vwc-kbd-key name="Shift" keyboard="standard"></vwc-kbd-key></td>
			<td><vwc-kbd-key name="Shift" keyboard="apple"></vwc-kbd-key></td>
			<td>Shift</td>
		</tr>
		<tr>
			<td><code>Mod</code></td>
			<td><vwc-kbd-key name="Mod" keyboard="standard"></vwc-kbd-key></td>
			<td><vwc-kbd-key name="Mod" keyboard="apple"></vwc-kbd-key></td>
			<td>Platform modifier</td>
		</tr>
		<tr>
			<td><code>Enter</code></td>
			<td><vwc-kbd-key name="Enter"></vwc-kbd-key></td>
			<td></td>
			<td>Enter / Return</td>
		</tr>
		<tr>
			<td><code>Tab</code></td>
			<td><vwc-kbd-key name="Tab"></vwc-kbd-key></td>
			<td></td>
			<td>Tab</td>
		</tr>
		<tr>
			<td><code>Space</code></td>
			<td><vwc-kbd-key name="Space"></vwc-kbd-key></td>
			<td></td>
			<td>Space bar</td>
		</tr>
		<tr>
			<td><code>Backspace</code></td>
			<td><vwc-kbd-key name="Backspace"></vwc-kbd-key></td>
			<td></td>
			<td>Backspace / Delete</td>
		</tr>
		<tr>
			<td><code>Escape</code></td>
			<td><vwc-kbd-key name="Escape"></vwc-kbd-key></td>
			<td></td>
			<td>Escape</td>
		</tr>
		<tr>
			<td><code>ArrowUp / Down / Left / Right</code></td>
			<td><vwc-kbd-key name="ArrowUp"></vwc-kbd-key> <vwc-kbd-key name="ArrowDown"></vwc-kbd-key> <vwc-kbd-key name="ArrowLeft"></vwc-kbd-key> <vwc-kbd-key name="ArrowRight"></vwc-kbd-key></td>
			<td></td>
			<td>Arrow keys</td>
		</tr>
		<tr>
			<td><code>Home</code> / <code>End</code></td>
			<td><vwc-kbd-key name="Home"></vwc-kbd-key> <vwc-kbd-key name="End"></vwc-kbd-key></td>
			<td></td>
			<td>Home / End</td>
		</tr>
		<tr>
			<td><code>PageUp</code> / <code>PageDown</code></td>
			<td><vwc-kbd-key name="PageUp"></vwc-kbd-key> <vwc-kbd-key name="PageDown"></vwc-kbd-key></td>
			<td></td>
			<td>Page Up / Page Down</td>
		</tr>
		<tr>
			<td><code>A</code>–<code>Z</code>, <code>0</code>–<code>9</code></td>
			<td><vwc-kbd-key name="A"></vwc-kbd-key> <vwc-kbd-key name="0"></vwc-kbd-key></td>
			<td></td>
			<td>Letter and number keys</td>
		</tr>
	</tbody>
</table>
```

### Platform Specific Keys

The `keyboard` attribute on Kbd Key controls the display of platform-dependent keys. When set to `auto` (the default), the platform is detected from the user agent.

```html preview
<vwc-kbd-key name="Alt" keyboard="standard"></vwc-kbd-key> <vwc-kbd-key name="Alt" keyboard="apple"></vwc-kbd-key>
```

The `"Mod"` key is the primary modifier key: `Control` on standard keyboards and `Meta` (⌘) on Apple.

```html preview blocks
<vwc-kbd-shortcut><vwc-kbd-key name="Mod" keyboard="standard"></vwc-kbd-key><vwc-kbd-key name="C"></vwc-kbd-key></vwc-kbd-shortcut> <vwc-kbd-shortcut><vwc-kbd-key name="Mod" keyboard="apple"></vwc-kbd-key><vwc-kbd-key name="C"></vwc-kbd-key></vwc-kbd-shortcut>
```

For shortcuts that differ more broadly across platforms, use [Platform Switch](/components/platform-switch/) to show the appropriate Kbd Shortcut for the user's keyboard.

```html preview
<vwc-platform-switch>
	<vwc-kbd-shortcut data-keyboard="apple">
		<vwc-kbd-key name="Mod"></vwc-kbd-key>
		<vwc-kbd-key name="Alt" keyboard="apple"></vwc-kbd-key>
		<vwc-kbd-key name="S"></vwc-kbd-key>
	</vwc-kbd-shortcut>
	<vwc-kbd-shortcut>
		<vwc-kbd-key name="Control"></vwc-kbd-key>
		<vwc-kbd-key name="Shift"></vwc-kbd-key>
		<vwc-kbd-key name="Alt"></vwc-kbd-key>
		<vwc-kbd-key name="S"></vwc-kbd-key>
	</vwc-kbd-shortcut>
</vwc-platform-switch>
```

### Custom Keys

Set `name="Custom"` to provide arbitrary content via the default slot.

```html preview
<vwc-kbd-key name="Custom">F1</vwc-kbd-key> <vwc-kbd-key name="Custom" keyshortcuts-key="Power"><vwc-icon name="quit-line" label="Power"></vwc-icon></vwc-kbd-key>
```

## Appearance

The `appearance` attribute controls the visual style of Kbd Key.

```html preview
<vwc-kbd-key name="A" appearance="outlined"></vwc-kbd-key>
<vwc-kbd-key name="A" appearance="subtle"></vwc-kbd-key>
<vwc-kbd-key name="A" appearance="subtle-light"></vwc-kbd-key>
<vwc-kbd-key name="A" appearance="dropshadow"></vwc-kbd-key>
```

## Size

The `size` attribute controls the key size.

```html preview
<vwc-kbd-key name="A" size="super-condensed"></vwc-kbd-key>
<vwc-kbd-key name="A" size="condensed"></vwc-kbd-key>
<vwc-kbd-key name="A"></vwc-kbd-key>
<vwc-kbd-key name="A" size="expanded"></vwc-kbd-key>
```
