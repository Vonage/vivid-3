## Usage

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { registerRadio, registerRadioGroup } from '@vonage/vivid';

registerRadio('your-prefix');
registerRadioGroup('your-prefix');
```

```html preview
<script type="module">
	import { registerRadio, registerRadioGroup } from '@vonage/vivid';
	registerRadio('your-prefix');
	registerRadioGroup('your-prefix');
</script>

<your-prefix-radio-group>
	<your-prefix-radio label="1" value="1"></your-prefix-radio>
	<your-prefix-radio label="2" value="2"></your-prefix-radio>
	<your-prefix-radio label="3" value="3"></your-prefix-radio>
</your-prefix-radio-group>
```

</vwc-tab-panel>
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<template>
	<VRadioGroup label="Pick a number" name="number">
		<VRadio label="1" value="1" />
		<VRadio label="2" value="2" />
		<VRadio label="3" value="3" />
	</VRadioGroup>
</template>

<script setup lang="ts">
import { VRadioGroup, VRadio } from '@vonage/vivid-vue';
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Value

Use the `value` attribute to set the Radio's value.

```html preview
<vwc-radio value="my-value" label="one"></vwc-radio>
```

## Required

Use the `required` attribute to set define whether a response to the Radio Group must be provided in order to submit a form.

Below, the Radio Field is marked as `required` and is validated when the `form` is submitted.

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

## Slots

### Helper Text Slot

Use the `helper-text` slot on Radio Group to add rich text to provide additional context to the user.

```html preview
<vwc-radio-group label="What is the capital of Khazakstan?" name="khaz" orientation="vertical">
	<span slot="helper-text">
		Need some help?
		<a href="https://www.google.com/search?q=capital+of+kazakhstan&rlz=1C5CHFA_enGB1094GB1095&oq=capital+of+khaz">Try looking here</a>.
	</span>
	<vwc-radio label="Tashkent" value="tashkent"></vwc-radio>
	<vwc-radio label="Astana" value="astana"></vwc-radio>
	<vwc-radio label="Bishkek" value="bishkek"></vwc-radio>
</vwc-radio-group>
```

## Methods

### Check Validity

You can use the `checkValidity()` method on one of the Radio's to validate it.
Below, the Radio Group is `required` but it has no checked options. `checkValidity` was called which triggered the validation.

```html preview
<vwc-radio-group orientation="vertical" name="chosenValue" required label="Pick an option">
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

## API Reference

### Radio Group

#### Properties

<div class="table-wrapper">

| Name            | Type                               | Description                             |
| --------------- | ---------------------------------- | --------------------------------------- |
| **disabled**    | `boolean`                          | Whether the input element is disabled   |
| **error-text**  | `string`                           | Sets the error message and error state  |
| **helper-text** | `string`                           | Gives addition context to the user      |
| **label**       | `string`                           | Label of the the Radio Group            |
| **orientation** | `horizontal` (default), `vertical` | Sets axis on which the tabs are aligned |
| **readonly**    | `boolean`                          | The value is not editable               |
| **required**    | `boolean`                          | Sets the required state                 |

</div>

#### Slots

<div class="table-wrapper">

| Name            | Description                                               |
| --------------- | --------------------------------------------------------- |
| **default**     | For Radio components to provide options                   |
| **helper-text** | To add rich text to provide addition context for the user |

</div>

#### Events

<div class="table-wrapper">

| Name       | Type                     | Bubbles | Composed | Description                                          |
| ---------- | ------------------------ | ------- | -------- | ---------------------------------------------------- |
| **change** | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'change' event when the value changes |

</div>

#### Methods

<div class="table-wrapper">

| Name              | Description                                                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **checkValidity** | Returns `true` if the element passes validity checks; otherwise, returns `false` and fires an `invalid` event at the element. |

</div>

### Radio

#### Properties

<div class="table-wrapper">

| Name            | Type                            | Description                                  |
| --------------- | ------------------------------- | -------------------------------------------- |
| **checked**     | `boolean`                       | Sets the radio to be checked                 |
| **connotation** | Enum: `accent` (default), `cta` | The connotation the radio-group should have. |
| **error-text**  | `string`                        | The error text for the form element.         |
| **helper-text** | `string`                        | The helper text for the form element.        |
| **disabled**    | `boolean`                       | Whether the radio-group is disabled          |
| **required**    | `boolean`                       | Whether the radio-group is required          |
| **label**       | `string`                        | Label of the the Radio                       |
| **value**       | `string`                        | Set the radio's value.                       |

</div>

#### Events

<div class="table-wrapper">

| Name       | Type                     | Bubbles | Composed | Description                                                |
| ---------- | ------------------------ | ------- | -------- | ---------------------------------------------------------- |
| **change** | `CustomEvent<undefined>` | Yes     | Yes      | Emits a custom change event when the checked state changes |

</div>
