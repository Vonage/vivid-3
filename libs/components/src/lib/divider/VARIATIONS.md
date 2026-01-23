## Orientation

Use the `orientation` attribute to control the orientation of the Divider. See the [Use Cases](/components/divider/use-cases/).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDivider, VLayout } from '@vonage/vivid-vue';
</script>

<template>
	<VLayout column-basis="block">
		<VDivider orientation="horizontal"></VDivider>
		<VDivider orientation="vertical" class="vertical"></VDivider>
	</VLayout>
</template>

<style>
.vertical {
	block-size: 40px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview blocks
<vwc-divider orientation="horizontal"></vwc-divider>
<vwc-divider orientation="vertical" class="vertical"></vwc-divider>

<style>
	.vertical {
		block-size: 40px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Appearance

Use the `appearance` attribute to change the Divider's appearance.

- Type: `'ghost'` | `'subtle'`
- Default: `'ghost'`

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDivider, VLayout } from '@vonage/vivid-vue';
</script>

<template>
	<VLayout column-basis="block">
		<VDivider></VDivider>
		<VDivider appearance="subtle"></VDivider>
	</VLayout>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview blocks
<vwc-divider></vwc-divider> <vwc-divider appearance="subtle"></vwc-divider>
```

</vwc-tab-panel>
</vwc-tabs>
