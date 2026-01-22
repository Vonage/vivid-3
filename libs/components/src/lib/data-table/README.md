## Usage

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { registerDataTable } from '@vonage/vivid';

registerDataTable('your-prefix');
```

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>

Table Head, Table Body, Table Row, Table Header Cell, and Table Cell sub-components are registered automatically in the same function.

</vwc-note>

<br />

```html preview
<script type="module">
	import { registerDataTable } from '@vonage/vivid';
	registerDataTable('your-prefix');
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
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

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
</vwc-tabs>

## Basic Structure

The Table component provides a stateless, semantic structure for displaying tabular data. It follows a similar structure to HTML tables but uses web components.

```html preview
<vwc-table>
	<vwc-table-head>
		<vwc-table-row>
			<vwc-table-header-cell>Column 1</vwc-table-header-cell>
			<vwc-table-header-cell>Column 2</vwc-table-header-cell>
			<vwc-table-header-cell>Column 3</vwc-table-header-cell>
		</vwc-table-row>
	</vwc-table-head>
	<vwc-table-body>
		<vwc-table-row>
			<vwc-table-cell>Data 11</vwc-table-cell>
			<vwc-table-cell>Data 12</vwc-table-cell>
			<vwc-table-cell>Data 13</vwc-table-cell>
		</vwc-table-row>
		<vwc-table-row>
			<vwc-table-cell>Data 21</vwc-table-cell>
			<vwc-table-cell>Data 22</vwc-table-cell>
			<vwc-table-cell>Data 23</vwc-table-cell>
		</vwc-table-row>
	</vwc-table-body>
</vwc-table>
```

## API Reference

### Table

#### Properties

<div class="table-wrapper">

| Name   | Type | Description                                                   |
| ------ | ---- | ------------------------------------------------------------- |
| (none) | -    | This is a stateless component with no configurable properties |

</div>

### Table Head

#### Properties

<div class="table-wrapper">

| Name   | Type | Description                                                   |
| ------ | ---- | ------------------------------------------------------------- |
| (none) | -    | This is a stateless component with no configurable properties |

</div>

### Table Body

#### Properties

<div class="table-wrapper">

| Name   | Type | Description                                                   |
| ------ | ---- | ------------------------------------------------------------- |
| (none) | -    | This is a stateless component with no configurable properties |

</div>

### Table Row

#### Properties

<div class="table-wrapper">

| Name   | Type | Description                                                   |
| ------ | ---- | ------------------------------------------------------------- |
| (none) | -    | This is a stateless component with no configurable properties |

</div>

### Table Header Cell

#### Properties

<div class="table-wrapper">

| Name   | Type | Description                                                   |
| ------ | ---- | ------------------------------------------------------------- |
| (none) | -    | This is a stateless component with no configurable properties |

</div>

### Table Cell

#### Properties

<div class="table-wrapper">

| Name   | Type | Description                                                   |
| ------ | ---- | ------------------------------------------------------------- |
| (none) | -    | This is a stateless component with no configurable properties |

</div>
