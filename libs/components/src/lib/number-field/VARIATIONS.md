## Labelling

### Label Text

The `label` attribute provides a short description of the purpose of the Number Field.

<vwc-note connotation="information" headline="Accessibility Tip">
<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
<p>If a visible label can't be used, provide one using the <nobr><code>aria-label</code></nobr> attribute. This ensures screen readers announce the purpose of the element, making it accessible to all users.</p>
</vwc-note>

```html preview
<vwc-number-field label="Wanted quantity"></vwc-number-field>
```

### Placeholder Text

The `placeholder` attribute provides an example of the type of input the user needs to enter.

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
	<p>Avoid using <code>placeholder</code> text as a substitute for a label. Placeholder text is not a reliable label—it disappears when users type and is not always announced by screen readers. Use a <code>label</code> element to ensure the Combobox is both visually and programmatically associated with a descriptive label.</p>
</vwc-note>

```html preview
<vwc-number-field placeholder="100" label="Wanted quantity"></vwc-number-field>
```

### Helper Text

The `helper-text` attribute provides additional information to help the user enter the correct information.

To add HTML to the helper text, use the [helper-text slot](/components/number-field/code/#helper-text-slot).

```html preview
<vwc-number-field
	label="Helper text below"
	helper-text="Help text"
></vwc-number-field>
```

## Value

Set the `value` attribute to set the default value for the number field.  
Setting the property on the element will not change the default value, but will change the value shown in the view as well as the submitted value in a form (imitating the native behavior).

<vwc-note connotation="information" headline="Values always use decimal separator">
<vwc-icon slot="icon" name="info-line"></vwc-icon>
<p>Values always use the period (".") as the decimal separator, regardless of the user's locale.
</p>
<p>Only the value on the screen is localized.
</p>
</vwc-note>

```html preview
<vwc-number-field label="With default value" value="5"></vwc-number-field>
```

### Value as Number

Use the `valueAsNumber` property to get or set the value as a number. If no valid value is entered in the field, the `valueAsNumber` is `NaN`.

```html preview locale-switcher
<vwc-number-field label="Quantity"></vwc-number-field>
<p>valueAsNumber: <span id="value"></span></p>

<script>
	function update() {
		document.getElementById('value').textContent =
			document.querySelector('vwc-number-field').valueAsNumber;
	}

	customElements.whenDefined('vwc-number-field').then(update);
	document.querySelector('vwc-number-field').addEventListener('input', update);
</script>
```

## Validation Feedback

### Success Text

The `success-text` attribute provides a custom success message. Any current error state will be overridden by `success-text`.

```html preview
<vwc-number-field
	label="Valid value"
	success-text="Great success"
></vwc-number-field>
```

## Scale

The `scale` attribute controls the Text Field input element display size.
Use `condensed` in situations when space is limited, for example, inside a Data Grid cell.

```html preview
<div class="container">
	<vwc-number-field label="Condensed" scale="condensed"></vwc-number-field>
	<vwc-number-field label="Normal" scale="normal"></vwc-number-field>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

<vwc-note connotation="information" headline="Scale instead of Size">
	<vwc-icon slot="icon" name="info-line"></vwc-icon>
	<p>The reason for using <code>scale</code> for form elements and not <code>size</code> (as used in other components such as Button), is that <code>size</code> is a HTML attribute that can be used on <code>input</code> elements (and also Number Field) to control the width of the input.</p>
</vwc-note>

## Shape

The `shape` attribute controls the border radius of the Number Field input element.

```html preview
<div class="container">
	<vwc-number-field label="Pill" shape="pill"></vwc-number-field>
	<vwc-number-field label="Rounded" shape="rounded"></vwc-number-field>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

## Appearance

The `appearance` attribute controls the style of the Number Field input element.<br />
Use `ghost` in combination with a containing element which provides a border, for example [Action Group](/components/action-group/).

```html preview
<div class="container">
	<vwc-number-field
		appearance="fieldset"
		placeholder="appearance"
		label="fieldset"
	></vwc-number-field>
	<vwc-number-field
		appearance="ghost"
		placeholder="appearance"
		label="ghost"
	></vwc-number-field>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

### Disabled

Add the `disabled` attribute to disable the Number field input element.

```html preview
<vwc-number-field
	disabled
	value="disabled"
	label="fieldset"
	appearance="fieldset"
></vwc-number-field>
```

### Readonly

The `readonly` attribute prevents the user from changing the Number Field input element value.

```html preview
<vwc-number-field
	readonly
	value="8"
	label="fieldset"
	appearance="fieldset"
></vwc-number-field>
```
