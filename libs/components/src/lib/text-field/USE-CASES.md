## Validation

### In a Form

When a Text Field is placed inside a `form` element and validation logic is set on the Text Field, the Text Field is validated when the `form` is submitted (as per a native `input` element).

Below, all the Text Fields are marked as required and are validated when the `form` is submitted.

```html preview 365px
<form method="post" action="">
	<vwc-layout column-spacing="small" column-basis="block">
		<vwc-text-field required label="First name"></vwc-text-field>
		<vwc-text-field required label="Last name"></vwc-text-field>
		<vwc-text-field
			required
			label="Email"
			type="email"
			inputmode="email"
		></vwc-text-field>
		<div class="buttons">
			<vwc-button label="Reset" appearance="outlined" type="reset"></vwc-button>
			<vwc-button label="Submit" appearance="filled" type="submit"></vwc-button>
		</div>
	</vwc-layout>
</form>

<style>
	.buttons {
		display: flex;
		gap: 12px;
	}
	form {
		max-inline-size: 300px;
	}
</style>
```

### Single Field

The Text Field can be validated like the native `input` element.

Below, the Text Field is `required` but it has no `value`. The `checkedValidity()` method is called on the Text Field to validate it.

```html preview
<vwc-text-field required label="Username"></vwc-text-field>

<script>
	window.onload = () => {
		document.querySelector('vwc-text-field').checkValidity();
	};
</script>
```

## Numeric input

When collecting input which is made up of digits, but not a number in the mathematical sense, use the Text Field with `inputmode="numeric"` and `pattern="[0-9]*"`.

For mathematical numbers, refer to the [`number-field`](/components/number-field/) component instead.

```html preview
<vwc-text-field
	inputmode="numeric"
	pattern="[0-9]*"
	label="ZIP Code"
	placeholder="e.g. 90210"
></vwc-text-field>
```
