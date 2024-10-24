## Validation

### In a Form

When a Select is placed inside a `form` element and validation logic is set on the Text Field, the Text Field is validated when the `form` is submitted (as per a native `select` element).

Below, all the "Title" field Select is marked as required and is validated when the `form` is submitted.

```html preview 360px
<form method="post" action="">
	<vwc-layout column-spacing="small" column-basis="block">
		<vwc-select required label="Title" placeholder="Select an option">
			<vwc-option value="mr" text="Mr"></vwc-option>
			<vwc-option value="mrs" text="Mrs"></vwc-option>
			<vwc-option value="miss" text="Miss"></vwc-option>
			<vwc-option value="ms" text="Ms"></vwc-option>
		</vwc-select>
		<vwc-text-field required label="First name"></vwc-text-field>
		<vwc-text-field required label="Last name"></vwc-text-field>
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
<vwc-select required label="Title" id="title" placeholder="Select an option">
	<vwc-option value="mr" text="Mr"></vwc-option>
	<vwc-option value="mrs" text="Mrs"></vwc-option>
	<vwc-option value="miss" text="Miss"></vwc-option>
	<vwc-option value="ms" text="Ms"></vwc-option>
</vwc-select>

<script>
	window.onload = () => {
		document.getElementById('title').checkValidity();
	};
</script>
```

## International Phone Number

The Select component is used in the example below as the dialing code part of an international phone number input field.

```html preview 240px
<vwc-action-group slot="body">
	<vwc-select
		fixed-dropdown
		aria-label="Country code"
		icon="flag-united-states"
		appearance="ghost"
		class="country-code"
		id="country-code"
	>
		<vwc-option value="1" text="+1" icon="flag-united-states"></vwc-option>
		<vwc-option value="44" text="+44" icon="flag-united-kingdom"></vwc-option>
		<vwc-option value="49" text="+49" icon="flag-germany"></vwc-option>
		<vwc-option value="355" text="+355" icon="flag-albania"></vwc-option>
	</vwc-select>
	<vwc-divider orientation="vertical"></vwc-divider>
	<vwc-text-field
		aria-label="Telephone number"
		type="tel"
		inputmode="tel"
		appearance="ghost"
	></vwc-text-field>
</vwc-action-group>

<script>
	const select = document.getElementById('country-code');
	select?.addEventListener('change', (e) => {
		select.icon = select.selectedOptions[0].icon;
	});
</script>
```

## Call Status

```html preview 250px
<vwc-select class="call-status" aria-label="Status">
	<vwc-icon class="icon" slot="icon" name="bullet-solid"></vwc-icon>
	<span slot="meta" class="duration">00:00:00</span>
	<vwc-option value="ready" text="Ready">
		<vwc-icon class="icon" slot="icon" name="bullet-solid"></vwc-icon>
	</vwc-option>
	<vwc-option value="away" text="Away">
		<vwc-icon class="icon" slot="icon" name="bullet-solid"></vwc-icon>
	</vwc-option>
	<vwc-option value="extended-away" text="Extended away">
		<vwc-icon class="icon" slot="icon" name="bullet-solid"></vwc-icon>
	</vwc-option>
	<vwc-option value="logged-out" text="Logged out">
		<vwc-icon class="icon" slot="icon" name="bullet-solid"></vwc-icon>
	</vwc-option>
</vwc-select>

<style>
	.call-status {
		width: 280px;
	}
	.icon {
		font-size: 12px;
	}
	.call-status[current-value='ready'] > .icon,
	vwc-option[value='ready'] > vwc-icon {
		color: var(--vvd-color-success-300);
	}
	.call-status[current-value='away'] > .icon,
	[value='away'] > .icon {
		color: var(--vvd-color-warning-300);
	}
	.call-status[current-value='extended-away'] > .icon,
	[value='extended-away'] > .icon {
		color: var(--vvd-color-announcement-500);
	}
	.call-status[current-value='logged-out'] > .icon,
	[value='logged-out'] > .icon {
		color: var(--vvd-color-neutral-300);
	}
	.duration {
		color: var(--vvd-color-neutral-600);
		text-align: end;
		flex-grow: 1;
	}
</style>
```
