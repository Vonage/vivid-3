## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/color-picker';
```

or, if you need to use a unique prefix:

```js
import { registerColorPicker' } from '@vonage/vivid';

registerColorPicker('your-prefix');
```

```html preview 480px
<script type="module">
	import { registerColorPicker } from '@vonage/vivid';
	registerColorPicker('your-prefix');
</script>

<your-prefix-color-picker label="Primary color"></your-prefix-color-picker>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VColorPicker } from '@vonage/vivid-vue';
</script>

<template>
	<VColorPicker label="Primary color">Color Picker</VColorPicker>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Open

Use the `open` attribute to indicate whether the Simple Color Picker's popup should be open.

- Type: `boolean`
- Default: `false`

```html preview 480px
<vwc-color-picker
	label="Primary color"
	saved-colors-key="vvd-color-picker-open"
	open
></vwc-color-picker>
```

## Saved Colors

### Saved Colors Key

Saved colors are stored in the browser’s `localStorage` by default, using a key generated from the component’s tag name.

To ensure persistence and uniqueness, it’s good practice to specify a custom key using the `saved-colors-key` attribute.

```html preview 480px
<vwc-color-picker
	label="Primary color"
	saved-colors-key="vvd-color-picker-unique-key"
></vwc-color-picker>
```

### Disable Saved Colors

You can use the `disabled-saved-colors` attribute to disable saving colors by the users.

- Type: `boolean`
- Default: `false`

```html preview 480px
<vwc-color-picker label="Primary color" disable-saved-colors></vwc-color-picker>
```

## Slots

### Contextual Help

The `contextual-help` slot allows you to add the [Contextual Help](/components/contextual-help/) component next to the label.

```html preview 480px
<vwc-color-picker
	label="Color Picker"
	saved-colors-key="vvd-color-picker-contextual-help"
>
	<vwc-contextual-help slot="contextual-help"
		>Choose your brand color</vwc-contextual-help
	>
</vwc-color-picker>
```

### Helper Text

The `helper-text` slot allows you to use rich content as the Color Picker's helper text.

```html preview 480px
<vwc-color-picker
	label="Primary color"
	saved-colors-key="vvd-color-picker-helper-text"
>
	<span slot="helper-text">Choose the Primary Color</span>
</vwc-color-picker>
```

### Popup Text

The `popup-text` slot allows you to override the default **"Color Picker"** title displayed in the Color Picker's popup.

```html preview 480px
<vwc-color-picker
	label="Primary color"
	saved-colors-key="vvd-color-picker-popup-text"
>
	<span slot="popup-text">Brand Color</span>
</vwc-color-picker>
```

### Swatches Text

The `swatches-text` slot allows you to override the default **"Saved Colors:"** text displayed above the color swatches.

```html preview 480px
<vwc-color-picker
	id="picker"
	label="Brand color"
	value="#D6219C"
	disable-saved-colors
>
	<span slot="swatches-text">Brand Colors:</span>
</vwc-color-picker>

<script>
	const swatches = [
		{
			label: 'Magenta',
			value: '#D6219C',
		},
		{
			label: 'Blue',
			value: '#80C7F5',
		},
		{
			label: 'Orange',
			value: '#FA7454',
		},
		{
			label: 'Peach',
			value: '#FCAC98',
		},
	];

	const picker = document.getElementById('picker');
	picker.swatches = swatches;
</script>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name                     | Type                                 | Description                                                                            |
| ------------------------ | ------------------------------------ | -------------------------------------------------------------------------------------- |
| **disabled**             | `boolean`                            | Whether the Color Picker's element is disabled                                         |
| **disable-saved-colors** | `boolean`                            | Disables the saving color swatches feature                                             |
| **error-text**           | `string`                             | The error text for the form element                                                    |
| **helper-text**          | `string`                             | The helper text for the form element                                                   |
| **label**                | `string`                             | Label of the Color Picker                                                              |
| **max-swatches**         | `number`                             | Limits number of swatches that can be saved                                            |
| **open**                 | `boolean`                            | Sets the open state of the Color Picker's popup                                        |
| **placeholder**          | `string`                             | Text that appears in the input element when it has no value set                        |
| **required**             | `boolean`                            | A value is required for the form to be submittable                                     |
| **saved-colors-key**     | `string`                             | Sets the localStorage key used to store saved colors explicitly                        |
| **success-text**         | `string`                             | The success text for the form element                                                  |
| **swatches**             | `{label?: string; value: string;}[]` | Sets a color palette from which users can select colors                                |
| **value**                | `string`                             | The value of the element. When specified in the HTML, corresponds to the initial value |

</div>

### Slots

<div class="table-wrapper">

| Name                | Description                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **contextual-help** | Allows you to add the [Contextual Help](/components/contextual-help/) component to be displayed next to the label. |
| **helper-text**     | Add rich content as the Color Picker's helper text.                                                                |
| **popup-text**      | Overrides the default "Color Picker" title of the Popup window.                                                    |
| **swatches-text**   | Overrides the default "Saved colors:" text above color swatches.                                                   |

</div>

### Events

<div class="table-wrapper">

| Name       | Event Type               | Description |     |                                                                                               |
| ---------- | ------------------------ | ----------- | --- | --------------------------------------------------------------------------------------------- |
| **blur**   | `CustomEvent<undefined>` | Yes         | Yes | Fires a custom 'blur' event the input loses focus                                             |
| **change** | `CustomEvent<undefined>` | Yes         | Yes | Fires a custom 'change' event when the `value` has changed and focus leaves the input element |
| **focus**  | `CustomEvent<undefined>` | Yes         | Yes | Fires a custom 'focus' event when the input gains focus                                       |
| **input**  | `CustomEvent<undefined>` | Yes         | Yes | Fires a custom 'input' event immediately when the `value` has changed                         |

</div>
