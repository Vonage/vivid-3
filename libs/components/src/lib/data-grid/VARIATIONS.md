## Default Configuration

Use the [Data Grid Row](/components/data-grid/code/#data-grid-row) and [Data Grid Cell](/components/data-grid/code/#data-grid-cell) sub-components inside of Data Grid's default slot to construct the tabular data like you would using `tr` and `td` tags inside of a `table` element.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>

Content can also be passed to the Data Grid programically using the [`rowsData` property](/components/data-grid/code/#rows-data).

</vwc-note>

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

## Grid Header

A grid header can be provided by setting:

- `row-type` attribute on [Data Grid Row](/components/data-grid/code/#data-grid-row) to `header` or `sticky-header` (for a header that stick to the top while the body is scrollable)
- `cell-type` on [Data Grid Cells](/components/data-grid/code/#data-grid-cell) to `columnheader`

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

## Setting Column Widths

Use the `grid-template-columns` attribute to set the width of the grid columns.

Values match the CSS `grid-template-columns` property.

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

## Fixed Columns

Use the `fixed-columns` attribute to set the number of the fixed grid columns. These columns will remain fixed to the left edge of the grid when scrolling horizontally.

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

## Selection Mode

Use the `selection-mode` attribute to specify the how cells or rows can be selected.

- `none` (default) - cells or row can not be selected
- `single-cell` - one cell can be selected
- `multi-cell` - multiple cells can be selected by holding the `SHIFT` key
- `single-row` - one row can be selected
- `multi-row` - multiple rows can be selected by holding the `SHIFT` key

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

## Pre-Selecting Rows or Cells

Use the `aria-selected` attribute to indicate that the selected state of the row or cell.

<vwc-note connotation="warning">
	
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

    For selection functionality to work correctly, the [`selection-mode` attribute](/components/data-grid/#selection-mode) (on Data Grid) must be set to the relevant value.

</vwc-note>

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
