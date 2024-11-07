## Usage

<vwc-tabs>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/select';
```

or, if you need to use a unique prefix:

```js
import { registerSelect } from '@vonage/vivid';

registerSelect('your-prefix');
```

```html preview 270px
<script type="module">
	import { registerSelect, registerOption } from '@vonage/vivid';
	registerSelect('your-prefix');
	registerOption('your-prefix');
</script>

<your-prefix-select label="Title" placeholder="Select an option">
	<your-prefix-option value="mr" text="Mr"></your-prefix-option>
	<your-prefix-option value="mrs" text="Mrs"></your-prefix-option>
	<your-prefix-option value="miss" text="Miss"></your-prefix-option>
	<your-prefix-option value="ms" text="Ms"></your-prefix-option>
</your-prefix-select>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VSelect, VOption } from '@vonage/vivid-vue';
</script>

<template>
	<VSelect label="Title" placeholder="Select an option">
		<VOption value="mr" text="Mr" />
		<VOption value="mrs" text="Mrs" />
		<VOption value="miss" text="Miss" />
		<VOption value="ms" text="Ms" />
	</VSelect>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Custom Width

By default, the Select's `width` is `fit-content` and the same goes for the listbox containing the options.

You can specify the `width` of the Select using CSS.

```html preview 230px
<vwc-select class="select" label="Choose an option">
	<vwc-option value="1" text="Option 1: dogs"></vwc-option>
	<vwc-option value="2" text="Option 2: cats"></vwc-option>
	<vwc-option value="3" text="Option 3: dogs and cats"></vwc-option>
</vwc-select>

<style>
	.select {
		max-width: 320px;
		width: 100%;
	}
</style>
```

## Fixed Dropdown

The `fixed-dropdown` attribute is useful for cases in which the dropdown is obstructed by other elements.

In the example below, if `fixed-dropdown` was not set on the Select, the select dropdown would be cut off where the Dialog ends.
Also, see [the Grid Select example](/components/data-grid/#select-in-a-grid)).

```html preview 320px
<vwc-dialog
	open
	headline="Telephone Number"
	icon="call-line"
	icon-placement="side"
>
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
	<vwc-button
		slot="action-items"
		appearance="filled"
		label="Submit"
	></vwc-button>
</vwc-dialog>

<script>
	const select = document.getElementById('country-code');
	select?.addEventListener('change', (e) => {
		select.icon = select.selectedOptions[0].icon;
	});
</script>
```

## Open

The `open` attribute allows the Select to be openned programmatically.

```html preview 270px
<vwc-select open label="Title" placeholder="Select an option">
	<vwc-option value="mr" text="Mr"></vwc-option>
	<vwc-option value="mrs" text="Mrs"></vwc-option>
	<vwc-option value="miss" text="Miss"></vwc-option>
	<vwc-option value="ms" text="Ms"></vwc-option>
</vwc-select>
```

<br /><br />

<vwc-note connotation="warning" icon="warning-line" headline="Stacking Context">

Document elements display precedence is formed by the imaginary z-axis [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context), commonly by order of which elements are rendered and special properties (e.g. _z-index_).

Select component is a low level element, unaware of its document context, but is, in most cases, required to overlay on top of all elements. If needed a `z-index` value can be set on the host.

</vwc-note>

## Slots

### Default Slot

This is where you place the [Option](/components/option/) components to provide the option list.

```html preview 270px
<vwc-select label="Title" placeholder="Select an option">
	<vwc-option value="mr" text="Mr"></vwc-option>
	<vwc-option value="mrs" text="Mrs"></vwc-option>
	<vwc-option value="miss" text="Miss"></vwc-option>
	<vwc-option value="ms" text="Ms"></vwc-option>
</vwc-select>
```

### Meta Slot

Set the `meta` slot to show meta information after the selected option label.

```html preview 230px
<vwc-select aria-label="Options Selector" class="select">
	<vwc-badge slot="meta" connotation="success" text="Beta"></vwc-badge>
	<vwc-option value="1" text="Option 1"></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
	<vwc-option value="3" text="Option 3"></vwc-option>
</vwc-select>
<vwc-select aria-label="Options Selector" class="select">
	<span slot="meta" class="duration">00:00:00</span>
	<vwc-option value="1" text="Option 1"></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
	<vwc-option value="3" text="Option 3"></vwc-option>
</vwc-select>

<style>
	.select {
		width: 250px;
	}
	.duration {
		color: var(--vvd-color-neutral-600);
		text-align: end;
		flex-grow: 1;
	}
</style>
```

### Icon Slot

Set the `icon` slot to show an icon before the selected option text.
If set, the `icon` attribute is ignored.

```html preview 230px
<vwc-select aria-label="Options Selector" class="select">
	<vwc-icon
		slot="icon"
		name="check-circle-solid"
		connotation="success"
	></vwc-icon>
	<vwc-option value="1" text="Option 1"></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
	<vwc-option value="3" text="Option 3"></vwc-option>
</vwc-select>

<style>
	.select {
		width: 150px;
	}
</style>
```

### Helper Text Slot

The `helper-text` slot allows you to use rich content as the select's helper text.

```html preview 230px
<vwc-select label="Business Type">
	<span slot="helper-text">
		Please select the <a href="#">type of your business</a>.
	</span>
	<vwc-option value="ngo" text="Non-Governmental Organization"></vwc-option>
	<vwc-option value="gov" text="Governmental Organization"></vwc-option>
	<vwc-option value="edu" text="Educational Institution"></vwc-option>
</vwc-select>
```

## CSS Variables

### Dropdown Height

Use `--select-height` to customize the `max-height` of the dropdown.

```html preview 230px
<vwc-select aria-label="Options Selector" class="select">
	<vwc-option value="1" text="Option 1"></vwc-option>
	<vwc-option value="2" text="Option 2"></vwc-option>
	<vwc-option value="3" text="Option 3"></vwc-option>
	<vwc-option value="4" text="Option 4"></vwc-option>
	<vwc-option value="5" text="Option 5"></vwc-option>
	<vwc-option value="6" text="Option 6"></vwc-option>
	<vwc-option value="7" text="Option 7"></vwc-option>
</vwc-select>

<style>
	.select {
		--select-height: 150px;
	}
</style>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name               | Type                            | Description                                                                                                                 |
| ------------------ | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **appearance**     | `fieldset` (default), `ghost`   | Sets the element's appearance                                                                                               |
| **disabled**       | `boolean`                       | Sets the element's disabled state. A disabled element will not be included during form submission.                          |
| **error-text**     | `string`                        | Sets the element's error text                                                                                               |
| **fixed-dropdown** | `boolean`                       | Sets the position strategy of the dropdown to fixed                                                                         |
| **helper-text**    | `string`                        | Sets the element's helper text                                                                                              |
| **icon**           | _Enum_:<br/>`[icon-name]`       | A decorative icon for the element. See the [Vivid Icon Gallery](/icons/icons-gallery/) for available icons and `icon-name`s |
| **label**          | `string`                        | Sets the element's label                                                                                                    |
| **multiple**       | `boolean`                       | Sets the element to allow multiple selections                                                                               |
| **open**           | `boolean`                       | Sets the element's menu to be open                                                                                          |
| **placeholder**    | `string`                        | Sets the text to be displayed when no option is selected                                                                    |
| **scale**          | `normal` (default), `condensed` | Sets the display size of the input element                                                                                  |
| **shape**          | `rounded` (default), `pill`     | Sets the shape of the select element                                                                                        |
| **success-text**   | `string`                        | Sets the element's success text                                                                                             |

</div>

### Events

<div class="table-wrapper">

| Name       | Type                     | Bubbles | Composed | Description                                     |
| ---------- | ------------------------ | ------- | -------- | ----------------------------------------------- |
| **input**  | `CustomEvent<undefined>` | No      | Yes      | Fired when an option is selected or unselected. |
| **change** | `CustomEvent<undefined>` | No      | Yes      | Fired when an option is selected or unselected. |

</div>

### Slots

<div class="table-wrapper">

| Name            | Description                                                        |
| --------------- | ------------------------------------------------------------------ |
| **default**     | Default slot meant for Option component to provide the option list |
| **helper-text** | Add HTML content for helper text                                   |
| **icon**        | Add an icon to the component.                                      |
| **meta**        | Show meta information after the selected option label              |

</div>
