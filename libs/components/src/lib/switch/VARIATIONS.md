## Label

The `label` attribute adds a label to the Switch.

```html preview
<vwc-switch label="Email notifications"></vwc-switch>
```

<vwc-note connotation="information" icon="info-line" headline="Accessibility note">
	<p>If you can not use the visible <code>label</code>, provide it using the <code>aria-label</code> attribute.</p>
	<p>It will be announced by screen readers so that those users will know the purpose of the Switch.</p>
</vwc-note>

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
	<vwc-switch connotation="announcement" label="Announcement" checked></vwc-switch>
	<vwc-switch connotation="success" label="Success" checked></vwc-switch>
	<vwc-switch connotation="alert" label="Alert" checked></vwc-switch>
</vwc-layout>
```

## Disabled

The `disabled` attribute sets the disabled state of the Switch.

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
	<vwc-switch disabled label="Email notifications"></vwc-switch>
	<vwc-switch disabled checked label="Email notifications"></vwc-switch>
</vwc-layout>
```

## Readonly

The `readonly` attribute sets the readonly state of the Switch.

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
	<vwc-switch readonly label="Email notifications"></vwc-switch>
	<vwc-switch readonly checked label="Email notifications"></vwc-switch>
</vwc-layout>
```