## Labelling

### Label Text

The `label` attribute provides a short description of the purpose of the Color Picker.

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
	<p>If a visible label can't be used, provide one using the <nobr><code>aria-label</code></nobr> attribute. This ensures screen readers announce the purpose of the element, making it accessible to all users.</p>
</vwc-note>

```html preview 480px
<vwc-color-picker
	label="Primary color"
	saved-colors-key="vvd-color-picker-label"
></vwc-color-picker>
```

### Helper Text

The `helper-text` attribute provides additional information about the purpose of the Color Picker.  
To add HTML to the helper text, use the [helper-text slot](/components/color-picker/code/#helper-text-slot).

```html preview 480px
<vwc-color-picker
	label="Primary color"
	helper-text="Choose the Primary Color"
	saved-colors-key="vvd-color-picker-helper-text"
></vwc-color-picker>
```

### Placeholder Text

The `placeholder` attribute provides some text to be displayed when no color is selected.

```html preview 480px
<vwc-color-picker
	label="Color Picker with Placeholder"
	placeholder="#ffffff"
	saved-colors-key="vvd-color-picker-placeholder"
></vwc-color-picker>
```

### Contextual Help

You can add the [Contextual Help](/components/contextual-help/) component using the `contextual-help` slot. It will be displayed next to the label, providing users additional information.

```html preview 480px
<vwc-color-picker
	label="Color Picker"
	saved-colors-key="vvd-color-picker-contextual-help"
>
	<vwc-contextual-help slot="contextual-help"
		>Choose your brand color</vwc-contextual-help
	>
</vwc-color-picker>
```

## Validation Feedback

### Error Text

The `error-text` attribute provides a custom error message. Any current error state will be overridden by `error-text`.

```html preview 480px
<vwc-color-picker
	label="Color Picker"
	value="example"
	saved-colors-key="vvd-color-picker-error"
	error-text="This is not a correct HEX color"
></vwc-color-picker>
```

### Success Text

The `success-text` attribute provides a custom success message. Any current error state will be overridden by `success-text`.

```html preview 480px
<vwc-color-picker
	label="Color Picker"
	value="#FA7454"
	success-text="Great success"
></vwc-color-picker>
```

## Value

The `value` attribute can be used to set the default value for the Color Picker element.

```html preview 480px
<vwc-color-picker
	label="Primary color"
	value="#D6219C"
	saved-colors-key="vvd-color-picker-value"
></vwc-color-picker>
```

## Swatches

The `swatches` attribute can be used to set the default color palette that will be displayed in the Color Picker's Popup.

It accepts an array of objects with `value` and `label` properties: `[{"label": "Red", "value": "#ff0000"}, {"value": "#00ff00"}]`. The optional `label` property provides descriptive text for screen readers, improving accessibility.

```html preview 480px
<vwc-color-picker
	id="picker"
	label="Primary color"
	value="#D6219C"
	saved-colors-key="vvd-color-picker-swatches"
></vwc-color-picker>

<script>
	const swatches = [
		{
			label: 'Magenta',
			value: '#D6219C',
		},
		{
			label: 'Blue',
			value: '#80C7F5',
		},
		{
			label: 'Orange',
			value: '#FA7454',
		},
		{
			label: 'Peach',
			value: '#FCAC98',
		},
	];

	const picker = document.getElementById('picker');
	picker.swatches = swatches;
</script>
```

### Max Swatches

The maximum number of displayed color swatches (either saved by the user or passed using `swatches` attribute) can be set using the `max-swatches` attribute.

```html preview 480px
<vwc-color-picker
	label="Primary color"
	max-swatches="4"
	saved-colors-key="vvd-color-picker-max-swatches"
></vwc-color-picker>
```

### Swatches Text

The default **"Saved Colors:"** text displayed above the color swatches can be overridden with `swatches-text` slot.

```html preview 480px
<vwc-color-picker
	id="picker"
	label="Brand color"
	value="#D6219C"
	disable-saved-colors
>
	<span slot="swatches-text">Brand Colors:</span>
</vwc-color-picker>

<script>
	const swatches = [
		{
			label: 'Magenta',
			value: '#D6219C',
		},
		{
			label: 'Blue',
			value: '#80C7F5',
		},
		{
			label: 'Orange',
			value: '#FA7454',
		},
		{
			label: 'Peach',
			value: '#FCAC98',
		},
	];

	const picker = document.getElementById('picker');
	picker.swatches = swatches;
</script>
```

## Disabled

The `disabled` attribute disables the Color Picker element.

```html preview 480px
<vwc-color-picker label="Primary color" disabled></vwc-color-picker>
```
