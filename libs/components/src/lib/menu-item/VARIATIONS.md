## Text

The `text` attribute sets the text content.

```html preview 100px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item text="Menu item"></vwc-menu-item>
</vwc-menu>
```

### Secondary Text

The Menu Item can be given extra context using the `text-secondary` attribute.

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

The `icon` attribute sets an icon.

View list of available icon at the [vivid icons gallery](/icons/icons-gallery/).

```html preview 100px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item icon="file-pdf-line" text="Export to PDF"></vwc-menu-item>
</vwc-menu>
```

## Role

<vwc-note connotation="warning" icon="warning-line">

    Even though `menuitemradio` and `menuitemcheckbox` roles are valid roles documented in WAI-ARIA 1.2, they are not read properly by the screen readers.
    Therefore it is recommended to use `checkbox` role instead of `menuitemcheckbox` and `radio` role instead of `menuitemradio` role.

</vwc-note>

The `role` attribute sets the role.
The default value is `menuitem`. See the [API Reference](/component/menu/code/#menu-item) for all possibile values.

```html preview 330px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item role="menuitem" text="menuitem 1"></vwc-menu-item>
	<vwc-menu-item role="menuitem" text="menuitem 2"></vwc-menu-item>
	<vwc-divider></vwc-divider>
	<vwc-menu-item role="checkbox" text="menuitemcheckbox 1"></vwc-menu-item>
	<vwc-menu-item role="checkbox" text="menuitemcheckbox 2"></vwc-menu-item>
	<vwc-divider></vwc-divider>
	<vwc-menu-item role="radio" text="menuitemradio 1"></vwc-menu-item>
	<vwc-menu-item role="radio" text="menuitemradio 2"></vwc-menu-item>
	<vwc-divider></vwc-divider>
	<a
		role="menuitem"
		href="https://www.vonage.com"
		target="_blank"
		rel="noopener noreferrer"
	>
		<vwc-menu-item
			role="presentation"
			text="presentation"
			icon="open-line"
		></vwc-menu-item>
	</a>
</vwc-menu>
```

### Check Trailing

When the `role` attribute is set to `menuitemcheckbox`, `menuitemradio`, `checkbox` or `radio` the `check-trailing` attribute places the checkbox / radio indicator at the end of the Menu Item.

<vwc-note connotation="information" icon="info-line">

If the `icon` attribute is present, the indicator will be trailing by default.

</vwc-note>

```html preview 280px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item
		role="checkbox"
		text="Checkbox 1"
		check-trailing
	></vwc-menu-item>
	<vwc-menu-item
		role="checkbox"
		text="Checkbox 2"
		check-trailing
	></vwc-menu-item>
	<vwc-menu-item
		icon="image-line"
		role="checkbox"
		text="Checkbox 3"
	></vwc-menu-item>
	<vwc-divider></vwc-divider>
	<vwc-menu-item role="radio" text="Radio 1" check-trailing></vwc-menu-item>
	<vwc-menu-item role="radio" text="Radio 2" check-trailing></vwc-menu-item>
	<vwc-menu-item icon="image-line" role="radio" text="Radio 3"></vwc-menu-item>
</vwc-menu>
```

### Check Appearance

When the `role` attribute is set to `menuitemcheckbox` or `menuitemradio`, the `check-appearance` attribute changes the appearance of the checkbox / radio indicator.

In the example below it is set to `tick-only` (default is `normal`).

```html preview 250px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item
		role="checkbox"
		text="Checkbox 1"
		check-appearance="tick-only"
		checked
	></vwc-menu-item>
	<vwc-menu-item
		role="checkbox"
		text="Checkbox 2"
		check-appearance="tick-only"
		checked
	></vwc-menu-item>
	<vwc-menu-item
		role="checkbox"
		text="Checkbox 3"
		check-appearance="tick-only"
	></vwc-menu-item>
	<vwc-divider></vwc-divider>
	<vwc-menu-item
		role="radio"
		text="Radio 1"
		check-appearance="tick-only"
	></vwc-menu-item>
	<vwc-menu-item
		role="radio"
		text="Radio 2"
		check-appearance="tick-only"
		checked
	></vwc-menu-item>
</vwc-menu>
```

### Checked

When the `role` attribute is set to `menuitemcheckbox` or `menuitemradio`, the `checked` attribute sets the checked state.

```html preview 100px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item
		checked
		role="checkbox"
		text="Checked Checkbox Menu Item"
	></vwc-menu-item>
	<vwc-divider></vwc-divider>
	<vwc-menu-item
		checked
		role="radio"
		text="Checked Radio Menu Item"
	></vwc-menu-item>
</vwc-menu>
```

## Connotation

The `connotation` attribute controls the checked color.

```html preview 110px
<vwc-menu open aria-label="Example menu" style="--menu-block-size: auto;">
	<vwc-menu-item
		role="checkbox"
		checked
		text="Accent (default)"
	></vwc-menu-item>
	<vwc-menu-item
		connotation="cta"
		role="checkbox"
		checked
		text="CTA"
	></vwc-menu-item>
</vwc-menu>
```

## Disabled

The `disabled` attribute controls the disabled state.

```html preview 100px
<vwc-menu open aria-label="Example menu">
	<vwc-menu-item disabled text="Disabled Menu item"></vwc-menu-item>
</vwc-menu>
```
