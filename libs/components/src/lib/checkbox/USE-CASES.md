## In a Form

```html preview
<form method="post" action="">
	<vwc-layout column-spacing="small" column-basis="block">
		<vwc-checkbox required label="I agree to the terms and conditions"></vwc-checkbox>
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
</style>
```

## Select All

```html preview
<div class="container">
	<vwc-checkbox id="select-all" label="Select all"></vwc-checkbox>
	<vwc-divider></vwc-divider>
	<div class="options">
		<vwc-checkbox label="Option 1"></vwc-checkbox>
		<vwc-checkbox label="Option 2"></vwc-checkbox>
		<vwc-checkbox label="Option 3"></vwc-checkbox>
	</div>
</div>

<script>
	document.querySelector('.options').addEventListener('change', () => {
		const checkboxes = document.querySelectorAll('.options vwc-checkbox');
		const allChecked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
		const allUnchecked = Array.from(checkboxes).every((checkbox) => !checkbox.checked);
		const selectAll = document.querySelector('#select-all');
		selectAll.checked = allChecked;
		selectAll.indeterminate = !allChecked && !allUnchecked;
	});

	document.querySelector('#select-all').addEventListener('change', () => {
		const checkboxes = document.querySelectorAll('.options vwc-checkbox');
		const allChecked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
		const newState = event.target.checked;

		if (allChecked !== newState) {
			for (const checkbox of checkboxes) {
				checkbox.checked = newState;
			}
		}
	});
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.options {
		display: contents;
	}
</style>
```
