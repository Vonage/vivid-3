## Constructing Tables

Tables can be built using the following components: `table`, `table-head`, `table-body`, `table-row`, `table-cell`, and `table-header-cell`. They work together in the same way as native HTML table elements.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>

    The Table provides a consistent, accessible structure and styling. All data handling and interaction behaviour (such as sorting, filtering, or selection) is owned by the consuming application. As the component evolves, we will introduce recommended patterns and examples for common interaction behaviours and incrementally add complexity where appropriate.

</vwc-note>

<br />

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<template>
	<VTable>
		<VTableHead>
			<VTableRow>
				<VTableHeaderCell>Component</VTableHeaderCell>
				<VTableHeaderCell>HTML equivalent</VTableHeaderCell>
				<VTableHeaderCell>Description</VTableHeaderCell>
			</VTableRow>
		</VTableHead>
		<VTableBody>
			<VTableRow>
				<VTableHeaderCell>Table</VTableHeaderCell>
				<VTableCell>table</VTableCell>
				<VTableCell>Represents tabular data</VTableCell>
			</VTableRow>
			<VTableRow>
				<VTableHeaderCell>Table Head</VTableHeaderCell>
				<VTableCell>thead</VTableCell>
				<VTableCell>Encapsulates a set of table rows, indicating that they comprise the head of a table with information about the table's columns</VTableCell>
			</VTableRow>
			<VTableRow>
				<VTableHeaderCell>Table Body</VTableHeaderCell>
				<VTableCell>tbody</VTableCell>
				<VTableCell>Encapsulates a set of table rows, indicating that they comprise the body of a table's (main) data</VTableCell>
			</VTableRow>
			<VTableRow>
				<VTableHeaderCell>Table Row</VTableHeaderCell>
				<VTableCell>tr</VTableCell>
				<VTableCell>Defines a row of cells in a table</VTableCell>
			</VTableRow>
			<VTableRow>
				<VTableHeaderCell>Table Cell</VTableHeaderCell>
				<VTableCell>td</VTableCell>
				<VTableCell>Defines a cell of a table that contains data</VTableCell>
			</VTableRow>
			<VTableRow>
				<VTableHeaderCell>Table Header Cell</VTableHeaderCell>
				<VTableCell>th</VTableCell>
				<VTableCell>Defines a cell as the header of a group of table cells</VTableCell>
			</VTableRow>
		</VTableBody>
	</VTable>
</template>

<script setup lang="ts">
import { VTable, VTableBody, VTableCell, VTableHead, VTableHeaderCell, VTableRow } from '@vonage/vivid-vue';
</script>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-table>
		<vwc-table-head>
			<vwc-table-row>
				<vwc-table-header-cell>Component</vwc-table-header-cell>
				<vwc-table-header-cell>HTML equivalent</vwc-table-header-cell>
				<vwc-table-header-cell>Description</vwc-table-header-cell>
			</vwc-table-row>
		</vwc-table-head>
		<vwc-table-body>
			<vwc-table-row>
				<vwc-table-header-cell>Table</vwc-table-header-cell>
				<vwc-table-cell>table</vwc-table-cell>
				<vwc-table-cell>Represents tabular data</vwc-table-cell>
			</vwc-table-row>
			<vwc-table-row>
				<vwc-table-header-cell>Table Head</vwc-table-header-cell>
				<vwc-table-cell>thead</vwc-table-cell>
				<vwc-table-cell>Encapsulates a set of table rows, indicating that they comprise the head of a table with information about the table's columns</vwc-table-cell>
			</vwc-table-row>
			<vwc-table-row>
				<vwc-table-header-cell>Table Body</vwc-table-header-cell>
				<vwc-table-cell>tbody</vwc-table-cell>
				<vwc-table-cell>Encapsulates a set of table rows, indicating that they comprise the body of a table's (main) data</vwc-table-cell>
			</vwc-table-row>
			<vwc-table-row>
				<vwc-table-header-cell>Table Row</vwc-table-header-cell>
				<vwc-table-cell>tr</vwc-table-cell>
				<vwc-table-cell>Defines a row of cells in a table</vwc-table-cell>
			</vwc-table-row>
			<vwc-table-row>
				<vwc-table-header-cell>Table Cell</vwc-table-header-cell>
				<vwc-table-cell>td</vwc-table-cell>
				<vwc-table-cell>Defines a cell of a table that contains data</vwc-table-cell>
			</vwc-table-row>
			<vwc-table-row>
				<vwc-table-header-cell>Table Header Cell</vwc-table-header-cell>
				<vwc-table-cell>th</vwc-table-cell>
				<vwc-table-cell>Defines a cell as the header of a group of table cells</vwc-table-cell>
			</vwc-table-row>
		</Vvwc-table-body>
	</vwc-table>
```

</vwc-tab-panel>
</vwc-tabs>

## Setting Column Widths

Column widths are controlled using CSS, by applying `width` or `min-width` to column header cells.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<template>
	<VTable>
		<VTableHead>
			<VTableRow>
				<VTableHeaderCell class="col1">Code</VTableHeaderCell>
				<VTableHeaderCell class="col2">Status</VTableHeaderCell>
				<VTableHeaderCell class="col3">Description</VTableHeaderCell>
			</VTableRow>
		</VTableHead>
		<VTableBody>
			<VTableRow>
				<VTableCell>VIV-3024</VTableCell>
				<VTableCell>Open</VTableCell>
				<VTableCell>Styles: support italic text</VTableCell>
			</VTableRow>
		</VTableBody>
	</VTable>
</template>

<style scoped>
.col1 {
	width: 100px;
}

.col2 {
	width: 150px;
}
</style>

<script setup lang="ts">
import { VButton, VTable, VTableBody, VTableCell, VTableHead, VTableHeaderCell, VTableRow } from '@vonage/vivid-vue';
</script>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 400px
<vwc-table>
	<vwc-table-head>
		<vwc-table-row>
			<vwc-table-header-cell class="col1">Code</vwc-table-header-cell>
			<vwc-table-header-cell class="col2">Status</vwc-table-header-cell>
			<vwc-table-header-cell class="col3">Description</vwc-table-header-cell>
		</vwc-table-row>
	</vwc-table-head>
	<vwc-table-body>
		<vwc-table-row>
			<vwc-table-cell>VIV-3024</vwc-table-cell>
			<vwc-table-cell>Open</vwc-table-cell>
			<vwc-table-cell>Styles: support italic text</vwc-table-cell>
		</vwc-table-row>
	</vwc-table-body>
</vwc-table>

<style>
	.col1 {
		width: 100px;
	}

	.col2 {
		width: 150px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Partials within cells

Table cells can contain any **Vivid component**, allowing you to compose rich, meaningful rows. [Partials](/components/partials/) (such as Status and Country) are specifically designed to work well within tables, providing compact, scannable information.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<template>
	<VTable>
		<VTableHead>
			<VTableRow>
				<VTableHeaderCell>Status</VTableHeaderCell>
				<VTableHeaderCell>Network code</VTableHeaderCell>
				<VTableHeaderCell>Country</VTableHeaderCell>
				<VTableHeaderCell>Type</VTableHeaderCell>
				<VTableHeaderCell></VTableHeaderCell>
			</VTableRow>
		</VTableHead>
		<VTableBody>
			<VTableRow>
				<VTableCell>
					<VStatus connotation="success" status="Ready" />
				</VTableCell>
				<VTableCell>
					<a href="#">237642973237642973</a>
				</VTableCell>
				<VTableCell>
					<VCountry code="GB" />
				</VTableCell>
				<VTableCell>
					<VBadge text="Positive" icon="check-line" connotation="success" appearance="subtle" shape="pill" />
				</VTableCell>
				<VTableCell class="cell-actions">
					<VButton icon="edit-line" aria-label="Edit" size="condensed" />
					<VButton icon="delete-line" aria-label="Delete" size="condensed" />
				</VTableCell>
			</VTableRow>
			<VTableRow>
				<VTableCell>
					<VStatus connotation="success" status="Ready" />
				</VTableCell>
				<VTableCell>
					<a href="#">237642973237642973</a>
				</VTableCell>
				<VTableCell>
					<VCountry code="NO" />
				</VTableCell>
				<VTableCell>
					<VBadge text="Positive" icon="check-line" connotation="success" appearance="subtle" shape="pill" />
				</VTableCell>
				<VTableCell class="cell-actions">
					<VButton icon="edit-line" aria-label="Edit" size="condensed" />
					<VButton icon="delete-line" aria-label="Delete" size="condensed" />
				</VTableCell>
			</VTableRow>
			<VTableRow>
				<VTableCell>
					<VStatus connotation="success" status="Ready" />
				</VTableCell>
				<VTableCell>
					<a href="#">237642973237642973</a>
				</VTableCell>
				<VTableCell>
					<VCountry code="US" />
				</VTableCell>
				<VTableCell>
					<VBadge text="Positive" icon="check-line" connotation="success" appearance="subtle" shape="pill" />
				</VTableCell>
				<VTableCell class="cell-actions">
					<VButton icon="edit-line" aria-label="Edit" size="condensed" />
					<VButton icon="delete-line" aria-label="Delete" size="condensed" />
				</VTableCell>
			</VTableRow>
		</VTableBody>
	</VTable>
</template>

<style scoped>
.cell-actions {
	text-align: right;
}
</style>

<script setup lang="ts">
import { VBadge, VButton, VCountry, VStatus, VTable, VTableBody, VTableCell, VTableHead, VTableHeaderCell, VTableRow } from '@vonage/vivid-vue';
</script>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-table>
	<vwc-table-head>
		<vwc-table-row>
			<vwc-table-header-cell>Status</vwc-table-header-cell>
			<vwc-table-header-cell>Network code</vwc-table-header-cell>
			<vwc-table-header-cell>Country</vwc-table-header-cell>
			<vwc-table-header-cell>Type</vwc-table-header-cell>
			<vwc-table-header-cell></vwc-table-header-cell>
		</vwc-table-row>
	</vwc-table-head>
	<vwc-table-body>
		<vwc-table-row>
			<vwc-table-cell>
				<vwc-status connotation="success" status="Ready"></vwc-status>
			</vwc-table-cell>
			<vwc-table-cell>
				<a href="#">237642973237642973</a>
			</vwc-table-cell>
			<vwc-table-cell>
				<vwc-country code="GB"></vwc-country>
			</vwc-table-cell>
			<vwc-table-cell>
				<vwc-badge text="Positive" icon="check-line" connotation="success" appearance="subtle" shape="pill"></vwc-badge>
			</vwc-table-cell>
			<vwc-table-cell class="cell-actions">
				<vwc-button icon="edit-line" aria-label="Edit" size="condensed"></vwc-button>
				<vwc-button icon="delete-line" aria-label="Delete" size="condensed"></vwc-button>
			</vwc-table-cell>
		</vwc-table-row>
		<vwc-table-row>
			<vwc-table-cell>
				<vwc-status connotation="success" status="Ready"></vwc-status>
			</vwc-table-cell>
			<vwc-table-cell>
				<a href="#">237642973237642973</a>
			</vwc-table-cell>
			<vwc-table-cell>
				<vwc-country code="NO"></vwc-country>
			</vwc-table-cell>
			<vwc-table-cell>
				<vwc-badge text="Positive" icon="check-line" connotation="success" appearance="subtle" shape="pill"></vwc-badge>
			</vwc-table-cell>
			<vwc-table-cell class="cell-actions">
				<vwc-button icon="edit-line" aria-label="Edit" size="condensed"></vwc-button>
				<vwc-button icon="delete-line" aria-label="Delete" size="condensed"></vwc-button>
			</vwc-table-cell>
		</vwc-table-row>
		<vwc-table-row>
			<vwc-table-cell>
				<vwc-status connotation="success" status="Ready"></vwc-status>
			</vwc-table-cell>
			<vwc-table-cell>
				<a href="#">237642973237642973</a>
			</vwc-table-cell>
			<vwc-table-cell>
				<vwc-country code="US"></vwc-country>
			</vwc-table-cell>
			<vwc-table-cell>
				<vwc-badge text="Positive" icon="check-line" connotation="success" appearance="subtle" shape="pill"></vwc-badge>
			</vwc-table-cell>
			<vwc-table-cell class="cell-actions">
				<vwc-button icon="edit-line" aria-label="Edit" size="condensed"></vwc-button>
				<vwc-button icon="delete-line" aria-label="Delete" size="condensed"></vwc-button>
			</vwc-table-cell>
		</vwc-table-row>
	</vwc-table-body>
</vwc-table>

<style>
	.cell-actions {
		text-align: right;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Sorting

To ensure maximum flexibility and composability, sorting logic is decoupled from the table component. This allows you to implement a sorting strategy tailored to your specific application requirements.

Standard sorting (alphabetical or numerical) is straightforward, but real-world tables often require complex, custom strategies. Additionally, data handling varies between **client-side** processing and **server-side** requests. A built-in mechanism would be too rigid to support these diverse use cases.

This is why we provide the `vwc-table-sorting-button` as a visual-only component. It handles the UI affordances - the button and direction indicators - without enforcing any logic.

- When clicked, it emits a `sort` event to trigger your custom logic.
- The component updates its own direction state by default. To manage the state externally, you can intercept this by calling `event.preventDefault()` (or using Vue’s `@sort.prevent` modifier).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts" type="module">
import { VTableSortingButton } from '@vonage/vivid-vue';
</script>
<template>
	<VTableSortingButton />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-table-sorting-button></vwc-table-sorting-button>
```

</vwc-tab-panel>
</vwc-tabs>

Below are some examples of how you might implement sorting logic in your application, using the `vwc-table-sorting-button` to trigger sorting actions. These examples are not exhaustive, but they demonstrate how you can use the sorting button in conjunction with your own sorting logic, whether it's a simple vanila js sorting or more complex using headless mechanisms.

<vwc-tabs gutters="none">
<vwc-tab label="Vue + Vanilla JS sort"></vwc-tab>
<vwc-tab-panel>

Below example performs sorting using native JavaScript array sorting, without any additional libraries. Custom sorting functions are provided for each column, and the current sort state is managed using Vue's reactivity system.

```vue preview
{% raw %}
<script setup lang="ts" type="module">
import { ref } from 'vue';
import { VTable, VTableBody, VTableCell, VTableHead, VTableHeaderCell, VTableRow, VTableSortingButton } from '@vonage/vivid-vue';

const data = ref([
	{ id: 1, name: 'Bob', date: '2026-02-15', status: 'Pending' },
	{ id: 2, name: 'David', date: '2026-01-20', status: 'Active' },
	{ id: 3, name: 'Eve', date: '2026-02-05', status: 'Pending' },
	{ id: 4, name: 'Charlie', date: '2026-03-10', status: 'Inactive' },
	{ id: 5, name: 'Frank', date: '2026-03-25', status: 'Inactive' },
	{ id: 6, name: 'Ada', date: '2026-01-01', status: 'Active' },
]);

const sortState = ref({
	column: null,
	direction: 'asc',
});

const byName = (a, b) => {
	return a.name.localeCompare(b.name);
};

const byDate = (a, b) => {
	const dateA = new Date(a.date).getTime();
	const dateB = new Date(b.date).getTime();

	return dateA - dateB;
};

const byStatus = (a, b) => {
	const statusOrder = ['Active', 'Pending', 'Inactive'];

	const aIndex = statusOrder.indexOf(a.status);
	const bIndex = statusOrder.indexOf(b.status);

	return aIndex - bIndex;
};

function toggleSort(column, direction) {
	sortState.value = { column, direction };

	let comparator = byName;
	if (column === 'date') comparator = byDate;
	if (column === 'status') comparator = byStatus;

	const sorted = data.value.toSorted(comparator);
	data.value = direction === 'asc' ? sorted : sorted.toReversed();
}

function sortDirection(columnId) {
	return sortState.value.column === columnId ? sortState.value.direction : undefined;
}
</script>

<template>
	<VTable>
		<VTableHead>
			<VTableRow>
				<VTableHeaderCell>
					Name
					<VTableSortingButton :direction="sortDirection('name')" @sort="(event) => toggleSort('name', event.detail)" />
				</VTableHeaderCell>
				<VTableHeaderCell>
					Date
					<VTableSortingButton :direction="sortDirection('date')" @sort="(event) => toggleSort('date', event.detail)" />
				</VTableHeaderCell>
				<VTableHeaderCell>
					Status
					<VTableSortingButton :direction="sortDirection('status')" @sort="(event) => toggleSort('status', event.detail)" />
				</VTableHeaderCell>
			</VTableRow>
		</VTableHead>
		<VTableBody>
			<VTableRow v-for="row in data" :key="row.id">
				<VTableCell>{{ row.name }}</VTableCell>
				<VTableCell>{{ row.date }}</VTableCell>
				<VTableCell>{{ row.status }}</VTableCell>
			</VTableRow>
		</VTableBody>
	</VTable>
</template>
{% endraw %}
```

</vwc-tab-panel>
<vwc-tab label="Vue + fast-sort"></vwc-tab>
<vwc-tab-panel>

Below example uses the `fast-sort` library to perform sorting.

```vue preview
{% raw %}
<script setup lang="ts" type="module">
import { ref } from 'vue';
import { VTable, VTableBody, VTableCell, VTableHead, VTableHeaderCell, VTableRow, VTableSortingButton } from '@vonage/vivid-vue';
import { createNewSortInstance } from 'https://esm.sh/fast-sort@3.4.1';

const data = ref([
	{ id: 1, name: 'Bob', date: '2026-02-15', status: 'Pending' },
	{ id: 2, name: 'David', date: '2026-01-20', status: 'Active' },
	{ id: 3, name: 'Eve', date: '2026-02-05', status: 'Pending' },
	{ id: 4, name: 'Charlie', date: '2026-03-10', status: 'Inactive' },
	{ id: 5, name: 'Frank', date: '2026-03-25', status: 'Inactive' },
	{ id: 6, name: 'Ada', date: '2026-01-01', status: 'Active' },
]);

const sortState = ref({
	column: null,
	direction: 'asc',
});

const byName = (a, b) => {
	return a.name.localeCompare(b.name);
};

const byDate = (a, b) => {
	const dateA = new Date(a.date).getTime();
	const dateB = new Date(b.date).getTime();

	return dateA - dateB;
};

const byStatus = (a, b) => {
	const statusOrder = ['Active', 'Pending', 'Inactive'];

	const aIndex = statusOrder.indexOf(a.status);
	const bIndex = statusOrder.indexOf(b.status);

	return aIndex - bIndex;
};

const userSorter = (comparer) =>
	createNewSortInstance({
		comparer,
	});

function toggleSort(column, direction) {
	sortState.value = { column, direction };

	let sorter;

	switch (sortState.value.column) {
		default:
		case 'name':
			sorter = userSorter(byName);
			break;
		case 'date':
			sorter = userSorter(byDate);
			break;
		case 'status':
			sorter = userSorter(byStatus);
			break;
	}

	data.value = direction === 'asc' ? sorter(data.value).asc() : sorter(data.value).desc();
}

function sortDirection(columnId) {
	return sortState.value.column === columnId ? sortState.value.direction : undefined;
}
</script>

<template>
	<VTable>
		<VTableHead>
			<VTableRow>
				<VTableHeaderCell>
					Name
					<VTableSortingButton :direction="sortDirection('name')" @sort="(event) => toggleSort('name', event.detail)" />
				</VTableHeaderCell>
				<VTableHeaderCell>
					Date
					<VTableSortingButton :direction="sortDirection('date')" @sort="(event) => toggleSort('date', event.detail)" />
				</VTableHeaderCell>
				<VTableHeaderCell>
					Status
					<VTableSortingButton :direction="sortDirection('status')" @sort="(event) => toggleSort('status', event.detail)" />
				</VTableHeaderCell>
			</VTableRow>
		</VTableHead>
		<VTableBody>
			<VTableRow v-for="row in data" :key="row.id">
				<VTableCell>{{ row.name }}</VTableCell>
				<VTableCell>{{ row.date }}</VTableCell>
				<VTableCell>{{ row.status }}</VTableCell>
			</VTableRow>
		</VTableBody>
	</VTable>
</template>
{% endraw %}
```

</vwc-tab-panel>
<vwc-tab label="Vue + TanStack Table"></vwc-tab>
<vwc-tab-panel>

This example demonstrates an example of sorting using TanStack Table.

```vue preview
{% raw %}
<script setup lang="ts" type="module">
import { ref } from 'vue';
import { VTable, VTableBody, VTableCell, VTableHead, VTableHeaderCell, VTableRow, VTableSortingButton } from '@vonage/vivid-vue';
import { useVueTable, getCoreRowModel, FlexRender, getSortedRowModel } from 'https://esm.sh/@tanstack/vue-table@8.21.3?bundle';

const data = [
	{ id: 1, name: 'Bob', date: '2026-02-15', status: 'Pending' },
	{ id: 2, name: 'David', date: '2026-01-20', status: 'Active' },
	{ id: 3, name: 'Eve', date: '2026-02-05', status: 'Pending' },
	{ id: 4, name: 'Charlie', date: '2026-03-10', status: 'Inactive' },
	{ id: 5, name: 'Frank', date: '2026-03-25', status: 'Inactive' },
	{ id: 6, name: 'Ada', date: '2026-01-01', status: 'Active' },
];

const statusSort = (rowA, rowB, columnId) => {
	const statusOrder = ['Active', 'Pending', 'Inactive'];

	const aIndex = statusOrder.indexOf(rowA.getValue(columnId));
	const bIndex = statusOrder.indexOf(rowB.getValue(columnId));

	return aIndex - bIndex;
};

const columns = [
	{ accessorKey: 'name', header: 'Name', cell: (info) => info.getValue(), enableSorting: true, sortingFn: 'alphanumeric' },
	{ accessorKey: 'date', header: 'Date', cell: (info) => info.getValue(), enableSorting: true, sortingFn: 'datetime' },
	{ accessorKey: 'status', header: 'Status', cell: (info) => info.getValue(), enableSorting: true, sortingFn: statusSort },
];

const sorting = ref([]);

const table = useVueTable({
	get data() {
		return data;
	},
	get columns() {
		return columns;
	},
	state: {
		get sorting() {
			return sorting.value;
		},
	},
	onSortingChange: (updater) => {
		sorting.value = typeof updater === 'function' ? updater(sorting.value) : updater;
	},
	getCoreRowModel: getCoreRowModel(),
	getSortedRowModel: getSortedRowModel(),
});

function toggleSort(columnId, direction) {
	table.getColumn(columnId)?.toggleSorting();
}

function sortDirection(columnId) {
	const isSorted = table.getColumn(columnId)?.getIsSorted();
	return isSorted === 'asc' ? 'asc' : isSorted === 'desc' ? 'desc' : undefined;
}
</script>

<template>
	<VTable>
		<VTableHead>
			<VTableRow>
				<VTableHeaderCell>
					Name
					<VTableSortingButton :direction="sortDirection('name')" @sort="(direction) => toggleSort('name', direction)" />
				</VTableHeaderCell>
				<VTableHeaderCell>
					Date
					<VTableSortingButton :direction="sortDirection('date')" @sort="(direction) => toggleSort('date', direction)" />
				</VTableHeaderCell>
				<VTableHeaderCell>
					Status
					<VTableSortingButton :direction="sortDirection('status')" @sort="(direction) => toggleSort('status', direction)" />
				</VTableHeaderCell>
			</VTableRow>
		</VTableHead>
		<VTableBody>
			<VTableRow v-for="row in table.getRowModel().rows" :key="row.id">
				<VTableCell>{{ row.original.name }}</VTableCell>
				<VTableCell>{{ row.original.date }}</VTableCell>
				<VTableCell>{{ row.original.status }}</VTableCell>
			</VTableRow>
		</VTableBody>
	</VTable>
</template>
{% endraw %}
```

</vwc-tab-panel>
</vwc-tabs>
