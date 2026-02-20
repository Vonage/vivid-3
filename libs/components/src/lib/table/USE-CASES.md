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
