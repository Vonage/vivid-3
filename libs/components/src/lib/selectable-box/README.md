## Usage

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { registerSelectableBox } from '@vonage/vivid';

registerSelectableBox('your-prefix');
```

```html preview
<script type="module">
	import { registerSelectableBox } from '@vonage/vivid';
	registerSelectableBox('your-prefix');
</script>

<your-prefix-selectable-box> Selectable Box </your-prefix-selectable-box>
```

</vwc-tab-panel>
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSelectableBox } from '@vonage/vivid-vue';
</script>

<template>
	<VSelectableBox> Selectable Box </VSelectableBox>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## CSS Variables

### Spacing

Use the `--selectable-box-spacing` variable to set the amount of spacing applied to the Selectable Box.

```html preview
<vwc-selectable-box class="box"> Custom spaced box (8px) </vwc-selectable-box>

<style>
	.box {
		--selectable-box-spacing: 8px;

		max-inline-size: 450px;
	}
</style>
```

### Checked Background Color

Use the `--selectable-box-checked-bg` variable to override the default background color applied to the checked state of the Selectable Box.

```html preview
<vwc-selectable-box checked class="box"
	>Selected background is now white</vwc-selectable-box
>

<style>
	.box {
		--selectable-box-checked-bg: #ffffff;

		max-inline-size: 450px;
	}
</style>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name                  | Type                                                                           | Description                                            |
| --------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------ |
| **checked**           | `boolean`                                                                      | Controls the checked state                             |
| **clickable-box**     | `boolean`                                                                      | Sets the whole box to be clickable                     |
| **connotation**       | `accent` (default), `cta`                                                      | Controls the color of the box and its control          |
| **control-type**      | `checkbox` (default), `radio`                                                  | Controls the type of control in the box                |
| **control-placement** | _Enum_:<br/>`end-stacked` (default),<br/>`end`<br/>`start`<br/>`start-stacked` | Controls where the control should be placed in the box |
| **tight**             | `boolean`                                                                      | Removes the padding from the boxes content area        |

</div>

### Slots

<div class="table-wrapper">

| Name        | Description                         |
| ----------- | ----------------------------------- |
| **default** | Content area for the Selectable Box |

</div>

### Events

<div class="table-wrapper">

| Name       | Type                     | Bubbles | Composed | Description                          |
| ---------- | ------------------------ | ------- | -------- | ------------------------------------ |
| **change** | `CustomEvent<undefined>` | Yes     | Yes      | Fired when the checked state changes |

</div>
