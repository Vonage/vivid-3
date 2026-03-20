## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```js
import { VTable, VTableHead, VTableBody, VTableRow, VTableHeaderCell, VTableCell } from '@vonage/vivid-vue';
```

```vue preview
<template>
	<VTable>
		<VTableHead>
			<VTableRow>
				<VTableHeaderCell>Product</VTableHeaderCell>
				<VTableHeaderCell>Type</VTableHeaderCell>
				<VTableHeaderCell>Threshold</VTableHeaderCell>
			</VTableRow>
		</VTableHead>
		<VTableBody>
			<VTableRow>
				<VTableCell>SMS</VTableCell>
				<VTableCell>Volumetric Changes</VTableCell>
				<VTableCell>1000</VTableCell>
			</VTableRow>
			<VTableRow>
				<VTableCell>Voice</VTableCell>
				<VTableCell>Volumetric Changes</VTableCell>
				<VTableCell>5000</VTableCell>
			</VTableRow>
		</VTableBody>
	</VTable>
</template>
<script setup lang="ts">
import { VTable, VTableHead, VTableBody, VTableRow, VTableHeaderCell, VTableCell } from '@vonage/vivid-vue';
</script>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerTable } from '@vonage/vivid';

registerTable('your-prefix');
```

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>

Table Head, Table Body, Table Row, Table Header Cell, and Table Cell sub-components are registered automatically in the same function.

</vwc-note>

<br />

```html preview
<script type="module">
	import { registerTable } from '@vonage/vivid';
	registerTable('your-prefix');
</script>

<your-prefix-table>
	<your-prefix-table-head>
		<your-prefix-table-row>
			<your-prefix-table-header-cell>Product</your-prefix-table-header-cell>
			<your-prefix-table-header-cell>Type</your-prefix-table-header-cell>
			<your-prefix-table-header-cell>Threshold</your-prefix-table-header-cell>
		</your-prefix-table-row>
	</your-prefix-table-head>
	<your-prefix-table-body>
		<your-prefix-table-row>
			<your-prefix-table-cell>SMS</your-prefix-table-cell>
			<your-prefix-table-cell>Volumetric Changes</your-prefix-table-cell>
			<your-prefix-table-cell>1000</your-prefix-table-cell>
		</your-prefix-table-row>
		<your-prefix-table-row>
			<your-prefix-table-cell>Voice</your-prefix-table-cell>
			<your-prefix-table-cell>Volumetric Changes</your-prefix-table-cell>
			<your-prefix-table-cell>5000</your-prefix-table-cell>
		</your-prefix-table-row>
	</your-prefix-table-body>
</your-prefix-table>
```

</vwc-tab-panel>
</vwc-tabs>
