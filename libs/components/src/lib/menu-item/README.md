# Menu Item

```js
<script type="module">import '@vonage/vivid/menu-item';</script>
```

```html preview 100px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item text="Menu item"></vwc-menu-item>
</vwc-menu>
```

## Members

### Text

- Type: `string`
- Default: `undefined`

Use the `text` attribute to set the menu item's text.

```html preview 100px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item text="Menu item"></vwc-menu-item>
</vwc-menu>
```

### Secondary text

- Type: `string`
- Default: `undefined`

Use the `text-secondary` attribute (or `textSecondary` property) to set the menu item's secondary text.

Note: to improve readability, **avoid long text and multiple lines** where possible.

```html preview 150px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item
		text="menu item"
		text-secondary="secondary text"
	></vwc-menu-item>
</vwc-menu>
```

### Role

set `role` to change the role of the menu item

- Type: `'menuitem'` | `'menuitemcheckbox'` | `'menuitemradio'` | `'presentation'`
- Default: `'menuitem'`

```html preview 450px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item role="menuitem" text="Menu item 1"></vwc-menu-item>
	<vwc-menu-item role="menuitem" text="Menu item 2"></vwc-menu-item>
	<vwc-divider></vwc-divider>
	<vwc-menu-item role="menuitemcheckbox" text="Checkbox 1"></vwc-menu-item>
	<vwc-menu-item role="menuitemcheckbox" text="Checkbox 2"></vwc-menu-item>
	<vwc-divider></vwc-divider>
	<vwc-menu-item role="menuitemradio" text="Radio 1.1"></vwc-menu-item>
	<vwc-menu-item role="menuitemradio" text="Radio 1.2"></vwc-menu-item>
	<vwc-divider></vwc-divider>
	<vwc-menu-item role="menuitemradio" text="Radio 2.1"></vwc-menu-item>
	<vwc-menu-item role="menuitemradio" text="Radio 2.2"></vwc-menu-item>
	<vwc-divider></vwc-divider>
	<a
		role="menuitem"
		href="https://www.vonage.com"
		target="_blank"
		rel="noopener noreferrer"
	>
		<vwc-menu-item role="presentation" text="Go to Vonage"></vwc-menu-item>
	</a>
</vwc-menu>
```

### Icon

Use `icon` to set an icon to the nav item.
View list of available icon at the [vivid icons gallery](/icons/icons-gallery/).

Note: Icon, by its own, doesn't make a discernible text. An `aria-label` or `title` must be provided to ensure that the user can understand the nav item's purpose.

- Type: `string`
- Default: `undefined`

```html preview 100px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item icon="file-pdf-line" text="Export to PDF"></vwc-menu-item>
</vwc-menu>
```

### Check trailing

When `role` is set to `'menuitemcheckbox'` or `'menuitemradio'`, you can set the `check-trailing` attribute to change where the checkbox / radio indicator is placed .

If the `icon` attribute is present, the indicator will be trailing by default.

- Type: `boolean`
- Default: `false`

```html preview 350px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item
		role="menuitemcheckbox"
		text="Checkbox 1"
		check-trailing
	></vwc-menu-item>
	<vwc-menu-item
		role="menuitemcheckbox"
		text="Checkbox 2"
		check-trailing
	></vwc-menu-item>
	<vwc-menu-item
		icon="image-line"
		role="menuitemcheckbox"
		text="Check 3"
	></vwc-menu-item>
	<vwc-divider></vwc-divider>
	<vwc-menu-item
		role="menuitemradio"
		text="Radio 1"
		check-trailing
	></vwc-menu-item>
	<vwc-menu-item
		role="menuitemradio"
		text="Radio 2"
		check-trailing
	></vwc-menu-item>
	<vwc-menu-item
		icon="image-line"
		role="menuitemradio"
		text="Radio 3"
	></vwc-menu-item>
</vwc-menu>
```

### Check appearance

When `role` is set to `'menuitemcheckbox'` or `'menuitemradio'`, you can set the `check-appearance` attribute to change the appearance of the checkbox / radio indicator.

- Type: `'normal'` | `'tick-only'`
- Default: `'normal'`

```html preview 250px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item
		role="menuitemcheckbox"
		text="Checkbox 1"
		check-appearance="tick-only"
	></vwc-menu-item>
	<vwc-menu-item
		role="menuitemcheckbox"
		text="Checkbox 2"
		check-appearance="tick-only"
	></vwc-menu-item>
	<vwc-divider></vwc-divider>
	<vwc-menu-item
		role="menuitemradio"
		text="Radio 1"
		check-appearance="tick-only"
	></vwc-menu-item>
	<vwc-menu-item
		role="menuitemradio"
		text="Radio 1"
		check-appearance="tick-only"
	></vwc-menu-item>
</vwc-menu>
```

### Checked

The checked value of the element (if role is set to `'menuitemcheckbox'`).

- Type: `boolean`
- Default: `false`

```html preview 100px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item
		role="menuitemcheckbox"
		checked
		text="Checked Menu item"
	></vwc-menu-item>
</vwc-menu>
```

### Connotation

Use the `connotation` attribute to set the menu-item checked color.

- Type: `'accent'` | `'cta'`
- Default: `'accent'`

```html preview 200px
<vwc-menu open aria-label="Example menu" style="--menu-block-size: auto;">
	<vwc-menu-item
		role="menuitemcheckbox"
		checked
		text="menu item"
		text-secondary="connotation accent"
	></vwc-menu-item>
	<vwc-menu-item
		connotation="cta"
		role="menuitemcheckbox"
		checked
		text="menu item"
		text-secondary="connotation cta"
	></vwc-menu-item>
</vwc-menu>
```

### Disabled

The disabled state of the element

- Type: `boolean`
- Default: `false`

```html preview 100px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item disabled text="Disabled Menu item"></vwc-menu-item>
</vwc-menu>
```

<!-- ### Expanded

The expanded state of the element

- Type: `boolean`
- Default: `false` -->

## Slots

### meta

Assign nodes to the `meta` slot to set a badge or an additional icon.  
Slot `meta` makes icon/checkbox/radiobutton to be `trailing`.

```html preview 200px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item text="Available" role="menuitemradio">
		<vwc-badge
			slot="meta"
			appearance="filled"
			connotation="success"
			shape="pill"
			icon="check-solid"
		></vwc-badge>
	</vwc-menu-item>
	<vwc-menu-item text="Away" role="menuitemradio">
		<vwc-badge
			slot="meta"
			appearance="filled"
			connotation="warning"
			shape="pill"
			icon="clock-line"
		></vwc-badge>
	</vwc-menu-item>
	<vwc-menu-item text="Busy" role="menuitemradio" checked>
		<vwc-badge
			slot="meta"
			appearance="filled"
			connotation="alert"
			shape="pill"
			icon="minus-solid"
		></vwc-badge>
	</vwc-menu-item>
</vwc-menu>
```

### trailing-meta

Assign nodes to the `trailing-meta` slot to set a badge or an additional icon.

```html preview 170px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item role="menuitemcheckbox" text="Checkbox 1"> </vwc-menu-item>
	<vwc-menu-item role="menuitemcheckbox" text="Checkbox 2">
		<vwc-badge
			slot="trailing-meta"
			appearance="subtle"
			connotation="cta"
			text="new"
		></vwc-badge>
	</vwc-menu-item>
</vwc-menu>
```

### Submenu

Assign menu to the `submenu` slot to create a submenu.

```html preview 250px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item text="Menu item 1">
		<vwc-menu slot="submenu">
			<vwc-menu-item text="Menu item 1.1"></vwc-menu-item>
			<vwc-menu-item text="Menu item 1.2"></vwc-menu-item>
			<vwc-menu-item text="Menu item 1.3"></vwc-menu-item>
		</vwc-menu>
	</vwc-menu-item>
	<vwc-menu-item text="Menu item 2">
		<vwc-menu slot="submenu">
			<vwc-menu-item text="Menu item 2.1"></vwc-menu-item>
			<vwc-menu-item text="Menu item 2.2"></vwc-menu-item>
			<vwc-menu-item text="Menu item 2.3"></vwc-menu-item>
		</vwc-menu>
	</vwc-menu-item>
	<vwc-menu-item text="Menu item 3">
		<vwc-menu slot="submenu">
			<vwc-menu-item text="Menu item 3.1"></vwc-menu-item>
			<vwc-menu-item text="Menu item 3.2"></vwc-menu-item>
			<vwc-menu-item text="Menu item 3.3"></vwc-menu-item>
		</vwc-menu>
	</vwc-menu-item>
</vwc-menu>
```

## Events

<div class="table-wrapper">

| Name              | Type                       | Bubbles | Composed | Description                                                                                                                        |
| ----------------- | -------------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `expanded-change` | `CustomEvent<HTMLElement>` | No      | Yes      | Fires a custom 'expanded-change' event when the expanded state changes                                                             |
| `change`          | `CustomEvent<undefined>`   | No      | Yes      | Fires a custom 'change' event when a non-submenu item with a role of `menuitemcheckbox`, `menuitemradio`, or `menuitem` is invoked |

</div>

### Click

Fires a click event when its role is `presentation`

## CSS Variables

Line clamp by default is set to one line.

This can be changed by setting a css-variable to a fixed number of lines or `auto`

- `--text-primary-line-clamp` for the primary text.
- `--text-secondary-line-clamp` for the secondary text.

```html preview 200px
<style>
	vwc-menu {
		--text-primary-line-clamp: auto;
		--text-secondary-line-clamp: auto;
		--menu-max-inline-size: 200px;
	}
</style>
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item
		text="primary text with long text and auto line clamp"
		text-secondary="secondary text and auto line clamp"
	></vwc-menu-item>
</vwc-menu>
```

## Use Cases

### Anchored Menu Item

To create a menu item that is anchored to a URL do the following:

1. Set the `role` attribute to `presentation` on the `vwc-menu-item`.
2. Wrap the `vwc-menu-item` in an anchor tag.
3. Set the `role` attribute to `menuitem` on the anchor tag.

If you are using a framework, just wrap the menu item in any routing component/directive as done with the anchor tag.

```html preview 100px
<vwc-menu open aria-label="Example menu">
	<a
		role="menuitem"
		href="https://www.vonage.com"
		target="_blank"
		rel="noopener noreferrer"
	>
		<vwc-menu-item role="presentation" text="Go to Vonage" icon="vonage-solid">
			<vwc-icon name="open-line" slot="trailing-meta" size="-5"></vwc-icon>
		</vwc-menu-item>
	</a>
</vwc-menu>
```
