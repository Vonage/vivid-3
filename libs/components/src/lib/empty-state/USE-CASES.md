## Empty State inside Searchable Select

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 300px
<script setup lang="ts">
import { VEmptyState, VSearchableSelect } from '@vonage/vivid-vue';
</script>

<template>
	<VSearchableSelect label="Connect number">
		<VEmptyState slot="no-options" icon-decoration="outlined" icon="phone-number-line" headline="No numbers"> You do not have any numbers yet. </VEmptyState>
	</VSearchableSelect>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 300px
<vwc-searchable-select label="Connect number">
	<vwc-empty-state slot="no-options" icon-decoration="outlined" icon="phone-number-line" headline="No numbers"> You do not have any numbers yet. </vwc-empty-state>
</vwc-searchable-select>
```

</vwc-tab-panel>
</vwc-tabs>

## Empty State inside Dialog

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 450px
<script setup lang="ts">
import { VDialog, VEmptyState, VButton } from '@vonage/vivid-vue';
</script>

<template>
	<VDialog open>
		<VEmptyState slot="body" class="empty-state" icon-decoration="outlined" icon="check-solid" connotation="success" headline="You made it!">
			Your request was submitted. Waht do you wish to do now?
			<VButton slot="action-items" appearance="outlined" label="continue" />
			<VButton slot="action-items" appearance="filled" connotation="cta" label="Read More" />
		</VEmptyState>
	</VDialog>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 450px
<vwc-dialog open>
	<vwc-empty-state slot="body" class="empty-state" icon-decoration="outlined" icon="check-solid" connotation="success" headline="You made it!">
		Your request was submitted. Waht do you wish to do now?
		<vwc-button slot="action-items" appearance="outlined" label="continue"></vwc-button>
		<vwc-button slot="action-items" appearance="filled" connotation="cta" label="Read More"></vwc-button>
	</vwc-empty-state>
</vwc-dialog>
```

</vwc-tab-panel>
</vwc-tabs>

## Empty State & Data Grid

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 450px
<script setup lang="ts">
import { VDataGrid, VDataGridRow, VDataGridCell, VEmptyState } from '@vonage/vivid-vue';
</script>

<template>
	<VDataGrid>
		<VDataGridRow role="row" class="header" row-type="header">
			<VDataGridCell cell-type="columnheader" role="columnheader"> data1 </VDataGridCell>
			<VDataGridCell cell-type="columnheader"> data2 </VDataGridCell>
		</VDataGridRow>
	</VDataGrid>
	<VEmptyState class="empty-state" icon-decoration="outlined" icon="search-line" headline="No Data"> There's no data here yet </VEmptyState>
</template>

<style scoped>
.empty-state {
	margin-block-start: 32px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 450px
<vwc-data-grid>
	<vwc-data-grid-row role="row" class="header" row-type="header">
		<vwc-data-grid-cell cell-type="columnheader" role="columnheader"> data1 </vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader"> data2 </vwc-data-grid-cell>
	</vwc-data-grid-row>
</vwc-data-grid>
<vwc-empty-state class="empty-state" icon-decoration="outlined" icon="search-line" headline="No Data"> There's no data here yet </vwc-empty-state>

<style>
	.empty-state {
		margin-block-start: 32px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>
