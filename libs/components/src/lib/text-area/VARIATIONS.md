## Labelling

### Label Text

The `label` attribute provides a short description of the purpose of the Text Area.

<vwc-note connotation="information" icon="accessibility-line" headline="Accessibility Tip">

If a visible label can't be used, provide one using the <nobr><code>aria-label</code></nobr> attribute. This ensures screen readers announce the purpose of the element, making it accessible to all users.
</vwc-note>

```html preview
<vwc-text-area label="Your comments"></vwc-text-area>
```

### Helper Text

The `helper-text` attribute provides additional information to help the user enter the correct information.

To add HTML to the helper text, use the [helper-text slot](/components/text-area/code/#helper-text-slot).

```html preview
<vwc-text-area
	helper-text="Help text"
	label="Helper text below"
></vwc-text-area>
```

### Placeholder Text

The `placeholder` attribute provides an example of the type of input the user needs to enter.

<vwc-note connotation="information" icon="accessibility-line" headline="Accessibility Tip">
	<p>Avoid using <code>placeholder</code> text as a substitute for a label. Placeholder text is not a reliable label—it disappears when users type and is not always announced by screen readers. Use a <code>label</code> element to ensure the Combobox is both visually and programmatically associated with a descriptive label.</p>
</vwc-note>

```html preview
<vwc-text-area
	placeholder="My Placeholder"
	label="Text Area with placeholder"
></vwc-text-area>
```

## Character Count

The `char-count` attribute can be use in combination with the `maxlength` attribute to provide a visual character count.

```html preview
<vwc-text-area
	label="Char count example"
	char-count
	maxlength="15"
></vwc-text-area>
```

## Value

The `value` attribute can be used the set the default value for the Text Area input element.

```html preview
<vwc-text-area value="Default Value" label="text-area value"></vwc-text-area>
```

## Validation Feedback

### Error Text

The `error-text` attribute provides a custom error message. Any current error state will be overridden by `error-text`.

```html preview
<vwc-text-area
	value="some text"
	label="Enter some text"
	error-text="Please take this seriously"
></vwc-text-area>
```

### Success Text

The `success-text` attribute provides a custom success message. Any current error state will be overridden by `success-text`.

```html preview
<vwc-text-area
	label="Success text below"
	success-text="Success text"
></vwc-text-area>
```

## Rows

Use the `rows` attribute to set the number of visible rows of text in the Text Area.

<vwc-note icon="info-line" connotation="information">Each addition line added 20px - the font size + line height.
</vwc-note>

```html preview
<vwc-text-area
	rows="1"
	value="1 row text area (36px)"
	label="text-area label"
></vwc-text-area>
<vwc-text-area
	rows="2"
	value="2 rows text area are the default (56px)"
	label="text-area label"
></vwc-text-area>
<vwc-text-area
	rows="3"
	value="3 rows text area (76px)"
	label="text-area label"
></vwc-text-area>
```

## Disabled

The `disabled` attribute disables the Text Area input element.

```html preview
<vwc-text-area disabled value="disabled" label="fieldset"></vwc-text-area>
```

## Read Only

The `readonly` attribute prevents the user from changing the Text Area value.

```html preview
<vwc-text-area readonly value="readonly text" label="fieldset"></vwc-text-area>
```
