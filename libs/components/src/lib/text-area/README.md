## Usage

All native attributes of the `textarea` are supported as well as some enhancements.

<vwc-tabs>
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { registerTextArea } from '@vonage/vivid';

registerTextArea('your-prefix');
```

```html preview
<script type="module">
	import { registerTextArea } from '@vonage/vivid';
	registerTextArea('your-prefix');
</script>

<your-prefix-text-area
	label="Description"
	value="This is the text we want to see!"
></your-prefix-text-area>
```

</vwc-tab-panel>
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTextArea } from '@vonage/vivid-vue';
</script>

<template>
	<VTextArea label="Your comment" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Resize

Set the `resize` attribute to control how the text area can be resized by the user.

```html preview 300px
<div class="wrapper">
	<vwc-select label="Resize Options" id="vwc-select">
		<vwc-option value="none" text="none (default)"></vwc-option>
		<vwc-option value="vertical" text="vertical"></vwc-option>
		<vwc-option value="horizontal" text="horizontal"></vwc-option>
		<vwc-option value="both" text="both"></vwc-option>
	</vwc-select>
	<vwc-text-area
		value="default"
		id="vwc-text-area"
		label="text-area"
	></vwc-text-area>
</div>

<script>
	document.querySelector('vwc-select').addEventListener('change', (e) => {
		document.querySelector('#vwc-text-area').value = e.currentTarget.value;
		document.querySelector('#vwc-text-area').resize = e.currentTarget.value;
	});
</script>
<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		row-gap: 16px;
		inline-size: 240px;
	}
</style>
```

## Slots

### Helper Text Slot

The `helper-text` slot allows you to use rich content as the Text Area's helper text.

```html preview
<vwc-text-area label="Description">
	<span slot="helper-text"
		>Please ensure you provide the <a href="#">required details</a>.</span
	>
</vwc-text-area>
```

### Contextual-Help

The `contextual-help` slot allows you to add the [Contextual Help](/components/contextual-help/) component next to the label.

```html preview
<vwc-text-area label="Your comments">
	<vwc-contextual-help slot="contextual-help"
		>This is the contextual help</vwc-contextual-help
	>
</vwc-text-area>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name             | Type                                               | Description                                                                                                  |
| ---------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **autofocus**    | `boolean`                                          | Indicates that an element should be focused on page load, or when the Dialog that it is part of is displayed |
| **char-count**   | `boolean`                                          | Use in combination with `maxlength` to display a character count                                             |
| **disabled**     | `boolean`                                          | Whether the input element is disabled                                                                        |
| **error-text**   | `string`                                           | The error text for the form element.                                                                         |
| **helper-text**  | `string`                                           | The helper text for the form element.                                                                        |
| **label**        | `string`                                           | Label of the Text Field                                                                                      |
| **maxlength**    | `string`                                           | Maximum length (number of characters) of `value`                                                             |
| **minlength**    | `string`                                           | Minimum length (number of characters) of `value`                                                             |
| **placeholder**  | `string`                                           | Text that appears in the input element when it has no value set                                              |
| **readonly**     | `boolean`                                          | The `value` is not editable                                                                                  |
| **resize**       | `none` (default), `vertical`, `horizontal`, `both` | Sets the resize options of the element.                                                                      |
| **required**     | `boolean`                                          | A value is required for the form to be submittable                                                           |
| **row**          | `number`                                           | Size (in row) of the input element                                                                           |
| **success-text** | `string`                                           | The success text for the form element.                                                                       |
| **value**        | `string`                                           | The value of the input element. When specified in the HTML, corresponds to the initial value                 |

</div>

### Slots

<div class="table-wrapper">

| Name                | Description                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **helper-text**     | Sets the input element's appearance                                                                                |
| **contextual-help** | Allows you to add the [Contextual Help](/components/contextual-help/) component to be displayed next to the label. |

</div>

### Events

<div class="table-wrapper">

| Name       | Type                     | Bubbles | Composed | Description                                                          |
| ---------- | ------------------------ | ------- | -------- | -------------------------------------------------------------------- |
| **change** | `CustomEvent<undefined>` | Yes     | Yes      | Emits a custom 'change' event when the textarea emits a change event |

</div>
