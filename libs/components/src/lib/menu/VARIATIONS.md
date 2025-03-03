### Open

The `open` attribute on **Menu** controls the open state.

```html preview 150px
<vwc-menu open aria-label="Menu example">
	<vwc-menu-item text="Menu item 1"></vwc-menu-item>
	<vwc-menu-item text="Menu item 2"></vwc-menu-item>
</vwc-menu>
```

### Placement

The `placement` attribute on **Menu** controls the position of the Menu relative to its anchor element. See the [API Reference](/component/menu/code/#menu) for all possibile values.

```html preview 150px
<div style="position: relative; text-align: end;">
	<vwc-menu
		placement="left-start"
		open
		trigger="auto"
		aria-label="Menu example"
	>
		<vwc-button
			slot="anchor"
			label="Toggle Menu"
			appearance="outlined"
		></vwc-button>
		<vwc-menu-item text="Menu item 1"></vwc-menu-item>
		<vwc-menu-item text="Menu item 2"></vwc-menu-item>
	</vwc-menu>
</div>
```

<vwc-note connotation="warning" icon="warning-line" headline="Bottom Placement at Viewport side">

When the menu anchor is placed close to the start/end of the viewport, `placement` of `bottom` or `top` will not present well due to lack of space.

In such cases - prefer using `bottom-start` or `end` instead.

</vwc-note>

## Text

The `text` attribute on **Menu Item** sets the text content.

```html preview 100px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item text="Menu item"></vwc-menu-item>
</vwc-menu>
```

### Secondary Text

The **Menu Item** can be given extra context using the `text-secondary` attribute.

<vwc-note connotation="information" icon="info-line">

To improve readability, **avoid long text and multiple lines** where possible.

</vwc-note>

```html preview 150px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item
		text="Menu item"
		text-secondary="Secondary text"
	></vwc-menu-item>
</vwc-menu>
```

## Icon

The `icon` attribute on **Menu Item** sets an icon.

View list of available icon at the [vivid icons gallery](/icons/icons-gallery/).

```html preview 100px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item icon="file-pdf-line" text="Export to PDF"></vwc-menu-item>
</vwc-menu>
```

<vwc-note connotation="warning" icon="warning-line" headline="Accessibility note">

Icon only Menu Items need an accessible label. An `aria-label` or `title` must be provided to ensure that the user can understand the Menu Item's purpose.

</vwc-note>

## Role

The `role` attribute on **Menu Item** sets its role. It's default value is `menuitem`. See the [API Reference](/component/menu/code/#menu-item) for all possibile values.

```html preview 330px
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
	<a
		role="menuitem"
		href="https://www.vonage.com"
		target="_blank"
		rel="noopener noreferrer"
	>
		<vwc-menu-item
			role="presentation"
			text="Link to Vonage"
			icon="open-line"
		></vwc-menu-item>
	</a>
</vwc-menu>
```

### Check Trailing

When the `role` attribute on **Menu Item** is set to `menuitemcheckbox` or `menuitemradio`, the `check-trailing` attribute places the checkbox / radio indicator at the end of the Menu Item.

<vwc-note connotation="information" icon="info-line">

If the `icon` attribute is present, the indicator will be trailing by default.

</vwc-note>

```html preview 280px
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
		text="Checkbox 3"
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

### Check Appearance

When the `role` attribute on **Menu Item** is set to `menuitemcheckbox` or `menuitemradio`, the `check-appearance` attribute changes the appearance of the checkbox / radio indicator.

In the example below it is set to `tick-only` (default is `normal`).

```html preview 250px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item
		role="menuitemcheckbox"
		text="Checkbox 1"
		check-appearance="tick-only"
		checked
	></vwc-menu-item>
	<vwc-menu-item
		role="menuitemcheckbox"
		text="Checkbox 2"
		check-appearance="tick-only"
		checked
	></vwc-menu-item>
	<vwc-menu-item
		role="menuitemcheckbox"
		text="Checkbox 3"
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
		text="Radio 2"
		check-appearance="tick-only"
		checked
	></vwc-menu-item>
</vwc-menu>
```

### Checked

When the `role` attribute on **Menu Item** is set to `menuitemcheckbox` or `menuitemradio`, the `checked` attribute sets it's set state.

```html preview 100px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item
		checked
		role="menuitemcheckbox"
		text="Checked Checkbox Menu Item"
	></vwc-menu-item>
	<vwc-divider></vwc-divider>
	<vwc-menu-item
		checked
		role="menuitemradio"
		text="Checked Radio Menu Item"
	></vwc-menu-item>
</vwc-menu>
```

## Connotation

The `connotation` attribute on **Menu Item** controls it's checked color.

```html preview 110px
<vwc-menu open aria-label="Example menu" style="--menu-block-size: auto;">
	<vwc-menu-item
		role="menuitemcheckbox"
		checked
		text="Accent (default)"
	></vwc-menu-item>
	<vwc-menu-item
		connotation="cta"
		role="menuitemcheckbox"
		checked
		text="CTA"
	></vwc-menu-item>
</vwc-menu>
```

## Disabled

The `disabled` attribute on **Menu Item** controls it's disabled state.

```html preview 100px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item disabled text="Disabled Menu item"></vwc-menu-item>
</vwc-menu>
```
