## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/text-field';
```

or, if you need to use a unique prefix:

```js
import { registerTextField } from '@vonage/vivid';

registerTextField('your-prefix');
```

```html preview
<script type="module">
	import { registerTextField } from '@vonage/vivid';
	registerTextField('your-prefix');
</script>

<your-prefix-text-field label="First name" autofocus></your-prefix-text-field>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VTextField } from '@vonage/vivid-vue';
</script>

<template>
	<VTextField label="First name" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Types

While Text Field follows [the W3C specifictation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input), it only supports the following types:

`text` (default), `email`, `password`, `search`, `tel`, `url`

We support the following other types with the following components:

- `button`: [Button](/components/button/)
- `checkbox`: [Checkbox](/components/checkbox/)
- `date`: [Date Picker](/components/date-picker/) | [Date Range Picker](/components/date-range-picker/)
- `file`: [File Picker](/components/field-picker/)
- `number`: [Number Field](/components/number-field/)
- `range`: [Slider](/components/slider/) | [Range Slider](/components/range-slider/)
- `time`: [Time Picker](/components/time-picker/)

### Input modes

Along with picking the correct `type` for the Text Field's purpose, it's also good for user experience to pick the correct `inputmode`.

The `inputmode` attribute hints at the type of data that might be entered by the user. This allows a browser to display an appropriate virtual keyboard.

```html preview
<div>
	<vwc-text-field
		type="tel"
		inputmode="tel"
		label="Telephone number"
	></vwc-text-field>
	<vwc-text-field
		type="email"
		inputmode="email"
		label="Email address"
	></vwc-text-field>
</div>

<style>
	div {
		display: flex;
		gap: 16px;
	}
</style>
```

## Slots

### Action Items Slot

Use the `action-items` slot to postfix elements to the Text Field input element.<br />
In the example below Buttons are added to implement a custom funcationality for a search field.

```html preview
<vwc-text-field icon="search" type="search" inputmode="search" label="Search">
	<div slot="action-items" class="action-items">
		<vwc-button
			size="condensed"
			icon="microphone-2-line"
			aria-label="Record search query"
		></vwc-button>
		<vwc-button
			size="condensed"
			icon="close-line"
			aria-label="Clear field"
		></vwc-button>
	</div>
</vwc-text-field>

<style>
	.action-items {
		display: flex;
	}
</style>
```

### Leading Action Items Slot

Use the `leading-action-items` slot to prefix elements to the Text Field input element.<br />
In the example below a Select is added to implement a category filtered search field.

```html preview 220px
<vwc-text-field label="Search groceries" type="search" inputmode="search">
	<div slot="leading-action-items" class="leading-action-items">
		<vwc-select aria-label="Options Selector" appearance="ghost">
			<vwc-option value="all" text="All" selected></vwc-option>
			<vwc-option value="fruit" text="Fruit"></vwc-option>
			<vwc-option value="veg" text="Vegetables"></vwc-option>
		</vwc-select>
		<vwc-divider orientation="vertical"></vwc-divider>
	</div>
</vwc-text-field>

<style>
	.leading-action-items {
		display: flex;
		align-items: center;
		column-gap: 2px;
	}
	vwc-select {
		--focus-inset: 2px;
	}
	vwc-divider {
		height: 20px;
	}
</style>
```

### Helper Text Slot

The `helper-text` slot allows you to use rich content as the text-field's helper text.

```html preview
<vwc-text-field
	label="EIN"
	maxlength="12"
	char-count
	pattern="[0-9]*"
	inputmode="numeric"
>
	<span slot="helper-text">
		<a href="#">Employer Identification Number</a> should be 12 characters
	</span>
</vwc-text-field>

<style>
	vwc-text-field {
		width: 400px;
	}
</style>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name             | Type                                                                       | Description                                                                                                  |
| ---------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **appearance**   | `fieldset` (default), `ghost`                                              | Sets the input element's appearance                                                                          |
| **autocomplete** | `off`, `on`, `<token-list>`                                                | Hint for form autofill feature                                                                               |
| **autofocus**    | `boolean`                                                                  | Indicates that an element should be focused on page load, or when the Dialog that it is part of is displayed |
| **char-count**   | `boolean`                                                                  | Use in combination with `maxlength` to display a character count                                             |
| **disabled**     | `boolean`                                                                  | Whether the input element is disabled                                                                        |
| **error-text**   | `string`                                                                   | The error text for the form element.                                                                         |
| **helper-text**  | `string`                                                                   | The helper text for the form element.                                                                        |
| **inputmode**    | enum: `none`, `text`, `decimal` `numeric`, `tel`, `search`, `email`, `url` | Allows a browser to display an appropriate virtual keyboard                                                  |
| **label**        | `string`                                                                   | Label of the Text Field                                                                                      |
| **list**         | `string`                                                                   | Value of the id attribute of the `<datalist>` of autocomplete options                                        |
| **maxlength**    | `string`                                                                   | Maximum length (number of characters) of `value`                                                             |
| **minlength**    | `string`                                                                   | Minimum length (number of characters) of `value`                                                             |
| **pattern**      | `string`                                                                   | Pattern the `value` must match to be valid                                                                   |
| **placeholder**  | `string`                                                                   | Text that appears in the input element when it has no value set                                              |
| **readonly**     | `boolean`                                                                  | The `value` is not editable                                                                                  |
| **required**     | `boolean`                                                                  | A value is required for the form to be submittable                                                           |
| **size**         | `string`                                                                   | Size (in chars) of the input element                                                                         |
| **scale**        | `normal` (default), `condensed`                                            | Sets the display size of the input element                                                                   |
| **shape**        | `rounded`, `pill`                                                          | Sets the shape of the input element                                                                          |
| **success-text** | `string`                                                                   | The success text for the form element.                                                                       |
| **type**         | enum: `text`, `email`, `password`, `search`, `tel`, `url`                  | Type of input element                                                                                        |
| **value**        | `string`                                                                   | The value of the input element. When specified in the HTML, corresponds to the initial value                 |

</div>

### Slots

<div class="table-wrapper">

| Name                     | Description                                           |
| ------------------------ | ----------------------------------------------------- |
| **action-items**         | Add postfix elements to the Text Field input element. |
| **helper-text**          | Sets the input element's appearance                   |
| **leading-action-items** | Add rich content as the text-field's helper text      |

</div>

### Events

<div class="table-wrapper">

| Name       | Type                     | Bubbles | Composed | Description                                                                                   |
| ---------- | ------------------------ | ------- | -------- | --------------------------------------------------------------------------------------------- |
| **blur**   | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'blur' event the input loses focus                                             |
| **change** | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'change' event when the `value` has changed and focus leaves the input element |
| **focus**  | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'focus' event when the input gains focus                                       |
| **input**  | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'input' event immediately when the `value` has changed                         |

</div>

### Methods

<div class="table-wrapper">

| Name               | Description                                                                                                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **checkValidity**  | Returns `true` if the element's `value` passes validity checks; otherwise, returns `false` and fires an `invalid` event at the element.                                                                 |
| **reportValidity** | Returns `true` if the element's `value` passes validity checks; otherwise, returns `false`, fires an `invalid` event at the element, and (if the event isn't canceled) reports the problem to the user. |
| **select**         | Selects all the text in the text field                                                                                                                                                                  |

</div>
