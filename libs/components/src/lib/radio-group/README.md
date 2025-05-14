## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/radio';
import '@vonage/vivid/radio-group';
```

or, if you need to use a unique prefix:

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
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VRadio, VRadioGroup } from '@vonage/vivid-vue';
</script>
<template>
	<VRadioGroup>
		<VRadio label="1" value="1"></VRadio>
	</VRadioGroup>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Value

Use the `value` attribute to set the Radio's value.

```html preview
<vwc-radio value="my-value" label="one"></vwc-radio>
```

## Slots

### Helper Text Slot

Use the `helper-text` slot on Radio Group to add rich text to provide additional context to the user.

```html preview
<vwc-radio-group
	label="What is the capital of Khazakstan?"
	name="khaz"
	orientation="vertical"
>
	<span slot="helper-text">
		Need some help?
		<a
			href="https://www.google.com/search?q=capital+of+kazakhstan&rlz=1C5CHFA_enGB1094GB1095&oq=capital+of+khaz"
			>Try looking here</a
		>.
	</span>
	<vwc-radio label="Tashkent" value="tashkent"></vwc-radio>
	<vwc-radio label="Astana" value="astana"></vwc-radio>
	<vwc-radio label="Bishkek" value="bishkek"></vwc-radio>
</vwc-radio-group>
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
