## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/data-grid';
import '@vonage/vivid/data-grid-row';
import '@vonage/vivid/data-grid-cell';
```

or, if you need to use a unique prefix:

```js
import { registerDataGrid } from '@vonage/vivid';

registerDataGrid('your-prefix');
```

<vwc-note connotation="information">
<<<<<<< HEAD
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>
=======
	<vwc-icon slot="icon" name="info-line"></vwc-icon>
>>>>>>> main

Data Grid Row and Data Grid Cell sub-components are registered automatically in the same function.

</vwc-note>

<br />

```html preview
<script type="module">
	import { registerDataGrid } from '@vonage/vivid';
	registerDataGrid('your-prefix');
</script>

<your-prefix-data-grid>
	<your-prefix-data-grid-row>
		<your-prefix-data-grid-cell>Data 11</your-prefix-data-grid-cell>
		<your-prefix-data-grid-cell>Data 12</your-prefix-data-grid-cell>
		<your-prefix-data-grid-cell>Data 13</your-prefix-data-grid-cell>
	</your-prefix-data-grid-row>
	<your-prefix-data-grid-row>
		<your-prefix-data-grid-cell>Data 21</your-prefix-data-grid-cell>
		<your-prefix-data-grid-cell>Data 22</your-prefix-data-grid-cell>
		<your-prefix-data-grid-cell>Data 23</your-prefix-data-grid-cell>
	</your-prefix-data-grid-row>
</your-prefix-data-grid>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VDataGrid, VDataGridRow, VDataGridCell } from '@vonage/vivid-vue';
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
</vwc-tabs>

## Remove From Tab Order

Use the `no-tabbing` attribute to remove the component from the tab order.

```html preview 300px
<vwc-button
	label="No Tabbing"
	onclick="changeTabbing(true)"
	class="button"
	appearance="filled"
></vwc-button>
<vwc-button
	label="Tabbing"
	onclick="changeTabbing(false)"
	class="button"
></vwc-button>

<div id="active-element-content-display">
	<p>
		Hit <code>TAB</code> key to browse the tab queue. When in `no-tabbing` mode,
		grid will never be focused.
	</p>
	<div id="active-element-content">Grid not focused</div>
	<div id="focused-cell-content">&nbsp;</div>
</div>

<vwc-data-grid no-tabbing class="data-grid">
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
</vwc-data-grid>

<script>
	const grid = document.querySelector('.data-grid');

	function changeTabbing(tabbing) {
		event.currentTarget.appearance = 'filled';
		Array.from(
			event.currentTarget.parentElement.querySelectorAll('.button')
		).filter((x) => x !== event.currentTarget)[0].appearance = null;
		grid.noTabbing = tabbing;
	}

	grid.addEventListener('focusin', () => {
		document.getElementById('active-element-content').innerText =
			'Grid Focused';
	});
	grid.addEventListener('focusout', () => {
		document.getElementById('active-element-content').innerText =
			'Grid Not Focused';
		document.getElementById('focused-cell-content').innerText = '';
	});
	grid.addEventListener('cell-focused', (e) => {
		document.getElementById('focused-cell-content').innerText =
			'Focused Cell Content: ' + e.detail.innerText;
	});
</script>
```

## Setting Focus on a Cell

Use the `focusRowIndex` and `focusColumnIndex` to determine which row or cell to set focus on when the Data Grid component receieves focus.

In the example below, change the value of the row / column index and then tab into the Data Grid.

```html preview
<vwc-number-field
	label="Row index"
	id="row-index"
	min="0"
	value="0"
	max="5"
></vwc-number-field>
<vwc-number-field
	label="Column index"
	id="col-index"
	min="0"
	value="0"
	max="2"
></vwc-number-field>
<vwc-data-grid></vwc-data-grid>
<script>
	const activeRow = document.getElementById('row-index');
	const activeCol = document.getElementById('col-index');

	activeRow.addEventListener('change', changeActiveRow);
	function changeActiveRow() {
		grid.focusRowIndex = Number(activeRow.value);
	}

	activeCol.addEventListener('change', changeActiveCol);
	function changeActiveCol() {
		grid.focusColumnIndex = Number(activeCol.value);
	}

	grid = document.querySelector('vwc-data-grid');
	grid.rowsData = [
		{ data1: 'data11', data2: 'data12', data3: 'data13' },
		{ data1: 'data21', data2: 'data22', data3: 'data23' },
		{ data1: 'data31', data2: 'data32', data3: 'data33' },
		{ data1: 'data41', data2: 'data42', data3: 'data43' },
	];
</script>
```

## Cell Click Event

The `cell-click` event is fired when a cell is clicked on or when the enter or space key is pressed on a focused cell.

Event details: `{ cell, row, isHeaderCell, columnDataKey }`

```html preview
<vwc-data-grid class="data-grid"></vwc-data-grid>
<br />
<div>Cell Clicked: <span id="click-result"></span></div>

<script>
	const grid = document.querySelector('.data-grid');
	const clickResult = document.getElementById('click-result');
	grid.columnDefinitions = [
		{ columnDataKey: 'data1', title: 'Column 1' },
		{ columnDataKey: 'data2', title: 'Column 2' },
	];
	grid.rowsData = [
		{ data1: 'data11', data2: 'data12' },
		{ data1: 'data21', data2: 'data22' },
	];

	grid.addEventListener('cell-click', (e) => {
		const { cell, row, columnDataKey, isHeaderCell } = e.detail;

		let result = `${cell.textContent} Col #${cell.gridColumn}, Row Index${row.rowIndex}`;
		if (isHeaderCell) result += ': Grid Header Cell';

		clickResult.innerHTML = result;
	});
</script>
```

## Rows Data

Use the `rowsData` property to provide the component with the data (an `array` or `objects`) to be displayed.
If not used in conjuction with [column defintions](#columndefinitions) (`title`), text displayed in the column headers will be the data keys of the object.

<vwc-note connotation="warning">
<<<<<<< HEAD
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>
=======
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>
>>>>>>> main

The `rowsData` property provides an alternative way to populate the data grid with content.

However, we recommend using the [Data Grid Row](#data-grid-row) and [Data Grid Cell](#data-grid-cell) sub-components to construct the content declaratively. This approach offers greater flexibility, allowing you to incorporate non-text-based elements such as other components or HTML elements (see [Select in grid](components/data-grid/use-cases/#select-in-a-grid) use case).

</vwc-note>

```html preview
<vwc-data-grid class="data-grid"></vwc-data-grid>

<script>
	grid = document.querySelector('.data-grid');
	grid.rowsData = [
		{ data1: 'data11', data2: 'data12' },
		{ data1: 'data21', data2: 'data22' },
	];
</script>
```

### Column Definitions

Use the `columnDefinitions` property to programmatically configure the column headers that are generated when using `rows-data`. See the [ColumnDefinition interface](#data-grid) for more information.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>

The sortable feature doesn't actually sort the data, it only changes the visual representation of the column header. See the [sorting use case](/components/data-grid/use-cases/#sortable-columns) for more information.

</vwc-note>

```html preview
<vwc-data-grid></vwc-data-grid>
<script>
	grid = document.querySelector('vwc-data-grid');
	grid.columnDefinitions = [
		{
			columnDataKey: 'data1',
			title: 'Custom Title 1',
			sortable: true,
			sortDirection: 'ascending',
		},
		{ columnDataKey: 'data2', title: 'Custom Title 2', sortable: true },
	];
	grid.rowsData = [
		{ data1: 'data11', data2: 'data12' },
		{ data1: 'data21', data2: 'data22' },
	];
</script>
```

### Generate Header

Use the `generate-header` property to programmatically define the type of grid header that is generated when using `rows-data`.

```html preview
<vwc-select onchange="changeHeader()">
	<vwc-option value="default" text="default"></vwc-option>
	<vwc-option value="sticky" text="sticky"></vwc-option>
	<vwc-option value="none" text="none"></vwc-option>
</vwc-select>

<vwc-data-grid class="data-grid"></vwc-data-grid>

<script>
	const grid = document.querySelector('vwc-data-grid');

	function changeHeader() {
		headerType = event.currentTarget.value;
		grid.generateHeader = headerType;
	}

	grid.rowsData = [
		{ data1: 'data111', data2: 'data12' },
		{ data1: 'data21', data2: 'data22' },
		{ data1: 'data31', data2: 'data32' },
		{ data1: 'data41', data2: 'data42' },
		{ data1: 'data51', data2: 'data52' },
		{ data1: 'data61', data2: 'data62' },
	];
</script>

<style>
	vwc-data-grid {
		max-block-size: 300px;
	}
</style>
```

### Row, Cell and Header Cell Templates

The `ViewTemplate`s used to render rows, cells and header cells can be customised using the following properties:

- `rowItemTemplate`
- `cellItemTemplate`
- `headerCellItemTemplate`

You need to use `html` from `fast-element`.

```html
<vwc-data-grid class="data-grid"></vwc-data-grid>
<script>
	import { html } from '@microsoft/fast-element';
	const grid = document.querySelector('.data-grid');
	grid.rowItemTemplate = html`<div>All rows will look like me!</div>`;
	grid.cellItemTemplate = html`<div>All cells will look like me!</div>`;
	grid.headerCellItemTemplate = html`<div>
		All header cells will look like me!
	</div>`;
	grid.rowsData = [
		{ data1: 'data11', data2: 'data12' },
		{ data1: 'data21', data2: 'data22' },
	];
</script>
```

### Row Element Tag

Use the `rowElementTag` to set the element tag for header row cells. If not set, the default tag `vwc-data-grid-cell` will be used.

```html preview
<vwc-data-grid></vwc-data-grid>
<script>
	grid = document.querySelector('vwc-data-grid');
	grid.rowElementTag = 'div';
	grid.rowsData = [
		{ data1: 'data11', data2: 'data12' },
		{ data1: 'data21', data2: 'data22' },
	];
</script>
```

## CSS Variables

### Row Background

When Row is set to sticky there's a default canvas background-color.  
Use `--data-grid-row-background` to change the sticky row background-color.

```html preview
<vwc-data-grid class="data-grid"></vwc-data-grid>

<style>
	.data-grid {
		--data-grid-row-background: var(--vvd-color-neutral-50);
	}
</style>

<script>
	const grid = document.querySelector('vwc-data-grid');
	grid.generateHeader = 'sticky';
	grid.rowsData = [
		{ data1: 'data111', data2: 'data12' },
		{ data1: 'data21', data2: 'data22' },
		{ data1: 'data31', data2: 'data32' },
		{ data1: 'data41', data2: 'data42' },
		{ data1: 'data51', data2: 'data52' },
		{ data1: 'data61', data2: 'data62' },
	];
</script>
```

### Block Size

Use `--data-grid-cell-block-size` to change the cell's `block-size`.

By default, header cells have a fixed height while data cells have a dynamic height based on content.

```html preview
<vwc-data-grid>
	<vwc-data-grid-row row-type="header">
		<vwc-data-grid-cell cell-type="columnheader"> Column 1 </vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell> Dynamic height (default) </vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row class="fixed-height">
		<vwc-data-grid-cell> Fixed height </vwc-data-grid-cell>
	</vwc-data-grid-row>
</vwc-data-grid>

<style>
	.fixed-height {
		--data-grid-cell-block-size: 100px;
	}
</style>
```

### White Space

Use `--data-grid-cell-white-space` to change the cell's `white-space`.

By default, header cells will not wrap text (`nowrap`), while data cells will wrap text (`normal`).

```html preview
<vwc-data-grid>
	<vwc-data-grid-row row-type="header">
		<vwc-data-grid-cell cell-type="columnheader"> Column 1 </vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius
			libero ipsum, ut rhoncus nulla varius sit amet. Vestibulum volutpat
			feugiat neque eget semper. Nam commodo pharetra lobortis. Sed id enim
			metus.
		</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row class="nowrap">
		<vwc-data-grid-cell>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius
			libero ipsum, ut rhoncus nulla varius sit amet. Vestibulum volutpat
			feugiat neque eget semper. Nam commodo pharetra lobortis. Sed id enim
			metus.
		</vwc-data-grid-cell>
	</vwc-data-grid-row>
</vwc-data-grid>

<style>
	.nowrap {
		--data-grid-cell-white-space: nowrap;
	}
</style>
```

## API Reference

### Data Grid

#### Properties

<div class="table-wrapper">

| Name                       | Type                                                                 | Description                                                        |
| -------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **cellItemTemplate**       | `ViewTemplate`                                                       | Templete to use when rendering cells                               |
| **columnDefinitions**      | `ColumnDefinition[]`                                                 | Configure the grid header columns                                  |
| **focusColumnIndex**       | `number`                                                             | Index of column to be focused on when the Data Grid receives focus |
| **focusRowIndex**          | `number`                                                             | Index of row to be focused on when the Data Grid receives focus    |
| **generateHeader**         | enum: `default`, `sticky`, `none`                                    | Type of header to be generated                                     |
| **headerCellItemTemplate** | `ViewTemplate`                                                       | Templete to use when rendering grid header cells                   |
| **grid-template-columns**  | `string`                                                             | Sets the width of the columns                                      |
| **no-tabbing**             | `boolean`                                                            | Remove the grid from the tab order                                 |
| **rowsData**               | `object[]`                                                           | Content of the grid in data format                                 |
| **rowElementTag**          | `string`                                                             | Element tag for header rows                                        |
| **rowItemTemplate**        | `ViewTemplate`                                                       | Templete to use when rendering rows                                |
| **selection-mode**         | enum: `none`, `single-row`, `multi-row`, `single-cell`, `multi-cell` | Set the selection mode                                             |

</div>

#### Interfaces

##### ColumnDefinition

<div class="table-wrapper">

| Name                            | Type                                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `columndDataKey`                | `string`                                                             | The property from which the data of the column is taken from                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `title`                         | `string`                                                             | The title of the column                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `headerCellTemplate`            | `ViewTemplate`                                                       | A custom template for a header cell                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `headerCellInternalFocusQueue`  | `boolean`                                                            | Indicates whether the header cell has in internal focus queue. This should be set to `true` for header cells that host controls that need to use arrow keys or have multiple focusable internal elements. When the user hits the Enter or F2 key the element specified by the `headerCellFocusTargetCallback` function will be focused (see keyboard interactions described [here](https://w3c.github.io/aria-practices/#grid)).                                                                                                                           |
| `headerCellFocusTargetCallback` | `(cell) => HTMLElement`                                              | Callback function that takes the cell node as a parameter and returns the HTMLElement to focus in a custom cell. This enables authors to direct focus in a custom cell with interactive elements. When `headerCellInternalFocusQueue` is `false` this function is called when the cell is first focused to immediately move focus to a cell element, for example a cell that contains a button could move focus directly to the button when focused. When `headerCellInternalFocusQueue` is `true` this function is called when the user hits Enter or F2. |
| `cellTemplate`                  | `ViewTemplate`                                                       | A custom template for a cell                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `cellInternalFocusQueue`        | `boolean`                                                            | Indicates whether the cell has in internal focus queue. This should be set to `true` for cells that host controls that need to use arrow keys or have multiple focusable internal elements. When the user hits the Enter or F2 key the element specified by the `cellFocusTargetCallback` function will be focused (see keyboard interactions described [here](https://w3c.github.io/aria-practices/#grid)).                                                                                                                                               |
| `cellFocusTargetCallback`       | `(cell) => HTMLElement`                                              | Callback function that takes the cell node as a parameter and returns the `HTMLElement` to focus in a custom cell. This enables authors to direct focus in a custom cell with interactive elements. When `cellInternalFocusQueue` is `false` this function is called when the cell is first focused to immediately move focus to a cell element, for example a cell that contains a button could move focus directly to the button when focused. When `cellInternalFocusQueue` is `true` this function is called when the user hits Enter or F2.           |
| `isRowHeader`                   | `boolean`                                                            | Whether this column is the row header                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `sortable`                      | `boolean`                                                            | Whether this column is sortable                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `sortDirection`                 | `'none'` &#124; `'ascending'` &#124; `'descending'` &#124; `'other'` | Define the column's sort direction                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

</div>

### Data Grid Row

#### Properties

<div class="table-wrapper">

| Name            | Type                                       | Description           |
| --------------- | ------------------------------------------ | --------------------- |
| `aria-selected` | `string`, `true`, `false`                  | Selected state of row |
| `row-type`      | enum: `default`, `header`, `sticky-header` | Selected state of row |

</div>

#### Events

<div class="table-wrapper">

| Name          | Type                       | Bubbles | Composed | Description                                                                                                |
| ------------- | -------------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `row-focused` | `CustomEvent<HTMLElement>` | Yes     | Yes      | Fires a custom 'row-focused' event when focus is on an element (usually a cell or its contents) in the row |

</div>

### Data Grid Cell

#### Properties

<div class="table-wrapper">

| Name            | Type                                      | Description                   |
| --------------- | ----------------------------------------- | ----------------------------- |
| `aria-selected` | `true`, `false`                           | Selected state of cell        |
| `aria-sort`     | `ascending`, `decending`, `none`, `other` | Sort state of the header cell |

</div>

#### Events

<div class="table-wrapper">

| Name           | Type                                                                                               | Bubbles | Composed | Description                                                                   |
| -------------- | -------------------------------------------------------------------------------------------------- | ------- | -------- | ----------------------------------------------------------------------------- |
| `cell-focused` | `CustomEvent<HTMLElement>`                                                                         | Yes     | Yes      | Fires a custom 'cell-focused' event when focus is on the cell or its contents |
| `sort`         | `CustomEvent<{columnDataKey: string, ariaSort: string \| null}>`                                   | Yes     | Yes      | Event that fires when a sortable column header is clicked                     |
| `cell-click`   | `CustomEvent<{cell: HTMLElement, row: HTMLElement, isHeaderCell: boolean, columnDataKey: string}>` | Yes     | Yes      | Event that fires when a cell is clicked                                       |

</div>
