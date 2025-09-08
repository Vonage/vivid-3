## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/simple-color-picker';
```

or, if you need to use a unique prefix:

```js
import { registerSimpleColorPicker' } from '@vonage/vivid';

registerSimpleColorPicker('your-prefix');
```

```html preview
<script type="module">
	import { registerSimpleColorPicker } from '@vonage/vivid';
	registerSimpleColorPicker('your-prefix');
</script>

<your-prefix-simple-color-picker></your-prefix-simple-color-picker>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VSimpleColorPicker } from '@vonage/vivid-vue';
</script>

<template>
	<VSimpleColorPicker>Simple Color Picker</VSimpleColorPicker>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Open

Use the `open` attribute to indicate whether the Simple Color Picker's popup should be open.

- Type: `boolean`
- Default: `false`

```html preview 120px
<vwc-simple-color-picker
	open
	swatches="['#000000','#E61D1D','#FA9F00','#1C8731','#0276D5','#9941FF','#D6219C']"
>
	<vwc-button
		aria-label="Pick color"
		slot="anchor"
		size="super-condensed"
		shape="pill"
		appearance="outlined"
	>
		<vwc-icon id="icon" slot="icon" name="textcolor-solid"></vwc-icon>
	</vwc-button>
</vwc-simple-color-picker>
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
<vwc-simple-color-picker
	anchor="button"
	swatches="['#E61D1D', '#FA9F00', '#1C8731', '#0276D5', '#000000', '#CCCCCC']"
	swatches-per-row="6"
>
</vwc-simple-color-picker>

<vwc-button
	id="button"
	label="Toggle Color Picker"
	size="normal"
	shape="rounded"
	appearance="filled"
>
	<vwc-icon slot="icon" name="palette-solid"></vwc-icon>
</vwc-button>
```

## Slots

### Anchor Slot

Simple Color Picker needs to be anchored to an element. Place the anchor element inside the `anchor` slot of the Simple Color Picker. It is recommended to use the [Button](/components/button/) component as the anchor element.

```html preview 130px
<vwc-simple-color-picker
	swatches="['#E61D1D', '#FA9F00', '#1C8731', '#0276D5', '#000000', '#CCCCCC']"
	swatches-per-row="6"
>
	<vwc-button
		slot="anchor"
		label="Toggle Color Picker"
		size="normal"
		shape="rounded"
		appearance="filled"
	>
		<vwc-icon slot="icon" name="palette-solid"></vwc-icon>
	</vwc-button>
</vwc-simple-color-picker>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name                 | Type                                                                                                                                         | Description                                                                                           |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **anchor**           | `string` or `HTMLElement`                                                                                                                    | ID of, or HTML element itself, to anchor the Color Picker's popup to. Prefer using the `anchor` slot. |
| **open**             | `boolean`                                                                                                                                    | Sets the open state of the Color Picker's popup                                                       |
| **placement**        | `top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`, `right`, `right-start`, `right-end` | Preferred placement of the Color Picker's popup in relation to the anchor element                     |
| **swatches**         | `string[]` or `{label?: string; value: string;}[]`                                                                                           | Sets a color palette from which users can select colors                                               |
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
