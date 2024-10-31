## Labelling

### Label Text

The `label` attribute provides a short description of the purpose of the Text Field.

```html preview
<vwc-text-field label="First name"></vwc-text-field>
```

<vwc-note connotation="information" icon="info-line" headline="Accessibility note">
	<p>If you can not use the visible <code>label</code>, provide it using the <code>aria-label</code> attribute.</p>
	<p>It will be announced by screen readers so that those users will know the purpose of the Text Field.</p>
</vwc-note>

### Helper Text

The `helper-text` attribute provides additional information to help the user enter the correct informaton.

To add HTML to the helper text, use the [helper-text slot](/components/text-field/code/#helper-text-slot).

```html preview
<vwc-text-field
	helper-text="Must be at least six chars and contain both letters and numbers"
	label="Password"
	type="password"
></vwc-text-field>
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

### Character Count

The `char-count` attribute can be use in combination with the `maxlength` attribute to provide a visual character count.

```html preview
<vwc-text-field
	char-count
	maxlength="15"
	label="Username"
	helper-text="Maximum of 15 characters"
></vwc-text-field>
```

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

## Icon

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery), which prefixes the Text Field's input element.

To add custom icons or to postfix icons, use the [slots](/components/text-field/code/#slots) provided (`action-items` and `leading-action-items`).

```html preview
<vwc-text-field
	icon="search-line"
	label="Search"
	type="search"
></vwc-text-field>
```

## Scale

The `scale` attribute controls the Text Field input element display size.
Use `condensed` in situations when space is limited, for example, inside a Data Grid cell.

```html preview
<div class="container">
	<vwc-text-field scale="normal" label="Normal"></vwc-text-field>
	<vwc-text-field scale="condensed" label="Condensed"></vwc-text-field>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

<vwc-note connotation="information" icon="info-line" headline="Scale instead of Size">
	<p>The reason for using <code>scale</code> for form elements and not <code>size</code> (as used in other components such as Button), is that <code>size</code> is a HTML attribute that can be used on <code>input</code> elements (and also Text Field) to control the width of the input.</p>
</vwc-note>

## Shape

The `shape` attribute controls the border radius of the Text Field input element.

```html preview
<div class="container">
	<vwc-text-field shape="rounded" label="Rounded"></vwc-text-field>
	<vwc-text-field shape="pill" label="Pill"></vwc-text-field>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

## Appearance

The `appearance` attribute controls the style of the Text Field input element.<br />
Use `ghost` in combination with a containing element which provides a border, for example [Action Group](/components/action-group/).

```html preview
<div class="container">
	<vwc-text-field
		appearance="fieldset"
		label="Fieldset"
		placeholder="Appearance"
	></vwc-text-field>
	<vwc-text-field
		appearance="ghost"
		label="Ghost"
		placeholder="Appearance"
	></vwc-text-field>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

## Disabled

The `disabled` attribute disables the Text Field input element.

```html preview
<vwc-text-field disabled label="Username"></vwc-text-field>
```

## Read Only

The `readonly` attribute prevents the user from changing the Text Field input element value.

```html preview
<vwc-text-field readonly label="Username" value="JoeB_89"></vwc-text-field>
```
