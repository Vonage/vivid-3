## Label

The `label` attribute adds a label to the Switch.

<vwc-note connotation="information" icon="accessibility-line" headline="Accessibility Tip">

If a visible label can't be used, provide one using the <nobr><code>aria-label</code></nobr> attribute. This ensures screen readers announce the purpose of the element, making it accessible to all users.

</vwc-note>

```html preview
<vwc-switch label="Email notifications"></vwc-switch>
```

## Checked

The `checked` attribute controls the checked state of the Switch.

```html preview
<vwc-switch checked label="Email notifications"></vwc-switch>
```

## Connotation

The `connotation` attribute controls the color of the switch.

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
	<vwc-switch connotation="primary" label="Primary" checked></vwc-switch>
	<vwc-switch connotation="cta" label="CTA" checked></vwc-switch>
	<vwc-switch
		connotation="announcement"
		label="Announcement"
		checked
	></vwc-switch>
	<vwc-switch connotation="success" label="Success" checked></vwc-switch>
	<vwc-switch connotation="alert" label="Alert" checked></vwc-switch>
</vwc-layout>
```

## Disabled

The `disabled` attribute sets the disabled state of the Switch.

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
	<vwc-switch disabled label="Email notifications off"></vwc-switch>
	<vwc-switch disabled checked label="Email notifications on"></vwc-switch>
</vwc-layout>
```

## Readonly

The `readonly` attribute sets the readonly state of the Switch.

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
	<vwc-switch readonly label="Email notifications off"></vwc-switch>
	<vwc-switch readonly checked label="Email notifications on"></vwc-switch>
</vwc-layout>
```
