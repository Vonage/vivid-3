## Default Configuration

Use the [Data Grid Row](/components/data-grid/code/#data-grid-row) and [Data Grid Cell](/components/data-grid/code/#data-grid-cell) sub-components inside of Data Grid's default slot to construct the tabular data like you would using `tr` and `td` tags inside of a `table` element.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>

Content can also be passed to the Data Grid programically using the [`rowsData` property](/components/data-grid/code/#rows-data).

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDataGrid, VDataGridCell, VDataGridRow } from '@vonage/vivid-vue';
</script>

<template>
	<VDataGrid>
		<VDataGridRow>
			<VDataGridCell>Data 11</VDataGridCell>
			<VDataGridCell>Data 12</VDataGridCell>
			<VDataGridCell>Data 13</VDataGridCell>
		</VDataGridRow>
		<VDataGridRow>
			<VDataGridCell>Data 21</VDataGridCell>
			<VDataGridCell>Data 22</VDataGridCell>
			<VDataGridCell>Data 23</VDataGridCell>
		</VDataGridRow>
	</VDataGrid>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-data-grid>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>Data 11</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 12</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 13</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>Data 21</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 22</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 23</vwc-data-grid-cell>
	</vwc-data-grid-row>
</vwc-data-grid>
```

</vwc-tab-panel>
</vwc-tabs>

## Grid Header

A grid header can be provided by setting:

- `row-type` attribute on [Data Grid Row](/components/data-grid/code/#data-grid-row) to `header` or `sticky-header` (for a header that stick to the top while the body is scrollable)
- `cell-type` on [Data Grid Cells](/components/data-grid/code/#data-grid-cell) to `columnheader`

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

{% raw %}

```vue preview
<script setup lang="ts">
import { ref } from 'vue';
import { VSelect, VOption, VDataGrid, VDataGridRow, VDataGridCell, type VProps } from '@vonage/vivid-vue';

const rowType = ref<VProps['VDataGridRow']['rowType']>('header');

const rows = [
	['Data 11', 'Data 12', 'Data 13'],
	['Data 21', 'Data 22', 'Data 23'],
	['Data 31', 'Data 32', 'Data 33'],
	['Data 41', 'Data 42', 'Data 43'],
	['Data 51', 'Data 52', 'Data 53'],
	['Data 61', 'Data 62', 'Data 63'],
];
</script>

<template>
	<VSelect v-model="rowType" label="Grid header row-type" class="select">
		<VOption value="header" text="header" default-selected />
		<VOption value="sticky-header" text="sticky-header" />
	</VSelect>

	<VDataGrid class="data-grid">
		<VDataGridRow :row-type="rowType">
			<VDataGridCell cell-type="columnheader">Data 1</VDataGridCell>
			<VDataGridCell cell-type="columnheader">Data 2</VDataGridCell>
			<VDataGridCell cell-type="columnheader">Data 3</VDataGridCell>
		</VDataGridRow>
		<VDataGridRow v-for="(row, index) in rows" :key="index">
			<VDataGridCell v-for="(cell, cellIndex) in row" :key="cellIndex">
				{{ cell }}
			</VDataGridCell>
		</VDataGridRow>
	</VDataGrid>
</template>

<style scoped>
.data-grid {
	max-block-size: 300px;
}

.select {
	inline-size: 160px;
}
</style>
```

{% endraw %}

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-select label="Grid header row-type" onchange="changeHeader()" class="select">
	<vwc-option value="header" text="header" selected></vwc-option>
	<vwc-option value="sticky-header" text="sticky-header"></vwc-option>
</vwc-select>

<vwc-data-grid class="data-grid">
	<vwc-data-grid-row row-type="header">
		<vwc-data-grid-cell cell-type="columnheader">Data 1</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader">Data 2</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader">Data 3</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>Data 11</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 12</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 13</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>Data 21</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 22</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 23</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>Data 31</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 32</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 33</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>Data 41</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 42</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 43</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>Data 51</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 52</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 53</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>Data 61</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 62</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 63</vwc-data-grid-cell>
	</vwc-data-grid-row>
</vwc-data-grid>

<script>
	const gridHeader = document.querySelector('.data-grid > [row-type]');
	function changeHeader() {
		headerType = event.currentTarget.value;
		gridHeader.setAttribute('row-type', headerType);
	}
</script>

<style>
	.data-grid {
		max-block-size: 300px;
	}

	.select {
		inline-size: 160px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Setting Column Widths

Use the `grid-template-columns` attribute to set the width of the grid columns.

Values match the CSS `grid-template-columns` property.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDataGrid, VDataGridCell, VDataGridRow } from '@vonage/vivid-vue';
</script>

<template>
	<VDataGrid grid-template-columns="15% 25% 60%" class="data-grid">
		<VDataGridRow row-type="header">
			<VDataGridCell cell-type="columnheader">Data 1</VDataGridCell>
			<VDataGridCell cell-type="columnheader">Data 2</VDataGridCell>
			<VDataGridCell cell-type="columnheader">Data 3</VDataGridCell>
		</VDataGridRow>
		<VDataGridRow>
			<VDataGridCell>Data 11</VDataGridCell>
			<VDataGridCell>Data 12</VDataGridCell>
			<VDataGridCell>Data 13 with more content to display</VDataGridCell>
		</VDataGridRow>
		<VDataGridRow>
			<VDataGridCell>Data 21</VDataGridCell>
			<VDataGridCell>Data 22</VDataGridCell>
			<VDataGridCell>Data 23 with more content to display</VDataGridCell>
		</VDataGridRow>
	</VDataGrid>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-data-grid grid-template-columns="15% 25% 60%" class="data-grid">
	<vwc-data-grid-row row-type="header">
		<vwc-data-grid-cell cell-type="columnheader">Data 1</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader">Data 2</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader">Data 3</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>Data 11</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 12</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 13 with more content to display</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>Data 21</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 22</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 23 with more content to display</vwc-data-grid-cell>
	</vwc-data-grid-row>
</vwc-data-grid>
```

</vwc-tab-panel>
</vwc-tabs>

## Fixed Columns

Use the `fixed-columns` attribute to set the number of the fixed grid columns. These columns will remain fixed to the left edge of the grid when scrolling horizontally.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDataGrid, VDataGridCell, VDataGridRow } from '@vonage/vivid-vue';
</script>

<template>
	<VDataGrid :fixed-columns="1">
		<VDataGridRow row-type="sticky-header">
			<VDataGridCell cell-type="columnheader">ID</VDataGridCell>
			<VDataGridCell cell-type="columnheader">Status</VDataGridCell>
			<VDataGridCell cell-type="columnheader">Category</VDataGridCell>
			<VDataGridCell cell-type="columnheader">Value</VDataGridCell>
			<VDataGridCell cell-type="columnheader">Updated On</VDataGridCell>
			<VDataGridCell cell-type="columnheader">Notes</VDataGridCell>
		</VDataGridRow>
		<VDataGridRow>
			<VDataGridCell>001</VDataGridCell>
			<VDataGridCell>Active</VDataGridCell>
			<VDataGridCell>Hardware</VDataGridCell>
			<VDataGridCell>128.45</VDataGridCell>
			<VDataGridCell>2025-07-10</VDataGridCell>
			<VDataGridCell>New batch arrived</VDataGridCell>
		</VDataGridRow>
		<VDataGridRow>
			<VDataGridCell>002</VDataGridCell>
			<VDataGridCell>Inactive</VDataGridCell>
			<VDataGridCell>Software</VDataGridCell>
			<VDataGridCell>76.30</VDataGridCell>
			<VDataGridCell>2025-06-28</VDataGridCell>
			<VDataGridCell>Deprecated module</VDataGridCell>
		</VDataGridRow>
		<VDataGridRow>
			<VDataGridCell>003</VDataGridCell>
			<VDataGridCell>Pending</VDataGridCell>
			<VDataGridCell>Licensing</VDataGridCell>
			<VDataGridCell>150.00</VDataGridCell>
			<VDataGridCell>2025-07-15</VDataGridCell>
			<VDataGridCell>Awaiting approval</VDataGridCell>
		</VDataGridRow>
		<VDataGridRow>
			<VDataGridCell>004</VDataGridCell>
			<VDataGridCell>Active</VDataGridCell>
			<VDataGridCell>Service</VDataGridCell>
			<VDataGridCell>89.99</VDataGridCell>
			<VDataGridCell>2025-07-17</VDataGridCell>
			<VDataGridCell>Auto-renew enabled</VDataGridCell>
		</VDataGridRow>
	</VDataGrid>
</template>

<style scoped>
[data-vvd-component='data-grid-row'] {
	width: 1200px;
	display: block;
	box-sizing: border-box;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<style>
	[data-vvd-component='data-grid-row'] {
		width: 1200px;
		display: block;
		box-sizing: border-box;
	}
</style>
<vwc-data-grid fixed-columns="1">
	<vwc-data-grid-row row-type="sticky-header">
		<vwc-data-grid-cell cell-type="columnheader">ID</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader">Status</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader">Category</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader">Value</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader">Updated On</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader">Notes</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>001</vwc-data-grid-cell>
		<vwc-data-grid-cell>Active</vwc-data-grid-cell>
		<vwc-data-grid-cell>Hardware</vwc-data-grid-cell>
		<vwc-data-grid-cell>128.45</vwc-data-grid-cell>
		<vwc-data-grid-cell>2025-07-10</vwc-data-grid-cell>
		<vwc-data-grid-cell>New batch arrived</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>002</vwc-data-grid-cell>
		<vwc-data-grid-cell>Inactive</vwc-data-grid-cell>
		<vwc-data-grid-cell>Software</vwc-data-grid-cell>
		<vwc-data-grid-cell>76.30</vwc-data-grid-cell>
		<vwc-data-grid-cell>2025-06-28</vwc-data-grid-cell>
		<vwc-data-grid-cell>Deprecated module</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>003</vwc-data-grid-cell>
		<vwc-data-grid-cell>Pending</vwc-data-grid-cell>
		<vwc-data-grid-cell>Licensing</vwc-data-grid-cell>
		<vwc-data-grid-cell>150.00</vwc-data-grid-cell>
		<vwc-data-grid-cell>2025-07-15</vwc-data-grid-cell>
		<vwc-data-grid-cell>Awaiting approval</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>004</vwc-data-grid-cell>
		<vwc-data-grid-cell>Active</vwc-data-grid-cell>
		<vwc-data-grid-cell>Service</vwc-data-grid-cell>
		<vwc-data-grid-cell>89.99</vwc-data-grid-cell>
		<vwc-data-grid-cell>2025-07-17</vwc-data-grid-cell>
		<vwc-data-grid-cell>Auto-renew enabled</vwc-data-grid-cell>
	</vwc-data-grid-row>
</vwc-data-grid>
```

</vwc-tab-panel>
</vwc-tabs>

## Selection Mode

Use the `selection-mode` attribute to specify the how cells or rows can be selected.

- `none` (default) - cells or row can not be selected
- `single-cell` - one cell can be selected
- `multi-cell` - multiple cells can be selected by holding the `SHIFT` key
- `single-row` - one row can be selected
- `multi-row` - multiple rows can be selected by holding the `SHIFT` key

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

{% raw %}

```vue preview 300px
<script setup lang="ts">
import { ref } from 'vue';
import { VSelect, VOption, VDataGrid, VDataGridRow, VDataGridCell, type VProps } from '@vonage/vivid-vue';

const selectionMode = ref<VProps['VDataGrid']['selectionMode']>('none');

const rows = [
	['Data 11', 'Data 12', 'Data 13'],
	['Data 21', 'Data 22', 'Data 23'],
	['Data 31', 'Data 32', 'Data 33'],
	['Data 41', 'Data 42', 'Data 43'],
];
</script>

<template>
	<VSelect v-model="selectionMode">
		<VOption value="none" text="none" />
		<VOption value="single-cell" text="single-cell" />
		<VOption value="multi-cell" text="multi-cell" />
		<VOption value="single-row" text="single-row" />
		<VOption value="multi-row" text="multi-row" />
	</VSelect>

	<VDataGrid class="data-grid" :selection-mode="selectionMode">
		<VDataGridRow row-type="header">
			<VDataGridCell cell-type="columnheader">Data 1</VDataGridCell>
			<VDataGridCell cell-type="columnheader">Data 2</VDataGridCell>
			<VDataGridCell cell-type="columnheader">Data 3</VDataGridCell>
		</VDataGridRow>
		<VDataGridRow v-for="(row, index) in rows" :key="index">
			<VDataGridCell v-for="(cell, cellIndex) in row" :key="cellIndex">
				{{ cell }}
			</VDataGridCell>
		</VDataGridRow>
	</VDataGrid>
</template>
```

{% endraw %}

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 300px
<vwc-select onchange="changeSelectionMode()">
	<vwc-option value="none" text="none"></vwc-option>
	<vwc-option value="single-cell" text="single-cell"></vwc-option>
	<vwc-option value="multi-cell" text="multi-cell"></vwc-option>
	<vwc-option value="single-row" text="single-row"></vwc-option>
	<vwc-option value="multi-row" text="multi-row"></vwc-option>
</vwc-select>

<vwc-data-grid class="data-grid">
	<vwc-data-grid-row row-type="header">
		<vwc-data-grid-cell cell-type="columnheader">Data 1</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader">Data 2</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader">Data 3</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>Data 11</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 12</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 13</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>Data 21</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 22</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 23</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>Data 31</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 32</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 33</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>Data 41</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 42</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 43</vwc-data-grid-cell>
	</vwc-data-grid-row>
</vwc-data-grid>

<script>
	const grid = document.querySelector('.data-grid');

	function changeSelectionMode() {
		selectionMode = event.currentTarget.value;
		grid.selectionMode = selectionMode;
	}
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Pre-Selecting Rows or Cells

Use the `aria-selected` attribute to indicate that the selected state of the row or cell.

<vwc-note connotation="warning">
	
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

    For selection functionality to work correctly, the [`selection-mode` attribute](/components/data-grid/#selection-mode) (on Data Grid) must be set to the relevant value.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview blocks
<script setup lang="ts">
import { VDataGrid, VDataGridCell, VDataGridRow } from '@vonage/vivid-vue';
</script>

<template>
	<VDataGrid selection-mode="single-row">
		<VDataGridRow class="header" row-type="header">
			<VDataGridCell cell-type="columnheader">Data 1</VDataGridCell>
			<VDataGridCell cell-type="columnheader">Data 2</VDataGridCell>
		</VDataGridRow>
		<VDataGridRow aria-selected="true">
			<VDataGridCell>Data 11</VDataGridCell>
			<VDataGridCell>Data 12</VDataGridCell>
		</VDataGridRow>
		<VDataGridRow>
			<VDataGridCell>Data 21</VDataGridCell>
			<VDataGridCell>Data 22</VDataGridCell>
		</VDataGridRow>
	</VDataGrid>
	<VDataGrid selection-mode="single-cell">
		<VDataGridRow class="header" row-type="header">
			<VDataGridCell cell-type="columnheader">Data 1</VDataGridCell>
			<VDataGridCell cell-type="columnheader">Data 2</VDataGridCell>
		</VDataGridRow>
		<VDataGridRow>
			<VDataGridCell aria-selected="true">Data 11</VDataGridCell>
			<VDataGridCell>Data 12</VDataGridCell>
		</VDataGridRow>
		<VDataGridRow>
			<VDataGridCell>Data 21</VDataGridCell>
			<VDataGridCell>Data 22</VDataGridCell>
		</VDataGridRow>
	</VDataGrid>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview blocks
<vwc-data-grid selection-mode="single-row">
	<vwc-data-grid-row class="header" row-type="header">
		<vwc-data-grid-cell cell-type="columnheader">Data 1</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader">Data 2</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row aria-selected="true">
		<vwc-data-grid-cell>Data 11</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 12</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>Data 21</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 22</vwc-data-grid-cell>
	</vwc-data-grid-row>
</vwc-data-grid>
<vwc-data-grid selection-mode="single-cell">
	<vwc-data-grid-row class="header" row-type="header">
		<vwc-data-grid-cell cell-type="columnheader">Data 1</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader">Data 2</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell aria-selected="true">Data 11</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 12</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>Data 21</vwc-data-grid-cell>
		<vwc-data-grid-cell>Data 22</vwc-data-grid-cell>
	</vwc-data-grid-row>
</vwc-data-grid>
```

</vwc-tab-panel>
</vwc-tabs>

## Indicate Sort State

Use the `sort-direction` attribute on a `columnheader` cell to indicate the sortable state of a header cell.
This will add the right chevron(s) according to the state.

- `ascending` - Items are sorted in ascending order by this column. Will show one chevron pointing up.
- `descending` - Items are sorted in descending order by this column. Will show one chevron pointing down.
- `none` - There is no defined sort applied to the column. Will show indeterminate state with the two chevrons.
- `other` - A sorting algorithm other than ascending or descending has been applied. Will show no hint.

<vwc-note connotation="information">

    <vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>

    The sortable feature doesn't actually sort the data, it only changes the visual representation of the column header. See the [sorting use case](/components/data-grid/use-cases/#sortable-columns) for more information.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDataGrid, VDataGridCell, VDataGridRow } from '@vonage/vivid-vue';
</script>

<template>
	<VDataGrid>
		<VDataGridRow>
			<VDataGridCell cell-type="columnheader" sort-direction="ascending">Ascending</VDataGridCell>
			<VDataGridCell cell-type="columnheader" sort-direction="descending">Descending</VDataGridCell>
			<VDataGridCell cell-type="columnheader" sort-direction="none">None</VDataGridCell>
			<VDataGridCell cell-type="columnheader" sort-direction="other">Other</VDataGridCell>
		</VDataGridRow>
	</VDataGrid>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-data-grid>
	<vwc-data-grid-row>
		<vwc-data-grid-cell cell-type="columnheader" sort-direction="ascending">Ascending</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader" sort-direction="descending">Descending</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader" sort-direction="none">None</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader" sort-direction="other">Other</vwc-data-grid-cell>
	</vwc-data-grid-row>
</vwc-data-grid>
```

</vwc-tab-panel>
</vwc-tabs>
