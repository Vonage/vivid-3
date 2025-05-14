## Inside Toolbar

If the Radio Group is a child of an element with a `role` of `toolbar`, it's keyboard navigation behaviour will change to align with the [toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/):

- When pressing Left/Right arrow keys on the first/last radio button, the focus will move to the previous/next element in the toolbar.
- Moving the focus with arrow keys will not automatically select the radio buttons.

```html preview
<vwc-action-group role="toolbar" style="display: flex;">
	<vwc-button label="Before"></vwc-button>
	<vwc-radio-group>
		<vwc-radio label="1" value="1"></vwc-radio>
		<vwc-radio label="2" value="2"></vwc-radio>
		<vwc-radio label="3" value="3"></vwc-radio>
	</vwc-radio-group>
	<vwc-button label="After"></vwc-button>
</vwc-action-group>
```

## Validation

### In a Form

When a Radio Group is placed inside a `form` element and validation logic is set on the Radio Group, the Radio Group is validated when the `form` is submitted (as per a native `input` element).

Below, the Radio Field is marked as required and are validated when the `form` is submitted.

```html preview 365px
<form method="post" action="">
	<vwc-layout column-spacing="small" column-basis="block">
		<vwc-radio-group orientation="vertical" name="chosenValue" required>
			<vwc-radio label="option 1" value="1"></vwc-radio>
			<vwc-radio label="option 2" value="2"></vwc-radio>
			<vwc-radio label="option 3" value="3"></vwc-radio>
		</vwc-radio-group>
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

Below, the Radio Group is `required` but it has no checked options. You can use the `checkValidity()` method on one of the Radio's to validate it.

```html preview
<vwc-radio-group
	orientation="vertical"
	name="chosenValue"
	required
	label="Pick an option"
>
	<vwc-radio label="option 1" value="1"></vwc-radio>
	<vwc-radio label="option 2" value="2"></vwc-radio>
	<vwc-radio label="option 3" value="3"></vwc-radio>
</vwc-radio-group>

<script>
	window.onload = () => {
		document.querySelector('vwc-radio[name="chosenValue"]').checkValidity();
	};
</script>
```
