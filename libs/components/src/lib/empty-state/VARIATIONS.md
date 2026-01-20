## Headline

Use the `headline` attribute add a headline to the empty state.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VEmptyState } from '@vonage/vivid-vue';
</script>

<template>
	<VEmptyState headline="No results found"></VEmptyState>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-empty-state headline="No results found"></vwc-empty-state>
```

</vwc-tab-panel>
</vwc-tabs>

## Icon

The `icon` attribute displays an icon from the [icon library](/icons/icons-gallery/), which can be displayed as a decoration to the Empty State.  
Custom icons can be provided using the [Graphic Slot](/components/empty-state/code/#graphic-slot).

<!-- Uncomment when Icon slot is added
<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>
-->

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VEmptyState } from '@vonage/vivid-vue';
</script>

<template>
	<VEmptyState icon="search-line"></VEmptyState>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-empty-state icon="search-line"></vwc-empty-state>
```

</vwc-tab-panel>
</vwc-tabs>

## Connotation

Set the `connotation` attribute to change the Empty State's connotation.

<vwc-note connotation="warning" headline="Deprecated Prop: icon-decoration">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon-decoration` prop is deprecated (as of 05/25) with the previous `outline` style now becoming the default and only icon styling. `icon-decoration` will be removed from the API in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 300px
<script setup lang="ts">
import { VEmptyState } from '@vonage/vivid-vue';
</script>

<template>
	<div class="wrapper">
		<VEmptyState icon="search-line" headline="Accent connotation"> No results </VEmptyState>
		<VEmptyState icon="check-solid" headline="Success connotation" connotation="success"> No results </VEmptyState>
		<VEmptyState icon="error-solid" headline="Alert connotation" connotation="alert"> No results </VEmptyState>
		<VEmptyState icon="sparkles-solid" headline="Cta connotation" connotation="cta"> No results </VEmptyState>
		<VEmptyState icon="envelope-solid" headline="Information connotation" connotation="information"> No results </VEmptyState>
		<VEmptyState icon="warning-solid" headline="Warning connotation" connotation="warning"> No results </VEmptyState>
	</div>
</template>

<style>
.wrapper {
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 8px;
	align-items: flex-start;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 300px
<div class="wrapper">
	<vwc-empty-state icon="search-line" headline="Accent connotation"> No results </vwc-empty-state>
	<vwc-empty-state icon="check-solid" headline="Success connotation" connotation="success"> No results </vwc-empty-state>
	<vwc-empty-state icon="error-solid" headline="Alert connotation" connotation="alert"> No results </vwc-empty-state>
	<vwc-empty-state icon="sparkles-solid" headline="Cta connotation" connotation="cta"> No results </vwc-empty-state>
	<vwc-empty-state icon="envelope-solid" headline="Information connotation" connotation="information"> No results </vwc-empty-state>
	<vwc-empty-state icon="warning-solid" headline="Warning connotation" connotation="warning"> No results </vwc-empty-state>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 8px;
		align-items: flex-start;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>
