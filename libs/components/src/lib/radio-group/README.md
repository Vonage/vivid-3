## Usage

<vwc-tabs>
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

### Value

Use the `value` attribute to set the radio's value.

```html preview
<vwc-radio value="my-value" label="one"></vwc-radio>
```

## API Reference

### Radio Group

#### Properties

<div class="table-wrapper">

| Name          | Type                               | Description                             |
| ------------- | ---------------------------------- | --------------------------------------- |
| `disabled`    | `boolean`                          | Whether the input element is disabled   |
| `label`       | `string`                           | Label of the the Radio Group            |
| `orientation` | `horizontal` (default), `vertical` | Sets axis on which the tabs are aligned |
| `readonly`    | `boolean`                          | The value is not editable               |

</div>

#### Events

<div class="table-wrapper">

| Name     | Type                     | Bubbles | Composed | Description                                          |
| -------- | ------------------------ | ------- | -------- | ---------------------------------------------------- |
| `change` | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'change' event when the value changes |

</div>

### Radio

#### Properties

<div class="table-wrapper">

| Name          | Type                            | Description                           |
| ------------- | ------------------------------- | ------------------------------------- |
| `checked`     | `boolean`                       | Sets the radio to be checked          |
| `connotation` | Enum: `accent` (default), `cta` | Whether the input element is disabled |
| `disabled`    | `boolean`                       | Whether the input element is disabled |
| `label`       | `string`                        | Label of the the Radio                |
| `value`       | `string`                        | Set the radio's value.                |

</div>

#### Events

<div class="table-wrapper">

| Name     | Type                     | Bubbles | Composed | Description                                                |
| -------- | ------------------------ | ------- | -------- | ---------------------------------------------------------- |
| `change` | `CustomEvent<undefined>` | Yes     | Yes      | Emits a custom change event when the checked state changes |

</div>
