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
	<div style="width: 1250px;">
		<VTable>
			<VTableHead>
				<VTableRow>
					<VTableHeaderCell>Component</VTableHeaderCell>
					<VTableHeaderCell>HTML equivalent</VTableHeaderCell>
					<VTableHeaderCell style="width: 74%;">Description</VTableHeaderCell>
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
	</div>
</template>

<script setup lang="ts">
import { VTable, VTableBody, VTableCell, VTableHead, VTableHeaderCell, VTableRow } from '@vonage/vivid-vue';
</script>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div style="width: 1250px;">
<vwc-table>
		<vwc-table-head>
			<vwc-table-row>
				<vwc-table-header-cell>Component</vwc-table-header-cell>
				<vwc-table-header-cell>HTML equivalent</vwc-table-header-cell>
				<vwc-table-header-cell style="width: 74%;">Description</vwc-table-header-cell>
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
</div>
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

```html preview
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
