## With border

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VPagination } from '@vonage/vivid-vue';
</script>

<template>
	<VPagination class="outlined" :total="10" shape="pill" />
</template>

<style>
.outlined {
	border: 1px solid var(--vvd-color-neutral-400);
	padding: 6px;
	border-radius: 24px;
	display: inline-block;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-pagination class="outlined" total="10" shape="pill"></vwc-pagination>

<style>
	.outlined {
		border: 1px solid var(--vvd-color-neutral-400);
		padding: 6px;
		border-radius: 24px;
		display: inline-block;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>
