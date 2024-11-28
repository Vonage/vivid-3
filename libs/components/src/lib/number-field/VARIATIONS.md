## Labelling

### Label Text

The `label` attribute provides a short description of the purpose of the Number Field.

```html preview
<vwc-number-field label="My Label"></vwc-number-field>
```

<vwc-note connotation="information" icon="info-line" headline="Accessibility note">
	<p>If you can not use the visible <code>label</code>, provide it using the <code>aria-label</code> attribute.</p>
	<p>It will be announced by screen readers so that those users will know the purpose of the Number Field.</p>
</vwc-note>

### Helper Text

The `helper-text` attribute provides additional information to help the user enter the correct informaton.

To add HTML to the helper text, use the [helper-text slot](/components/text-field/code/#helper-text-slot).

```html preview
<vwc-number-field placeholder="My Placeholder"></vwc-number-field>
```

### Placeholder Text

The `placeholder` attribute provides an example of the type of input the user needs to enter.

```html preview
<vwc-text-field
	placeholder="name@domain.com"
	label="Email address"
	type="email"
></vwc-text-field>
```

<vwc-note connotation="warning" icon="warning-line" headline="Placeholder text should not be used as a label">
	<p>Using <code>placeholder</code> text to label the Text Field harms accessibility and user experience. The <code>label</code> text is visually and programmatically associated with its corresponding form control.</p>
</vwc-note>


## Value

The `value` attribute can be used the set the default value for the Text Field input element.

```html preview
<vwc-text-field value="Joe" label="Username"></vwc-text-field>
```

## Validation Feedback

### Error Text

The `error-text` attribute provides a custom error message. Any current error state will be overridden by `error-text`.

```html preview
<vwc-text-field
	error-text="Username is already taken"
	value="Joe"
	label="Username"
></vwc-text-field>
```

### Success Text

The `success-text` attribute provides a custom success message. Any current error state will be overridden by `success-text`.

```html preview
<vwc-text-field
	success-text="Username is available"
	value="JoeB_89"
	label="Username"
></vwc-text-field>
```
