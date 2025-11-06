---
title: Sizing
order: 5
---

# Sizing

## Density

Use `--vvd-size-density` to modify the density of the Vivid integrated UI. This can be scoped to a specific element, or set globally.
Due to a11y and design constraints, the density can only be set to one of the following values `-1` (most condensed), `0`, `1` and `2` (most expanded).

- Type: `-1` | `0` | `1` | `2`
- Default: `0`

```html preview blocks
<style>
	#scoped-region {
		--vvd-size-density: 1;
	}
</style>

<vwc-number-field label="Choose density" helper-text="Change density value" min="-1" max="2" value="1" style="justify-self: flex-start; width: 105px;"></vwc-number-field>

<vwc-divider></vwc-divider>

<div id="scoped-region">
	<form style="width: 250px">
		<vwc-layout column-basis="block">
			<vwc-text-field label="First name:"></vwc-text-field>

			<vwc-text-field label="Last name:"></vwc-text-field>

			<vwc-button appearance="filled" label="Submit"></vwc-button>
		</vwc-layout>
	</form>
</div>

<script>
	root = document.querySelector('#scoped-region');
	numberfield = document.querySelector('vwc-number-field');
	numberfield.addEventListener('change', (e) => root.style.setProperty('--vvd-size-density', e.target.value));
</script>
```
