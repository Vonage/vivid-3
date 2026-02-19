## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<template>
	<VSelect v-model="value" label="Selection Mode" class="select">
		<VOption value="none" text="none" />
		<VOption value="single-row" text="single-row" />
		<VOption value="multi-row" text="multi-row" />
		<VOption value="single-cell" text="single-cell" />
		<VOption value="multi-cell" text="multi-cell" />
	</VSelect>
	<VDataGrid id="grid" :selection-mode="value" :rows-data="data" />
</template>
<script setup lang="ts">
import { VDataGrid, VSelect, VOption } from '@vonage/vivid-vue';
import { ref } from 'vue';

const value = ref('none');
const data = ref([
	{ name: 'John', surname: 'Doe', age: 30 },
	{ name: 'Jane', surname: 'Doe', age: 25 },
	{ name: 'Bill', surname: 'Cave', age: 22 },
	{ name: 'Jill', surname: 'Jane', age: 23 },
]);
</script>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerDataGrid } from '@vonage/vivid';

registerDataGrid('your-prefix');
```

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>

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
</vwc-tabs>

## Remove From Tab Order

Use the `no-tabbing` attribute to remove the component from the tab order.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

{% raw %}

```vue preview 300px
<script setup lang="ts">
import { ref } from 'vue';
import { VButton, VDataGrid, VDataGridRow, VDataGridCell, type VEvents } from '@vonage/vivid-vue';

const noTabbing = ref(true);
const gridFocused = ref(false);
const focusedCellContent = ref('');

function onGridFocusin() {
	gridFocused.value = true;
}

function onGridFocusout() {
	gridFocused.value = false;
	focusedCellContent.value = '';
}

function onCellFocused(e: VEvents['VDataGridCell']['cell-focused']) {
	focusedCellContent.value = e.detail.innerText;
}
</script>

<template>
	<VButton label="No Tabbing" :appearance="noTabbing ? 'filled' : undefined" class="button" @click="noTabbing = true" />
	<VButton label="Tabbing" :appearance="!noTabbing ? 'filled' : undefined" class="button" @click="noTabbing = false" />

	<div id="active-element-content-display">
		<p>Hit <code>TAB</code> key to browse the tab queue. When in `no-tabbing` mode, grid will never be focused.</p>
		<div>
			Grid:
			<span id="active-element-content">
				{{ gridFocused ? 'Focused' : 'Not Focused' }}
			</span>
		</div>
		<div>
			Focused Cell Content:
			<span id="focused-cell-content">{{ focusedCellContent }}</span>
		</div>
	</div>

	<VDataGrid ref="data-grid" :no-tabbing="noTabbing" class="data-grid" @focusin="onGridFocusin" @focusout="onGridFocusout">
		<VDataGridRow row-type="header">
			<VDataGridCell cell-type="columnheader" @cell-focused="onCellFocused">Data 1</VDataGridCell>
			<VDataGridCell cell-type="columnheader" @cell-focused="onCellFocused">Data 2</VDataGridCell>
			<VDataGridCell cell-type="columnheader" @cell-focused="onCellFocused">Data 3</VDataGridCell>
		</VDataGridRow>
		<VDataGridRow>
			<VDataGridCell @cell-focused="onCellFocused">Data 11</VDataGridCell>
			<VDataGridCell @cell-focused="onCellFocused">Data 12</VDataGridCell>
			<VDataGridCell @cell-focused="onCellFocused">Data 13</VDataGridCell>
		</VDataGridRow>
		<VDataGridRow>
			<VDataGridCell @cell-focused="onCellFocused">Data 21</VDataGridCell>
			<VDataGridCell @cell-focused="onCellFocused">Data 22</VDataGridCell>
			<VDataGridCell @cell-focused="onCellFocused">Data 23</VDataGridCell>
		</VDataGridRow>
	</VDataGrid>
</template>
```

{% endraw %}

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 300px
<vwc-button label="No Tabbing" onclick="changeTabbing(true)" class="button" appearance="filled"></vwc-button>
<vwc-button label="Tabbing" onclick="changeTabbing(false)" class="button"></vwc-button>

<div id="active-element-content-display">
	<p>Hit <code>TAB</code> key to browse the tab queue. When in `no-tabbing` mode, grid will never be focused.</p>
	<div>Grid: <span id="active-element-content">Not Focused</span></div>
	<div>Focused Cell Content: <span id="focused-cell-content"></span></div>
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
		Array.from(event.currentTarget.parentElement.querySelectorAll('.button')).filter((x) => x !== event.currentTarget)[0].appearance = null;
		grid.noTabbing = tabbing;
	}

	grid.addEventListener('focusin', () => {
		document.getElementById('active-element-content').innerText = 'Focused';
	});
	grid.addEventListener('focusout', () => {
		document.getElementById('active-element-content').innerText = 'Not Focused';
		document.getElementById('focused-cell-content').innerText = '';
	});
	grid.addEventListener('cell-focused', (e) => {
		document.getElementById('focused-cell-content').innerText = e.detail.innerText;
	});
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Setting Focus on a Cell

Use the `focusRowIndex` and `focusColumnIndex` to determine which row or cell to set focus on when the Data Grid component receieves focus.

In the example below, change the value of the row / column index and then tab into the Data Grid.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { ref } from 'vue';
import { VNumberField, VDataGrid } from '@vonage/vivid-vue';

const focusRowIndex = ref(0);
const focusColumnIndex = ref(0);

const rowsData = [
	{ data1: 'data11', data2: 'data12', data3: 'data13' },
	{ data1: 'data21', data2: 'data22', data3: 'data23' },
	{ data1: 'data31', data2: 'data32', data3: 'data33' },
	{ data1: 'data41', data2: 'data42', data3: 'data43' },
];
</script>

<template>
	<VNumberField v-model:value-as-number="focusRowIndex" label="Row index" :min="0" :max="5" />
	<VNumberField v-model:value-as-number="focusColumnIndex" label="Column index" :min="0" :max="2" />
	<VDataGrid :rows-data="rowsData" :focus-row-index="focusRowIndex" :focus-column-index="focusColumnIndex" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-number-field label="Row index" id="row-index" min="0" value="0" max="5"></vwc-number-field>
<vwc-number-field label="Column index" id="col-index" min="0" value="0" max="2"></vwc-number-field>
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

</vwc-tab-panel>
</vwc-tabs>

## Cell Click Event

The `cell-click` event is fired when a cell is clicked on or when the enter or space key is pressed on a focused cell.

Event details: `{ cell, row, isHeaderCell, columnDataKey }`

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

{% raw %}

```vue preview
<script setup lang="ts">
import { ref } from 'vue';
import { VDataGrid, type VEvents } from '@vonage/vivid-vue';
import type { VwcDataGridCellElement, VwcDataGridRowElement } from '@vonage/vivid';

const columnDefinitions = [
	{ columnDataKey: 'data1', title: 'Column 1' },
	{ columnDataKey: 'data2', title: 'Column 2' },
];

const rowsData = [
	{ data1: 'data11', data2: 'data12' },
	{ data1: 'data21', data2: 'data22' },
];

const clickResult = ref('');

function onCellClick(e: VEvents['VDataGrid']['cell-click']) {
	const { cell, row, isHeaderCell } = e.detail;
	const gridCell = cell as VwcDataGridCellElement;
	const gridRow = row as VwcDataGridRowElement;
	clickResult.value = `${gridCell.textContent} Col #${gridCell.gridColumn}, Row Index${gridRow.rowIndex}${isHeaderCell ? ': Grid Header Cell' : ''}`;
}
</script>

<template>
	<VDataGrid class="data-grid" :column-definitions="columnDefinitions" :rows-data="rowsData" @cell-click="onCellClick" />
	<br />
	<div>
		Cell Clicked: <span id="click-result">{{ clickResult }}</span>
	</div>
</template>
```

{% endraw %}

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

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

</vwc-tab-panel>
</vwc-tabs>

## Rows Data

Use the `rowsData` property to provide the component with the data (an `array` or `objects`) to be displayed.
If not used in conjuction with [column defintions](#columndefinitions) (`title`), text displayed in the column headers will be the data keys of the object.

<vwc-note connotation="warning">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `rowsData` property provides an alternative way to populate the data grid with content.

However, we recommend using the [Data Grid Row](#data-grid-row) and [Data Grid Cell](#data-grid-cell) sub-components to construct the content declaratively. This approach offers greater flexibility, allowing you to incorporate non-text-based elements such as other components or HTML elements (see [Select in grid](components/data-grid/use-cases/#select-in-a-grid) use case).

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDataGrid } from '@vonage/vivid-vue';

const rowsData = [
	{ data1: 'data11', data2: 'data12' },
	{ data1: 'data21', data2: 'data22' },
];
</script>

<template>
	<VDataGrid class="data-grid" :rows-data="rowsData" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

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

</vwc-tab-panel>
</vwc-tabs>

### Column Definitions

Use the `columnDefinitions` property to programmatically configure the column headers that are generated when using `rows-data`. See the [ColumnDefinition interface](#data-grid) for more information.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>

The sortable feature doesn't actually sort the data, it only changes the visual representation of the column header. See the [sorting use case](/components/data-grid/use-cases/#sortable-columns) for more information.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDataGrid } from '@vonage/vivid-vue';

const columnDefinitions = [
	{
		columnDataKey: 'data1',
		title: 'Custom Title 1',
		sortable: true,
		sortDirection: 'ascending',
	},
	{ columnDataKey: 'data2', title: 'Custom Title 2', sortable: true },
];

const rowsData = [
	{ data1: 'data11', data2: 'data12' },
	{ data1: 'data21', data2: 'data22' },
];
</script>

<template>
	<VDataGrid :column-definitions="columnDefinitions" :rows-data="rowsData" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

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

</vwc-tab-panel>
</vwc-tabs>

### Generate Header

Use the `generate-header` property to programmatically define the type of grid header that is generated when using `rows-data`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { ref } from 'vue';
import { VSelect, VOption, VDataGrid, type VProps } from '@vonage/vivid-vue';

const generateHeader = ref<VProps['VDataGrid']['generateHeader']>('default');

const rowsData = [
	{ data1: 'data111', data2: 'data12' },
	{ data1: 'data21', data2: 'data22' },
	{ data1: 'data31', data2: 'data32' },
	{ data1: 'data41', data2: 'data42' },
	{ data1: 'data51', data2: 'data52' },
	{ data1: 'data61', data2: 'data62' },
];
</script>

<template>
	<VSelect v-model="generateHeader">
		<VOption value="default" text="default" />
		<VOption value="sticky" text="sticky" />
		<VOption value="none" text="none" />
	</VSelect>

	<VDataGrid class="data-grid" :rows-data="rowsData" :generate-header="generateHeader" />
</template>

<style scoped>
.data-grid {
	max-block-size: 300px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

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

</vwc-tab-panel>
</vwc-tabs>

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
	grid.headerCellItemTemplate = html`<div>All header cells will look like me!</div>`;
	grid.rowsData = [
		{ data1: 'data11', data2: 'data12' },
		{ data1: 'data21', data2: 'data22' },
	];
</script>
```

### Row Element Tag

Use the `rowElementTag` to set the element tag for header row cells. If not set, the default tag `vwc-data-grid-cell` will be used.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDataGrid } from '@vonage/vivid-vue';

const rowsData = [
	{ data1: 'data11', data2: 'data12' },
	{ data1: 'data21', data2: 'data22' },
];
</script>

<template>
	<VDataGrid :rows-data="rowsData" row-element-tag="div" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

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

</vwc-tab-panel>
</vwc-tabs>

## CSS Variables

### Row Background

When Row is set to sticky there's a default canvas background-color.  
Use `--data-grid-row-background` to change the sticky row background-color.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDataGrid } from '@vonage/vivid-vue';

const rowsData = [
	{ data1: 'data111', data2: 'data12' },
	{ data1: 'data21', data2: 'data22' },
	{ data1: 'data31', data2: 'data32' },
	{ data1: 'data41', data2: 'data42' },
	{ data1: 'data51', data2: 'data52' },
	{ data1: 'data61', data2: 'data62' },
];
</script>

<template>
	<VDataGrid class="data-grid" :rows-data="rowsData" generate-header="sticky" />
</template>

<style scoped>
.data-grid {
	--data-grid-row-background: var(--vvd-color-neutral-50);
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

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

</vwc-tab-panel>
</vwc-tabs>

### Cell Background

When a grid has the `fixed-columns` attribute, fixed columns cells have a default canvas background-color.  
Use `--data-grid-cell-background` to overwrite the default background-color.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDataGrid } from '@vonage/vivid-vue';

const rowsData = [
	{
		team: 'Ironhill United',
		played: 5,
		won: 4,
		drawn: 1,
		lost: 0,
		goalsFor: 12,
		goalsAgainst: 4,
		points: 13,
	},
	{
		team: 'Crimson Valley FC',
		played: 5,
		won: 3,
		drawn: 1,
		lost: 1,
		goalsFor: 9,
		goalsAgainst: 6,
		points: 10,
	},
	{
		team: 'Stormridge City',
		played: 5,
		won: 2,
		drawn: 2,
		lost: 1,
		goalsFor: 7,
		goalsAgainst: 5,
		points: 8,
	},
	{
		team: 'Eastbridge Rovers',
		played: 5,
		won: 1,
		drawn: 1,
		lost: 3,
		goalsFor: 5,
		goalsAgainst: 11,
		points: 4,
	},
	{
		team: 'Shadowmere FC',
		played: 5,
		won: 0,
		drawn: 1,
		lost: 4,
		goalsFor: 3,
		goalsAgainst: 10,
		points: 1,
	},
];
</script>

<template>
	<VDataGrid class="data-grid" :rows-data="rowsData" :fixed-columns="1" grid-template-columns="2fr repeat(7, 1fr)" />
</template>

<style scoped>
.data-grid {
	--data-grid-cell-background: var(--vvd-color-neutral-50);
}
:deep([data-vvd-component='data-grid-row']) {
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
<vwc-data-grid class="data-grid"></vwc-data-grid>

<style>
	.data-grid {
		--data-grid-cell-background: var(--vvd-color-neutral-50);
	}
	[data-vvd-component='data-grid-row'] {
		width: 1200px;
		display: block;
		box-sizing: border-box;
	}
</style>

<script>
	const grid = document.querySelector('vwc-data-grid');
	grid.fixedColumns = '1';
	grid.gridTemplateColumns = '2fr repeat(7, 1fr)';
	grid.rowsData = [
		{
			team: 'Ironhill United',
			played: 5,
			won: 4,
			drawn: 1,
			lost: 0,
			goalsFor: 12,
			goalsAgainst: 4,
			points: 13,
		},
		{
			team: 'Crimson Valley FC',
			played: 5,
			won: 3,
			drawn: 1,
			lost: 1,
			goalsFor: 9,
			goalsAgainst: 6,
			points: 10,
		},
		{
			team: 'Stormridge City',
			played: 5,
			won: 2,
			drawn: 2,
			lost: 1,
			goalsFor: 7,
			goalsAgainst: 5,
			points: 8,
		},
		{
			team: 'Eastbridge Rovers',
			played: 5,
			won: 1,
			drawn: 1,
			lost: 3,
			goalsFor: 5,
			goalsAgainst: 11,
			points: 4,
		},
		{
			team: 'Shadowmere FC',
			played: 5,
			won: 0,
			drawn: 1,
			lost: 4,
			goalsFor: 3,
			goalsAgainst: 10,
			points: 1,
		},
	];
</script>
```

</vwc-tab-panel>
</vwc-tabs>

### Block Size

Use `--data-grid-cell-block-size` to change the cell's `block-size`.

By default, header cells have a fixed height while data cells have a dynamic height based on content.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDataGrid, VDataGridCell, VDataGridRow } from '@vonage/vivid-vue';
</script>

<template>
	<VDataGrid>
		<VDataGridRow row-type="header">
			<VDataGridCell cell-type="columnheader"> Column 1 </VDataGridCell>
		</VDataGridRow>
		<VDataGridRow>
			<VDataGridCell> Dynamic height (default) </VDataGridCell>
		</VDataGridRow>
		<VDataGridRow class="fixed-height">
			<VDataGridCell> Fixed height </VDataGridCell>
		</VDataGridRow>
	</VDataGrid>
</template>

<style scoped>
.fixed-height {
	--data-grid-cell-block-size: 100px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

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

</vwc-tab-panel>
</vwc-tabs>

### White Space

Use `--data-grid-cell-white-space` to change the cell's `white-space`.

By default, header cells will not wrap text (`nowrap`), while data cells will wrap text (`normal`).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDataGrid, VDataGridCell, VDataGridRow } from '@vonage/vivid-vue';
</script>

<template>
	<VDataGrid>
		<VDataGridRow row-type="header">
			<VDataGridCell cell-type="columnheader"> Column 1 </VDataGridCell>
		</VDataGridRow>
		<VDataGridRow>
			<VDataGridCell> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius libero ipsum, ut rhoncus nulla varius sit amet. Vestibulum volutpat feugiat neque eget semper. Nam commodo pharetra lobortis. Sed id enim metus. </VDataGridCell>
		</VDataGridRow>
		<VDataGridRow class="nowrap">
			<VDataGridCell> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius libero ipsum, ut rhoncus nulla varius sit amet. Vestibulum volutpat feugiat neque eget semper. Nam commodo pharetra lobortis. Sed id enim metus. </VDataGridCell>
		</VDataGridRow>
	</VDataGrid>
</template>

<style scoped>
.nowrap {
	--data-grid-cell-white-space: nowrap;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-data-grid>
	<vwc-data-grid-row row-type="header">
		<vwc-data-grid-cell cell-type="columnheader"> Column 1 </vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius libero ipsum, ut rhoncus nulla varius sit amet. Vestibulum volutpat feugiat neque eget semper. Nam commodo pharetra lobortis. Sed id enim metus. </vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row class="nowrap">
		<vwc-data-grid-cell> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius libero ipsum, ut rhoncus nulla varius sit amet. Vestibulum volutpat feugiat neque eget semper. Nam commodo pharetra lobortis. Sed id enim metus. </vwc-data-grid-cell>
	</vwc-data-grid-row>
</vwc-data-grid>

<style>
	.nowrap {
		--data-grid-cell-white-space: nowrap;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Data Grid

#### Properties

<div class="table-wrapper">

| Name                       | Type                                                                 | Description                                                            |
| -------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **cellItemTemplate**       | `ViewTemplate`                                                       | Templete to use when rendering cells                                   |
| **columnDefinitions**      | `ColumnDefinition[]`                                                 | Configure the grid header columns                                      |
| **focusColumnIndex**       | `number`                                                             | Index of column to be focused on when the Data Grid receives focus     |
| **focusRowIndex**          | `number`                                                             | Index of row to be focused on when the Data Grid receives focus        |
| **generateHeader**         | enum: `default`, `sticky`, `none`                                    | Type of header to be generated                                         |
| **headerCellItemTemplate** | `ViewTemplate`                                                       | Templete to use when rendering grid header cells                       |
| **grid-template-columns**  | `string`                                                             | Sets the width of the columns                                          |
| **no-tabbing**             | `boolean`                                                            | Remove the grid from the tab order                                     |
| **rowsData**               | `object[]`                                                           | Content of the grid in data format                                     |
| **rowElementTag**          | `string`                                                             | Element tag for header rows                                            |
| **rowItemTemplate**        | `ViewTemplate`                                                       | Templete to use when rendering rows                                    |
| **selection-mode**         | enum: `none`, `single-row`, `multi-row`, `single-cell`, `multi-cell` | Set the selection mode                                                 |
| **fixed-columns**          | `number`                                                             | Sets the number of columns fixed to the left when horizontal scrolling |

</div>

#### Interfaces

##### ColumnDefinition

<div class="table-wrapper">

| Name                            | Type                                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `columnDataKey`                 | `string`                                                             | The property from which the data of the column is taken from                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
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

| Name             | Type                                      | Description                   |
| ---------------- | ----------------------------------------- | ----------------------------- |
| `selected`       | `true`, `false`                           | Selected state of cell        |
| `sort-direction` | `ascending`, `decending`, `none`, `other` | Sort state of the header cell |

</div>

#### Events

<div class="table-wrapper">

| Name           | Type                                                                                               | Bubbles | Composed | Description                                                                   |
| -------------- | -------------------------------------------------------------------------------------------------- | ------- | -------- | ----------------------------------------------------------------------------- |
| `cell-focused` | `CustomEvent<HTMLElement>`                                                                         | Yes     | Yes      | Fires a custom 'cell-focused' event when focus is on the cell or its contents |
| `sort`         | `CustomEvent<{columnDataKey: string, ariaSort: string \| null, sortDirection: string \| null}>`    | Yes     | Yes      | Event that fires when a sortable column header is clicked                     |
| `cell-click`   | `CustomEvent<{cell: HTMLElement, row: HTMLElement, isHeaderCell: boolean, columnDataKey: string}>` | Yes     | Yes      | Event that fires when a cell is clicked                                       |

</div>
