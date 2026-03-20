## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
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
<vwc-tab label="Vue"></vwc-tab>
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

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSelectableBox } from '@vonage/vivid-vue';
</script>

<template>
	<VSelectableBox class="box"> Custom spaced box (8px) </VSelectableBox>
</template>

<style>
.box {
	--selectable-box-spacing: 8px;
	max-inline-size: 450px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-selectable-box class="box"> Custom spaced box (8px) </vwc-selectable-box>

<style>
	.box {
		--selectable-box-spacing: 8px;
		max-inline-size: 450px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

### Checked Background Color

Use the `--selectable-box-checked-bg` variable to override the default background color applied to the checked state of the Selectable Box.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSelectableBox } from '@vonage/vivid-vue';
</script>

<template>
	<VSelectableBox checked class="box">Selected background is now white</VSelectableBox>
</template>

<style>
.box {
	--selectable-box-checked-bg: #ffffff;
	max-inline-size: 450px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-selectable-box checked class="box">Selected background is now white</vwc-selectable-box>

<style>
	.box {
		--selectable-box-checked-bg: #ffffff;
		max-inline-size: 450px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>
