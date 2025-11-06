## Usage

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/simple-color-picker';
```

or, if you need to use a unique prefix:

```js
import { registerSimpleColorPicker' } from '@vonage/vivid';

registerSimpleColorPicker('your-prefix');
```

```html preview 120px
<script type="module">
	import { registerSimpleColorPicker, registerButton, registerIcon } from 'vivid-bundle';
	registerSimpleColorPicker('your-prefix');
	registerButton('your-prefix');
	registerIcon('your-prefix');
</script>

<your-prefix-simple-color-picker id="picker">
	<your-prefix-button id="button" aria-label="Pick color" slot="anchor" size="super-condensed" shape="pill" appearance="outlined">
		<your-prefix-icon id="icon" slot="icon" name="textcolor-solid"></your-prefix-icon>
	</your-prefix-button>
</your-prefix-simple-color-picker>

<script>
	const swatches = [
		{
			label: 'Black',
			value: '#000000',
		},
		{
			label: 'Red',
			value: '#E61D1D',
		},
		{
			label: 'Yellow',
			value: '#FA9F00',
		},
		{
			label: 'Green',
			value: '#1C8731',
		},
		{
			label: 'Blue',
			value: '#0276D5',
		},
		{
			label: 'Purple',
			value: '#9941FF',
		},
		{
			label: 'Pink',
			value: '#D6219C',
		},
	];
	const picker = document.getElementById('picker');
	const button = document.getElementById('button');
	const buttonIcon = document.getElementById('icon');
	picker.swatches = swatches;

	picker.addEventListener('change', (e) => {
		const selectedColor = e.target.value;
		buttonIcon.setAttribute('style', `color: ${selectedColor}; `);
		selectedColor ? button.setAttribute('aria-label', `Pick color, ${selectedColor} selected.`) : button.setAttribute('aria-label', 'Pick color');
	});
</script>
```

</vwc-tab-panel>
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview 120px
<script setup lang="ts">
import { VSimpleColorPicker, VButton, VIcon } from '@vonage/vivid-vue';
import { ref } from 'vue';

const swatches = [
	{
		label: 'Black',
		value: '#000000',
	},
	{
		label: 'Red',
		value: '#E61D1D',
	},
	{
		label: 'Yellow',
		value: '#FA9F00',
	},
	{
		label: 'Green',
		value: '#1C8731',
	},
	{
		label: 'Blue',
		value: '#0276D5',
	},
	{
		label: 'Purple',
		value: '#9941FF',
	},
	{
		label: 'Pink',
		value: '#D6219C',
	},
];

const selectedColor = ref('#000000');
const buttonLabel = ref('Pick color');

const handleColorChange = (event: CustomEvent) => {
	selectedColor.value = event.target.value;
	buttonLabel.value = event.target.value ? `Pick color, ${event.target.value} selected.` : 'Pick color';
};
</script>

<template>
	<VSimpleColorPicker :swatches="swatches" @change="handleColorChange">
		<VButton :aria-label="buttonLabel" slot="anchor" size="super-condensed" shape="pill" appearance="outlined">
			<VIcon slot="icon" name="textcolor-solid" :style="{ color: selectedColor }" />
		</VButton>
	</VSimpleColorPicker>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Open

Use the `open` attribute to indicate whether the Simple Color Picker's popup should be open.

- Type: `boolean`
- Default: `false`

```html preview 120px
<vwc-simple-color-picker open id="picker">
	<vwc-button id="button" aria-label="Pick color" slot="anchor" size="super-condensed" shape="pill" appearance="outlined">
		<vwc-icon id="icon" slot="icon" name="textcolor-solid"></vwc-icon>
	</vwc-button>
</vwc-simple-color-picker>

<script>
	const swatches = [
		{
			label: 'Black',
			value: '#000000',
		},
		{
			label: 'Red',
			value: '#E61D1D',
		},
		{
			label: 'Yellow',
			value: '#FA9F00',
		},
		{
			label: 'Green',
			value: '#1C8731',
		},
		{
			label: 'Blue',
			value: '#0276D5',
		},
		{
			label: 'Purple',
			value: '#9941FF',
		},
		{
			label: 'Pink',
			value: '#D6219C',
		},
	];
	const picker = document.getElementById('picker');
	const button = document.getElementById('button');
	const buttonIcon = document.getElementById('icon');
	picker.swatches = swatches;

	picker.addEventListener('change', (e) => {
		const selectedColor = e.target.value;
		buttonIcon.setAttribute('style', `color: ${selectedColor}; `);
		selectedColor ? button.setAttribute('aria-label', `Pick color, ${selectedColor} selected.`) : button.setAttribute('aria-label', 'Pick color');
	});
</script>
```

## Anchor

<vwc-note connotation="information" headline="Prefer using the anchot slot">
	<vwc-icon slot="icon" name="info-solid" label="Note:"></vwc-icon>

It is recommended use the [`anchor` slot](/code#anchor-slot) to set the anchor.

</vwc-note>

The `anchor` attribute should be set to the `id` value of the anchor element or pass the anchor element itself.

<vwc-note connotation="warning">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

**Pay attention to the source order** the components to ensure they can be operated logically using only a keyboard.

</vwc-note>

```html preview 130px
<vwc-simple-color-picker anchor="button" swatches-per-row="6" id="picker"></vwc-simple-color-picker>

<vwc-button id="button" label="Toggle Color Picker" size="normal" shape="rounded" appearance="filled">
	<vwc-icon slot="icon" name="palette-solid"></vwc-icon>
</vwc-button>

<script>
	const swatches = [
		{
			label: 'Red',
			value: '#E61D1D',
		},
		{
			label: 'Yellow',
			value: '#FA9F00',
		},
		{
			label: 'Green',
			value: '#1C8731',
		},
		{
			label: 'Blue',
			value: '#0276D5',
		},
		{
			label: 'Black',
			value: '#000000',
		},
		{
			label: 'Light Grey',
			value: '#CCCCCC',
		},
	];
	const picker = document.getElementById('picker');
	picker.swatches = swatches;
</script>
```

## Slots

### Anchor Slot

Simple Color Picker needs to be anchored to an element. Place the anchor element inside the `anchor` slot of the Simple Color Picker. It is recommended to use the [Button](/components/button/) component as the anchor element.

```html preview 130px
<vwc-simple-color-picker id="picker" swatches-per-row="6">
	<vwc-button slot="anchor" label="Toggle Color Picker" size="normal" shape="rounded" appearance="filled">
		<vwc-icon slot="icon" name="palette-solid"></vwc-icon>
	</vwc-button>
</vwc-simple-color-picker>

<script>
	const swatches = [
		{
			label: 'Red',
			value: '#E61D1D',
		},
		{
			label: 'Yellow',
			value: '#FA9F00',
		},
		{
			label: 'Green',
			value: '#1C8731',
		},
		{
			label: 'Blue',
			value: '#0276D5',
		},
		{
			label: 'Black',
			value: '#000000',
		},
		{
			label: 'Light Grey',
			value: '#CCCCCC',
		},
	];
	const picker = document.getElementById('picker');
	picker.swatches = swatches;
</script>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name                 | Type                                                                                                                                         | Description                                                                                           |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **anchor**           | `string` or `HTMLElement`                                                                                                                    | ID of, or HTML element itself, to anchor the Color Picker's popup to. Prefer using the `anchor` slot. |
| **open**             | `boolean`                                                                                                                                    | Sets the open state of the Color Picker's popup                                                       |
| **placement**        | `top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`, `right`, `right-start`, `right-end` | Preferred placement of the Color Picker's popup in relation to the anchor element                     |
| **swatches**         | `{label?: string; value: string;}[]`                                                                                                         | Sets a color palette from which users can select colors                                               |
| **swatches-per-row** | `number`                                                                                                                                     | Sets the number of swatches to be displayed per row in the color palette grid                         |
| **value**            | `string`                                                                                                                                     | The value of the element. When specified in the HTML, corresponds to the initial value                |

</div>

### Slots

<div class="table-wrapper">

| Name       | Description             |
| ---------- | ----------------------- |
| **anchor** | For the anchor element. |

</div>

### Events

<div class="table-wrapper">

| Name       | Type                     | Bubbles | Composed | Description                                                              |
| ---------- | ------------------------ | ------- | -------- | ------------------------------------------------------------------------ |
| **change** | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'change' event when the `value` of an element has changed |
| **input**  | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'input' event immediately when the `value` has changed    |

</div>
