<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 365px
<script setup lang="ts">
import { VButton, VNumberField } from '@vonage/vivid-vue';
</script>

<template>
	<h3 class="tight">VBC for Microsoft Teams</h3>
	<div class="wrapper">
		<VNumberField class="number-field" label="Currently in use" :value="1" />
		<VButton appearance="filled" label="Add Licence" />
	</div>
</template>

<style>
.wrapper {
	display: flex;
	align-items: flex-end;
	gap: 8px;
	margin-block-start: 16px;
}
.number-field {
	inline-size: 120px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 365px
<h3 class="tight">VBC for Microsoft Teams</h3>
<div class="wrapper">
	<vwc-number-field class="number-field" label="Currently in use" value="1"></vwc-number-field>
	<vwc-button appearance="filled" label="Add Licence"></vwc-button>
</div>

<style>
	.wrapper {
		display: flex;
		align-items: flex-end;
		gap: 8px;
		margin-block-start: 16px;
	}
	.number-field {
		inline-size: 120px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>
