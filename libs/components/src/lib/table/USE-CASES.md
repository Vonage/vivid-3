## Sorting

To ensure maximum flexibility and composability, sorting logic is decoupled from the table component. This allows you to implement a sorting strategy tailored to your specific application requirements.

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
					<VTableSortingButton :direction="sortDirection('name')" @sort.prevent="(event) => toggleSort('name', event.detail)" />
				</VTableHeaderCell>
				<VTableHeaderCell>
					Date
					<VTableSortingButton :direction="sortDirection('date')" @sort.prevent="(event) => toggleSort('date', event.detail)" />
				</VTableHeaderCell>
				<VTableHeaderCell>
					Status
					<VTableSortingButton :direction="sortDirection('status')" @sort.prevent="(event) => toggleSort('status', event.detail)" />
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
	if (!direction || direction === 'none') {
		table.setSorting([]);
	} else {
		table.setSorting([{ id: columnId, desc: direction === 'desc' }]);
	}
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
					<VTableSortingButton :direction="sortDirection('name')" @sort.prevent="(event) => toggleSort('name', event.detail)" />
				</VTableHeaderCell>
				<VTableHeaderCell>
					Date
					<VTableSortingButton :direction="sortDirection('date')" @sort.prevent="(event) => toggleSort('date', event.detail)" />
				</VTableHeaderCell>
				<VTableHeaderCell>
					Status
					<VTableSortingButton :direction="sortDirection('status')" @sort.prevent="(event) => toggleSort('status', event.detail)" />
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
