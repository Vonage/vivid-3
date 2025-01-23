## Usage

<vwc-tabs>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/select';
```

or, if you need to use a unique prefix:

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
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
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
<vwc-selectable-box
	style="--selectable-box-spacing: 8px; max-inline-size: 450px"
>
	Custom spaced box (8px)
</vwc-selectable-box>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name              | Type                          | Description                                     |
| ----------------- | ----------------------------- | ----------------------------------------------- |
| **checked**       | `boolean`                     | Controls the checked state                      |
| **clickable-box** | `boolean`                     | Sets the whole box to be clickable              |
| **connotation**   | `accent` (default), `cta`     | Controls the color of the box and its control   |
| **control-type**  | `checkbox` (default), `radio` | Controls the type of control in the box         |
| **tight**         | `boolean`                     | Removes the padding from the boxes content area |

</div>

### Slots

<div class="table-wrapper">

| Name        | Description                         |
| ----------- | ----------------------------------- |
| **default** | Content area for the Selectable Box |

</div>

### Events

<div class="table-wrapper">

| Name     | Type                     | Bubbles | Composed | Description                          |
| -------- | ------------------------ | ------- | -------- | ------------------------------------ |
| `change` | `CustomEvent<undefined>` | Yes     | Yes      | Fired when the checked state changes |

</div>
