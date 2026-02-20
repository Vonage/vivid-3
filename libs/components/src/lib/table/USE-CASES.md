## Select In a Table

In order for the select popup to show correctly in the table, use the `fixed-dropdown` attribute on the select inside table cells.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<template>
	<VTable class="data-table">
		<VTableHead>
			<VTableRow>
				<VTableHeaderCell>Product</VTableHeaderCell>
				<VTableHeaderCell>Status</VTableHeaderCell>
			</VTableRow>
		</VTableHead>
		<VTableBody>
			<VTableRow>
				<VTableCell>
					<VSelect fixed-dropdown>
						<VOption value="1" text="SMS" />
						<VOption value="2" text="Voice" />
						<VOption value="3" text="Email" />
					</VSelect>
				</VTableCell>
				<VTableCell>Active</VTableCell>
			</VTableRow>
			<VTableRow>
				<VTableCell>
					<VSelect fixed-dropdown>
						<VOption value="1" text="SMS" />
						<VOption value="2" text="Voice" />
						<VOption value="3" text="Email" />
					</VSelect>
				</VTableCell>
				<VTableCell>Inactive</VTableCell>
			</VTableRow>
		</VTableBody>
	</VTable>
</template>

<script setup lang="ts">
import { VOption, VSelect, VTable, VTableBody, VTableCell, VTableHead, VTableHeaderCell, VTableRow } from '@vonage/vivid-vue';
</script>

<style scoped>
.data-table {
	--data-grid-cell-block-size: 100%;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-table class="data-table">
	<vwc-table-head>
		<vwc-table-row>
			<vwc-table-header-cell>Product</vwc-table-header-cell>
			<vwc-table-header-cell>Status</vwc-table-header-cell>
		</vwc-table-row>
	</vwc-table-head>
	<vwc-table-body>
		<vwc-table-row>
			<vwc-table-cell>
				<vwc-select fixed-dropdown>
					<vwc-option value="1" text="SMS"></vwc-option>
					<vwc-option value="2" text="Voice"></vwc-option>
					<vwc-option value="3" text="Email"></vwc-option>
				</vwc-select>
			</vwc-table-cell>
			<vwc-table-cell>Active</vwc-table-cell>
		</vwc-table-row>
		<vwc-table-row>
			<vwc-table-cell>
				<vwc-select fixed-dropdown>
					<vwc-option value="1" text="SMS"></vwc-option>
					<vwc-option value="2" text="Voice"></vwc-option>
					<vwc-option value="3" text="Email"></vwc-option>
				</vwc-select>
			</vwc-table-cell>
			<vwc-table-cell>Inactive</vwc-table-cell>
		</vwc-table-row>
	</vwc-table-body>
</vwc-table>

<style>
	.data-table {
		--data-grid-cell-block-size: 100%;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Add and Remove Rows Dynamically

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<template>
	<VButton label="Add row" appearance="outlined" @click="addRow" />
	<VButton label="Remove last row" appearance="outlined" @click="removeLastRow" />
	<VButton label="Remove first row" appearance="outlined" @click="removeFirstRow" />

	<VTable class="data-table">
		<VTableHead>
			<VTableRow>
				<VTableHeaderCell>Product</VTableHeaderCell>
				<VTableHeaderCell>Type</VTableHeaderCell>
			</VTableRow>
		</VTableHead>
		<VTableBody>
			<VTableRow v-for="(row, idx) in rows" :key="idx">
				<VTableCell>{{ row[0] }}</VTableCell>
				<VTableCell>{{ row[1] }}</VTableCell>
			</VTableRow>
		</VTableBody>
	</VTable>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VButton, VTable, VTableBody, VTableCell, VTableHead, VTableHeaderCell, VTableRow } from '@vonage/vivid-vue';

const rows = ref<Array<[string, string]>>([
	['Data 1', 'Data 2'],
	['Data 3', 'Data 4'],
]);

let count = 5;
const addRow = () => {
	rows.value.push([`Data ${count}`, `Data ${count + 1}`]);
	count += 2;
};
const removeLastRow = () => {
	rows.value.pop();
};
const removeFirstRow = () => {
	rows.value.shift();
};
</script>

<style scoped>
.data-table {
	max-block-size: 200px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-button label="Add row" appearance="outlined" onclick="addRow()"></vwc-button>
<vwc-button label="Remove last row" appearance="outlined" onclick="removeLastRow()"></vwc-button>
<vwc-button label="Remove first row" appearance="outlined" onclick="removeFirstRow()"></vwc-button>

<vwc-table class="data-table">
	<vwc-table-head>
		<vwc-table-row>
			<vwc-table-header-cell>Product</vwc-table-header-cell>
			<vwc-table-header-cell>Type</vwc-table-header-cell>
		</vwc-table-row>
	</vwc-table-head>
	<vwc-table-body id="table-body">
		<vwc-table-row>
			<vwc-table-cell>Data 1</vwc-table-cell>
			<vwc-table-cell>Data 2</vwc-table-cell>
		</vwc-table-row>
		<vwc-table-row>
			<vwc-table-cell>Data 3</vwc-table-cell>
			<vwc-table-cell>Data 4</vwc-table-cell>
		</vwc-table-row>
	</vwc-table-body>
</vwc-table>

<script>
	let count = 3;
	const tableBody = document.getElementById('table-body');

	function addRow() {
		const row = document.createElement('vwc-table-row');
		row.innerHTML = `
			<vwc-table-cell>Data ${count}</vwc-table-cell>
			<vwc-table-cell>Data ${count + 1}</vwc-table-cell>
		`;
		tableBody.appendChild(row);
		count += 2;
	}

	function removeLastRow() {
		const rows = tableBody.querySelectorAll('vwc-table-row');
		if (rows.length > 0) {
			rows[rows.length - 1].remove();
		}
	}

	function removeFirstRow() {
		const rows = tableBody.querySelectorAll('vwc-table-row');
		if (rows.length > 0) {
			rows[0].remove();
		}
	}
</script>

<style>
	.data-table {
		max-block-size: 200px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Custom Cell Content

Table cells can contain any HTML content, including other Vivid components.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<template>
	<VTable>
		<VTableHead>
			<VTableRow>
				<VTableHeaderCell>Product</VTableHeaderCell>
				<VTableHeaderCell>Status</VTableHeaderCell>
				<VTableHeaderCell>Actions</VTableHeaderCell>
			</VTableRow>
		</VTableHead>
		<VTableBody>
			<VTableRow>
				<VTableCell>SMS</VTableCell>
				<VTableCell>
					<VBadge connotation="success">Active</VBadge>
				</VTableCell>
				<VTableCell>
					<VButton appearance="ghost" icon="edit-line" label="Edit" />
				</VTableCell>
			</VTableRow>
			<VTableRow>
				<VTableCell>Voice</VTableCell>
				<VTableCell>
					<VBadge connotation="alert">Inactive</VBadge>
				</VTableCell>
				<VTableCell>
					<VButton appearance="ghost" icon="edit-line" label="Edit" />
				</VTableCell>
			</VTableRow>
			<VTableRow>
				<VTableCell>Email</VTableCell>
				<VTableCell>
					<VBadge connotation="accent">Pending</VBadge>
				</VTableCell>
				<VTableCell>
					<VButton appearance="ghost" icon="edit-line" label="Edit" />
				</VTableCell>
			</VTableRow>
		</VTableBody>
	</VTable>
</template>

<script setup lang="ts">
import { VBadge, VButton, VTable, VTableBody, VTableCell, VTableHead, VTableHeaderCell, VTableRow } from '@vonage/vivid-vue';
</script>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-table>
	<vwc-table-head>
		<vwc-table-row>
			<vwc-table-header-cell>Product</vwc-table-header-cell>
			<vwc-table-header-cell>Status</vwc-table-header-cell>
			<vwc-table-header-cell>Actions</vwc-table-header-cell>
		</vwc-table-row>
	</vwc-table-head>
	<vwc-table-body>
		<vwc-table-row>
			<vwc-table-cell>SMS</vwc-table-cell>
			<vwc-table-cell>
				<vwc-badge connotation="success">Active</vwc-badge>
			</vwc-table-cell>
			<vwc-table-cell>
				<vwc-button appearance="ghost" icon="edit-line" label="Edit"></vwc-button>
			</vwc-table-cell>
		</vwc-table-row>
		<vwc-table-row>
			<vwc-table-cell>Voice</vwc-table-cell>
			<vwc-table-cell>
				<vwc-badge connotation="alert">Inactive</vwc-badge>
			</vwc-table-cell>
			<vwc-table-cell>
				<vwc-button appearance="ghost" icon="edit-line" label="Edit"></vwc-button>
			</vwc-table-cell>
		</vwc-table-row>
		<vwc-table-row>
			<vwc-table-cell>Email</vwc-table-cell>
			<vwc-table-cell>
				<vwc-badge connotation="accent">Pending</vwc-badge>
			</vwc-table-cell>
			<vwc-table-cell>
				<vwc-button appearance="ghost" icon="edit-line" label="Edit"></vwc-button>
			</vwc-table-cell>
		</vwc-table-row>
	</vwc-table-body>
</vwc-table>
```

</vwc-tab-panel>
</vwc-tabs>
