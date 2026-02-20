## Select In a Grid

In order for the select popup to show correctly in the grid, use the `fixed-dropdown` attribute on the select inside grid cells.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDataGrid, VDataGridCell, VDataGridRow, VOption, VSelect } from '@vonage/vivid-vue';
</script>

<template>
	<VDataGrid class="data-grid">
		<VDataGridRow class="header" row-type="header">
			<VDataGridCell cell-type="columnheader"> data1 </VDataGridCell>
			<VDataGridCell cell-type="columnheader"> data2 </VDataGridCell>
		</VDataGridRow>
		<VDataGridRow>
			<VDataGridCell>
				<VSelect fixed-dropdown>
					<VOption value="1" text="Data 1" />
					<VOption value="2" text="Data 2" />
				</VSelect>
			</VDataGridCell>
			<VDataGridCell>Cell 2</VDataGridCell>
		</VDataGridRow>
		<VDataGridRow>
			<VDataGridCell>
				<VSelect fixed-dropdown>
					<VOption value="1" text="Data 1" />
					<VOption value="2" text="Data 2" />
				</VSelect>
			</VDataGridCell>
			<VDataGridCell>Cell 2</VDataGridCell>
		</VDataGridRow>
	</VDataGrid>
</template>

<style scoped>
.data-grid {
	--data-grid-cell-block-size: 100%;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-data-grid class="data-grid">
	<vwc-data-grid-row class="header" row-type="header">
		<vwc-data-grid-cell cell-type="columnheader"> data1 </vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader"> data2 </vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>
			<vwc-select fixed-dropdown>
				<vwc-option value="1" text="Data 1"></vwc-option>
				<vwc-option value="2" text="Data 2"></vwc-option>
			</vwc-select>
		</vwc-data-grid-cell>
		<vwc-data-grid-cell>Cell 2</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>
			<vwc-select fixed-dropdown>
				<vwc-option value="1" text="Data 1"></vwc-option>
				<vwc-option value="2" text="Data 2"></vwc-option>
			</vwc-select>
		</vwc-data-grid-cell>
		<vwc-data-grid-cell>Cell 2</vwc-data-grid-cell>
	</vwc-data-grid-row>
</vwc-data-grid>

<style>
	.data-grid {
		--data-grid-cell-block-size: 100%;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Sortable Columns

In order for a grid column to show as sortable, use the `sort-direction` attribute on the sortable column header.

Here's an example of sorting when building the grid manually:

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

{% raw %}

```vue preview
<script setup lang="ts">
import { ref, computed } from 'vue';
import { VDataGrid, VDataGridRow, VDataGridCell, type VEvents, type VProps } from '@vonage/vivid-vue';

const data = [
	{ data1: '111', data2: '312' },
	{ data1: '211', data2: '212' },
	{ data1: '311', data2: '112' },
	{ data1: '411', data2: '612' },
	{ data1: '511', data2: '512' },
	{ data1: '611', data2: '412' },
];

const sortDirection = ref<VProps['VDataGridCell']['sortDirection']>('none');

const sortedData = computed(() => {
	if (sortDirection.value === 'none') return data;
	return [...data].sort((a, b) => {
		if (sortDirection.value === 'ascending') {
			return a.data2 > b.data2 ? 1 : -1;
		}
		return a.data2 < b.data2 ? 1 : -1;
	});
});

function onSort(e: VEvents['VDataGridCell']['sort']) {
	if (e.detail.sortDirection === 'ascending') {
		sortDirection.value = 'descending';
	} else if (e.detail.sortDirection === 'descending') {
		sortDirection.value = 'none';
	} else {
		sortDirection.value = 'ascending';
	}
}
</script>

<template>
	<VDataGrid class="data-grid">
		<VDataGridRow row-type="header">
			<VDataGridCell cell-type="columnheader">Not Sortable</VDataGridCell>
			<VDataGridCell cell-type="columnheader" :sort-direction="sortDirection" @sort="onSort"> Sortable </VDataGridCell>
		</VDataGridRow>
		<VDataGridRow v-for="(entry, index) in sortedData" :key="index">
			<VDataGridCell>{{ entry.data1 }}</VDataGridCell>
			<VDataGridCell>{{ entry.data2 }}</VDataGridCell>
		</VDataGridRow>
	</VDataGrid>
</template>
```

{% endraw %}

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-data-grid class="data-grid">
	<vwc-data-grid-row row-type="header">
		<vwc-data-grid-cell cell-type="columnheader"> Not Sortable </vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader" sort-direction="none"> Sortable <vwc-menu placement="bottom-start" slot="filter">
				<vwc-button slot="anchor" aria-label="Filter Data 1 column" size="condensed" icon="filter-line"></vwc-button>
				<vwc-menu-item control-type="checkbox" text="Checkbox 1"></vwc-menu-item>
				<vwc-menu-item control-type="checkbox" text="Checkbox 2"></vwc-menu-item>
				<vwc-menu-item control-type="checkbox" text="Checkbox 3"></vwc-menu-item>
				<vwc-menu-item control-type="checkbox" text="Checkbox 4"></vwc-menu-item>
				<vwc-button slot="action-items" size="condensed" appearance="outlined" label="Close"></vwc-button>
				<vwc-button slot="action-items" size="condensed" appearance="filled" label="Apply filter"></vwc-button>
			</vwc-menu></vwc-data-grid-cell>
	</vwc-data-grid-row>
</vwc-data-grid>

<script>
	const grid = document.querySelector('.data-grid');

	data = [
		{ data1: '111', data2: '312' },
		{ data1: '211', data2: '212' },
		{ data1: '311', data2: '112' },
		{ data1: '411', data2: '612' },
		{ data1: '511', data2: '512' },
		{ data1: '611', data2: '412' },
	];

	gridRowForEntry = new Map(
		data.map((entry) => {
			const gridRow = document.createElement('vwc-data-grid-row');
			gridRow.innerHTML = `
			<vwc-data-grid-cell>
				${entry.data1}
			</vwc-data-grid-cell>
			<vwc-data-grid-cell>
				${entry.data2}
			</vwc-data-grid-cell>
		`;
			return [entry, gridRow];
		})
	);

	compare = (sortDirection) => (a, b) => {
		const nameA = a.data2;
		const nameB = b.data2;

		if (sortDirection === 'none') return 0;
		if (sortDirection === 'ascending') {
			return nameA > nameB ? 1 : -1;
		} else {
			return nameA < nameB ? 1 : -1;
		}
		return 0;
	};

	function renderData(sortDirection = 'none') {
		const sortedData = Array.from(data).sort(compare(sortDirection));
		for (const entry of sortedData) {
			grid.appendChild(gridRowForEntry.get(entry));
		}
	}

	renderData();

	grid.addEventListener('sort', (event) => {
		const { detail, target } = event;
		console.log(detail);
		if (detail.sortDirection === 'ascending') {
			target.sortDirection = 'descending';
		} else if (detail.sortDirection === 'descending') {
			target.sortDirection = 'none';
		} else {
			target.sortDirection = 'ascending';
		}
		renderData(target.sortDirection);
	});
</script>
```

</vwc-tab-panel>
</vwc-tabs>

Here's an example of sorting the data-grid when building it with `rowsData`:

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { ref, computed } from 'vue';
import { VDataGrid, type VEvents } from '@vonage/vivid-vue';
import type { VwcDataGridCellElement } from '@vonage/vivid';

type SortDirection = 'none' | 'ascending' | 'descending';

interface ColumnDef {
	columnDataKey: string;
	title: string;
	sortable?: boolean;
	sortDirection?: SortDirection;
}

const data = [
	{ data1: 'data111', data2: 'data12' },
	{ data1: 'data21', data2: 'data22' },
	{ data1: 'data31', data2: 'data32' },
	{ data1: 'data41', data2: 'data42' },
	{ data1: 'data51', data2: 'data52' },
	{ data1: 'data61', data2: 'data62' },
];

const columnDefinitions = ref<ColumnDef[]>([
	{ columnDataKey: 'data1', title: 'Not Sortable' },
	{ columnDataKey: 'data2', title: 'Sortable', sortable: true },
]);

const sortedColumn = ref<string | null>(null);
const sortDirection = ref<SortDirection>('none');

const rowsData = computed(() => {
	if (!sortedColumn.value || sortDirection.value === 'none') return data;
	return [...data].sort((a, b) => {
		const key = sortedColumn.value as keyof (typeof data)[0];
		if (sortDirection.value === 'ascending') {
			return a[key] > b[key] ? 1 : -1;
		}
		return a[key] < b[key] ? 1 : -1;
	});
});

function onSort(e: VEvents['VDataGrid']['cell-click']) {
	const cell = e.detail.cell as VwcDataGridCellElement;
	const columnDef = cell.columnDefinition as ColumnDef;
	if (!columnDef?.sortable) return;

	const currentDirection = columnDef.sortDirection ?? 'none';
	const newDirection: SortDirection = currentDirection === 'ascending' ? 'descending' : currentDirection === 'descending' ? 'none' : 'ascending';

	columnDefinitions.value = columnDefinitions.value.map((col) => ({
		...col,
		sortDirection: col.columnDataKey === columnDef.columnDataKey ? newDirection : 'none',
	}));

	sortedColumn.value = columnDef.columnDataKey;
	sortDirection.value = newDirection;
}
</script>

<template>
	<VDataGrid class="data-grid" generate-header="sticky" :rows-data="rowsData" :column-definitions="columnDefinitions" @cell-click="onSort" />
</template>

<style scoped>
.data-grid {
	max-block-size: 200px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-data-grid class="data-grid"></vwc-data-grid>

<script>
	const grid = document.querySelector('.data-grid');
	grid.generateHeader = 'sticky';
	const data = [
		{ data1: 'data111', data2: 'data12' },
		{ data1: 'data21', data2: 'data22' },
		{ data1: 'data31', data2: 'data32' },
		{ data1: 'data41', data2: 'data42' },
		{ data1: 'data51', data2: 'data52' },
		{ data1: 'data61', data2: 'data62' },
	];
	grid.rowsData = Array.from(data);
	grid.columnDefinitions = [
		{ columnDataKey: 'data1', title: 'Not Sortable' },
		{ columnDataKey: 'data2', title: 'Sortable', sortable: true },
	];
	grid.addEventListener('sort', (e) => {
		console.log(e.detail);
		const sortedColumnHeaderDef = e.target.columnDefinition;

		grid.columnDefinitions.forEach((column) => {
			if (column.columnDataKey !== sortedColumnHeaderDef.columnDataKey) {
				column.sortDirection = 'none';
				return;
			}
			column.sortDirection = e.detail.sortDirection === 'ascending' ? 'descending' : e.detail.sortDirection === 'descending' ? 'none' : 'ascending';
		});

		grid.rowsData = Array.from(data).sort((a, b) => {
			const nameA = a[sortedColumnHeaderDef.columnDataKey];
			const nameB = b[sortedColumnHeaderDef.columnDataKey];

			if (sortedColumnHeaderDef.sortDirection === 'none') return 0;
			if (sortedColumnHeaderDef.sortDirection === 'ascending') {
				return nameA > nameB ? 1 : -1;
			} else {
				return nameA < nameB ? 1 : -1;
			}
			return 0;
		});
	});
</script>

<style>
	.data-grid {
		max-block-size: 200px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Focusable Child Elements

If your cell contains a focusable child element that you would like to delegate focus to, use the `cellFocusTargetCallback` of the column definition to return the child element. It will now take focus instead of the cell.

If you cell contains multiple focusable elements or elements that require arrow keys to operate, combine this will `cellInternalFocusQueue` of the column definition. This will allow users to press Enter or F2 when the cell has focus to move focus into the cell and operate the elements as usual.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDataGrid, VDataGridRow, VDataGridCell, VButton } from '@vonage/vivid-vue';

const singleActionColumnDef = {
	cellFocusTargetCallback: (cell: HTMLElement) => cell.querySelector('vwc-button'),
};

const multipleActionsColumnDef = {
	cellInternalFocusQueue: true,
	cellFocusTargetCallback: (cell: HTMLElement) => cell.querySelector('vwc-button'),
};
</script>

<template>
	<VDataGrid class="data-grid">
		<VDataGridRow row-type="header">
			<VDataGridCell cell-type="columnheader">Column 1</VDataGridCell>
			<VDataGridCell cell-type="columnheader">Column 2</VDataGridCell>
		</VDataGridRow>
		<VDataGridRow>
			<VDataGridCell>Cell 1.1</VDataGridCell>
			<VDataGridCell :column-definition="singleActionColumnDef">
				<VButton appearance="outlined" label="Action 1" connotation="alert" />
			</VDataGridCell>
		</VDataGridRow>
		<VDataGridRow>
			<VDataGridCell>Cell 2.1</VDataGridCell>
			<VDataGridCell :column-definition="multipleActionsColumnDef">
				<VButton appearance="outlined" label="Action 1" connotation="alert" />
				<VButton appearance="outlined" label="Action 2" connotation="success" />
			</VDataGridCell>
		</VDataGridRow>
	</VDataGrid>
</template>

<style scoped>
.data-grid {
	--data-grid-cell-block-size: 100%;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-data-grid class="data-grid">
	<vwc-data-grid-row row-type="header">
		<vwc-data-grid-cell cell-type="columnheader"> Column 1 </vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader"> Column 2 </vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell> Cell 1.1 </vwc-data-grid-cell>
		<vwc-data-grid-cell id="single-action">
			<vwc-button appearance="outlined" label="Action 1" connotation="alert"></vwc-button>
		</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell> Cell 2.1 </vwc-data-grid-cell>
		<vwc-data-grid-cell id="multiple-actions">
			<vwc-button appearance="outlined" label="Action 1" connotation="alert"></vwc-button>
			<vwc-button appearance="outlined" label="Action 2" connotation="success"></vwc-button>
		</vwc-data-grid-cell>
	</vwc-data-grid-row>
</vwc-data-grid>

<script>
	document.querySelector('#single-action').columnDefinition = {
		cellFocusTargetCallback: (cell) => cell.querySelector('vwc-button'),
	};
	document.querySelector('#multiple-actions').columnDefinition = {
		cellInternalFocusQueue: true,
		cellFocusTargetCallback: (cell) => cell.querySelector('vwc-button'),
	};
</script>

<style>
	vwc-data-grid {
		--data-grid-cell-block-size: 100%;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Add and Remove Rows Dynamically

You can add and remove rows dynamically by manipulating the `rowsData`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { ref } from 'vue';
import { VButton, VDataGrid } from '@vonage/vivid-vue';

let count = 1;

const rowsData = ref([
	{ data1: 'data11', data2: 'data12' },
	{ data1: 'data21', data2: 'data22' },
	{ data1: 'data31', data2: 'data32' },
]);
count = 4;

function push() {
	rowsData.value.push({
		data1: `data${count}1`,
		data2: `data${count}2`,
	});
	count++;
}

function pop() {
	rowsData.value.pop();
}

function shift() {
	rowsData.value.shift();
}
</script>

<template>
	<VButton label="Add item" appearance="outlined" @click="push" />
	<VButton label="Remove last item" appearance="outlined" @click="pop" />
	<VButton label="Remove first item" appearance="outlined" @click="shift" />
	<VDataGrid class="data-grid" selection-mode="single-row" generate-header="sticky" :rows-data="rowsData" />
</template>

<style scoped>
.data-grid {
	max-block-size: 200px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-button label="Add item" appearance="outlined" onclick="push()"></vwc-button>
<vwc-button label="Remove last item" appearance="outlined" onclick="pop()"></vwc-button>
<vwc-button label="Remove first item" appearance="outlined" onclick="shift()"></vwc-button>
<vwc-data-grid selection-mode="single-row" class="data-grid"></vwc-data-grid>

<script>
	let count = 1;
	const grid = document.querySelector('.data-grid');
	grid.rowsData = [];
	grid.generateHeader = 'sticky';

	for (let i = 0; i < 3; i++) {
		push();
	}

	function push() {
		grid.rowsData.push({
			data1: `data${count}1`,
			data2: `data${count}2`,
		});
		count++;
	}

	function pop() {
		grid.rowsData.pop();
	}

	function shift() {
		grid.rowsData.shift();
	}
</script>

<style>
	.data-grid {
		max-block-size: 200px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Selectable cells and rows

Data grid supports selecting cells and rows by setting `selection-mode` attribute to one of `single-row`, `multi-row`, `single-cell` or `multi-cell`. If you want to turn off selection, set it to `none` or remove the attribute.

### Single row

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDataGrid } from '@vonage/vivid-vue';

const rowsData = [
	{ id: 1, firstName: 'Bearnard', lastName: 'McCrudden' },
	{ id: 2, firstName: 'Hewet', lastName: 'Luxen' },
	{ id: 3, firstName: 'Rurik', lastName: 'Van Waadenburg' },
];
</script>

<template>
	<VDataGrid selection-mode="single-row" :rows-data="rowsData" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-data-grid selection-mode="single-row" id="data-grid-selection-single-row"></vwc-data-grid>
<script>
	const grid = document.getElementById('data-grid-selection-single-row');

	grid.rowsData = [
		{
			id: 1,
			firstName: 'Bearnard',
			lastName: 'McCrudden',
		},
		{
			id: 2,
			firstName: 'Hewet',
			lastName: 'Luxen',
		},
		{
			id: 3,
			firstName: 'Rurik',
			lastName: 'Van Waadenburg',
		},
	];
</script>
```

</vwc-tab-panel>
</vwc-tabs>

### Multiple rows

Use a control / command key to select multiple rows.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDataGrid } from '@vonage/vivid-vue';

const rowsData = [
	{ id: 1, first_name: 'Gussy', last_name: 'Waszczykowski' },
	{ id: 2, first_name: 'Joseito', last_name: 'Laxe' },
	{ id: 3, first_name: 'Ryann', last_name: 'Enrietto' },
];
</script>

<template>
	<VDataGrid selection-mode="multi-row" :rows-data="rowsData" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-data-grid selection-mode="multi-row" id="data-grid-selection-multi-row"></vwc-data-grid>
<script>
	const grid = document.getElementById('data-grid-selection-multi-row');

	grid.rowsData = [
		{
			id: 1,
			first_name: 'Gussy',
			last_name: 'Waszczykowski',
		},
		{
			id: 2,
			first_name: 'Joseito',
			last_name: 'Laxe',
		},
		{
			id: 3,
			first_name: 'Ryann',
			last_name: 'Enrietto',
		},
	];
</script>
```

</vwc-tab-panel>
</vwc-tabs>

### Single cell

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDataGrid } from '@vonage/vivid-vue';

const rowsData = [
	{ id: 1, first_name: 'Roman', last_name: 'Cossem' },
	{ id: 2, first_name: 'Mac', last_name: 'Cawkwell' },
	{ id: 3, first_name: 'Goddart', last_name: 'Hemphall' },
];
</script>

<template>
	<VDataGrid selection-mode="single-cell" :rows-data="rowsData" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-data-grid selection-mode="single-cell" id="data-grid-selection-single-cell"></vwc-data-grid>
<script>
	const grid = document.getElementById('data-grid-selection-single-cell');

	grid.rowsData = [
		{
			id: 1,
			first_name: 'Roman',
			last_name: 'Cossem',
		},
		{
			id: 2,
			first_name: 'Mac',
			last_name: 'Cawkwell',
		},
		{
			id: 3,
			first_name: 'Goddart',
			last_name: 'Hemphall',
		},
	];
</script>
```

</vwc-tab-panel>
</vwc-tabs>

### Multiple cells

Use a control / command key to select multiple rows.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDataGrid } from '@vonage/vivid-vue';

const rowsData = [
	{ id: 1, first_name: 'Haydon', last_name: 'Patrone' },
	{ id: 2, first_name: 'Corella', last_name: 'Northrop' },
	{ id: 3, first_name: 'Jorie', last_name: 'Gosnoll' },
];
</script>

<template>
	<VDataGrid selection-mode="multi-cell" :rows-data="rowsData" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-data-grid selection-mode="multi-cell" id="data-grid-selection-multi-cell"></vwc-data-grid>
<script>
	const grid = document.getElementById('data-grid-selection-multi-cell');

	grid.rowsData = [
		{
			id: 1,
			first_name: 'Haydon',
			last_name: 'Patrone',
		},
		{
			id: 2,
			first_name: 'Corella',
			last_name: 'Northrop',
		},
		{
			id: 3,
			first_name: 'Jorie',
			last_name: 'Gosnoll',
		},
	];
</script>
```

</vwc-tab-panel>
</vwc-tabs>
