## Default Configurations

Use the Table Head, Table Body, Table Row, Table Header Cell, and Table Cell sub-components to construct the tabular data like you would using `thead`, `tbody`, `tr`, `th`, and `td` tags inside of a `table` element.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<template>
	<strong>Top row header cells</strong><br />
	<VTable>
		<VTableHead>
			<VTableRow>
				<VTableHeaderCell>Product</VTableHeaderCell>
				<VTableHeaderCell>Type</VTableHeaderCell>
				<VTableHeaderCell>Threshold</VTableHeaderCell>
			</VTableRow>
		</VTableHead>
		<VTableBody>
			<VTableRow>
				<VTableCell>SMS</VTableCell>
				<VTableCell>Volumetric Changes</VTableCell>
				<VTableCell>1000</VTableCell>
			</VTableRow>
			<VTableRow>
				<VTableCell>Voice</VTableCell>
				<VTableCell>Volumetric Changes</VTableCell>
				<VTableCell>5000</VTableCell>
			</VTableRow>
		</VTableBody>
	</VTable>

	<br /><br /><br />

	<strong>First column header cells</strong><br />
	<VTable>
		<VTableRow>
			<VTableHeaderCell>Product</VTableHeaderCell>
			<VTableCell>SMS</VTableCell>
			<VTableCell>Voice</VTableCell>
		</VTableRow>
		<VTableRow>
			<VTableHeaderCell>Type</VTableHeaderCell>
			<VTableCell>Volumetric Changes</VTableCell>
			<VTableCell>Volumetric Changes</VTableCell>
		</VTableRow>
		<VTableRow>
			<VTableHeaderCell>Threshold</VTableHeaderCell>
			<VTableCell>1000</VTableCell>
			<VTableCell>5000</VTableCell>
		</VTableRow>
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
<strong>Top row header cells</strong><br />
<vwc-table>
	<vwc-table-head>
		<vwc-table-row>
			<vwc-table-header-cell>Product</vwc-table-header-cell>
			<vwc-table-header-cell>Type</vwc-table-header-cell>
			<vwc-table-header-cell>Threshold</vwc-table-header-cell>
		</vwc-table-row>
	</vwc-table-head>
	<vwc-table-body>
		<vwc-table-row>
			<vwc-table-cell>SMS</vwc-table-cell>
			<vwc-table-cell>Volumetric Changes</vwc-table-cell>
			<vwc-table-cell>1000</vwc-table-cell>
		</vwc-table-row>
		<vwc-table-row>
			<vwc-table-cell>Voice</vwc-table-cell>
			<vwc-table-cell>Volumetric Changes</vwc-table-cell>
			<vwc-table-cell>5000</vwc-table-cell>
		</vwc-table-row>
	</vwc-table-body>
</vwc-table>

<br /><br /><br />

<strong>First column header cells</strong><br />
<vwc-table>
	<vwc-table-row>
		<vwc-table-header-cell>Product</vwc-table-header-cell>
		<vwc-table-cell>SMS</vwc-table-cell>
		<vwc-table-cell>Voice</vwc-table-cell>
	</vwc-table-row>
	<vwc-table-row>
		<vwc-table-header-cell>Type</vwc-table-header-cell>
		<vwc-table-cell>Volumetric Changes</vwc-table-cell>
		<vwc-table-cell>Volumetric Changes</vwc-table-cell>
	</vwc-table-row>
	<vwc-table-row>
		<vwc-table-header-cell>Threshold</vwc-table-header-cell>
		<vwc-table-cell>1000</vwc-table-cell>
		<vwc-table-cell>5000</vwc-table-cell>
	</vwc-table-row>
</vwc-table>
```

</vwc-tab-panel>
</vwc-tabs>

## Setting Column Widths

Set column widths by applying `width` or `min-width` to header cells. This will enforce a fixed table layout.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<template>
	<div style="width: 500px; overflow-x: auto;">
		<VTable>
			<VTableHead>
				<VTableRow>
					<VTableHeaderCell style="width: 15%;">Status</VTableHeaderCell>
					<VTableHeaderCell style="width: 15%; min-width: 70px;">Name</VTableHeaderCell>
					<VTableHeaderCell style="width: 30%;">Country</VTableHeaderCell>
					<VTableHeaderCell style="width: 40%;">Actions</VTableHeaderCell>
				</VTableRow>
			</VTableHead>
			<VTableBody>
				<VTableRow>
					<VTableCell>Ready</VTableCell>
					<VTableCell>237642973237642973</VTableCell>
					<VTableCell>GB, NO, US</VTableCell>
					<VTableCell>
						<VButton appearance="outlined" label="Edit" size="condensed" />
						<VButton appearance="outlined" label="Delete" size="condensed" />
					</VTableCell>
				</VTableRow>
				<VTableRow>
					<VTableCell>Ready</VTableCell>
					<VTableCell>237642973237642973</VTableCell>
					<VTableCell>GB, NO, US</VTableCell>
					<VTableCell>
						<VButton appearance="outlined" label="Edit" size="condensed" />
						<VButton appearance="outlined" label="Delete" size="condensed" />
					</VTableCell>
				</VTableRow>
			</VTableBody>
		</VTable>
	</div>
</template>

<script setup lang="ts">
import { VButton, VTable, VTableBody, VTableCell, VTableHead, VTableHeaderCell, VTableRow } from '@vonage/vivid-vue';
</script>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div style="width: 500px; overflow-x: auto;">
	<vwc-table>
		<vwc-table-head>
			<vwc-table-row>
				<vwc-table-header-cell style="width: 15%;">Status</vwc-table-header-cell>
				<vwc-table-header-cell style="width: 15%; min-width: 70px;">Name</vwc-table-header-cell>
				<vwc-table-header-cell style="width: 30%;">Country</vwc-table-header-cell>
				<vwc-table-header-cell style="width: 40%;">Actions</vwc-table-header-cell>
			</vwc-table-row>
		</vwc-table-head>
		<vwc-table-body>
			<vwc-table-row>
				<vwc-table-cell>Ready</vwc-table-cell>
				<vwc-table-cell>237642973237642973</vwc-table-cell>
				<vwc-table-cell>GB, NO, US</vwc-table-cell>
				<vwc-table-cell>
					<vwc-button appearance="outlined" label="Edit" size="condensed"></vwc-button>
					<vwc-button appearance="outlined" label="Delete" size="condensed"></vwc-button>
				</vwc-table-cell>
			</vwc-table-row>
			<vwc-table-row>
				<vwc-table-cell>Ready</vwc-table-cell>
				<vwc-table-cell>237642973237642973</vwc-table-cell>
				<vwc-table-cell>GB, NO, US</vwc-table-cell>
				<vwc-table-cell>
					<vwc-button appearance="outlined" label="Edit" size="condensed"></vwc-button>
					<vwc-button appearance="outlined" label="Delete" size="condensed"></vwc-button>
				</vwc-table-cell>
			</vwc-table-row>
		</vwc-table-body>
	</vwc-table>
</div>
```

</vwc-tab-panel>
</vwc-tabs>

## Partials within cells

Place [Partials](/components/partials) (e.g. Status, Country) together with **Badge** and **Button** inside table cells to build rich rows. This example does not show sorting or filtering.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<template>
	<VTable>
		<VTableHead>
			<VTableRow>
				<VTableHeaderCell>Status</VTableHeaderCell>
				<VTableHeaderCell>Name and network code</VTableHeaderCell>
				<VTableHeaderCell style="min-width: 200px;">Country</VTableHeaderCell>
				<VTableHeaderCell>Type</VTableHeaderCell>
				<VTableHeaderCell>Supported countries</VTableHeaderCell>
				<VTableHeaderCell style="min-width: 200px;">Actions</VTableHeaderCell>
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
					<VCountry code="NO" />
					<VCountry code="US" />
				</VTableCell>
				<VTableCell>
					<VBadge text="Positive" icon="check-line" connotation="success" appearance="subtle" shape="pill" />
				</VTableCell>
				<VTableCell>PL, RO</VTableCell>
				<VTableCell>
					<VButton appearance="outlined" icon="edit-line" label="Edit" size="condensed" />
					<VButton appearance="outlined" icon="delete-line" label="Delete" size="condensed" />
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
					<VCountry code="GB" />
					<VCountry code="NO" />
					<VCountry code="US" />
				</VTableCell>
				<VTableCell>
					<VBadge text="Positive" icon="check-line" connotation="success" appearance="subtle" shape="pill" />
				</VTableCell>
				<VTableCell>PL, RO</VTableCell>
				<VTableCell>
					<VButton appearance="outlined" icon="edit-line" label="Edit" size="condensed" />
					<VButton appearance="outlined" icon="delete-line" label="Delete" size="condensed" />
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
					<VCountry code="GB" />
					<VCountry code="NO" />
					<VCountry code="US" />
				</VTableCell>
				<VTableCell>
					<VBadge text="Positive" icon="check-line" connotation="success" appearance="subtle" shape="pill" />
				</VTableCell>
				<VTableCell>PL, RO</VTableCell>
				<VTableCell>
					<VButton appearance="outlined" icon="edit-line" label="Edit" size="condensed" />
					<VButton appearance="outlined" icon="delete-line" label="Delete" size="condensed" />
				</VTableCell>
			</VTableRow>
		</VTableBody>
	</VTable>
</template>

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
			<vwc-table-header-cell>Name and network code</vwc-table-header-cell>
			<vwc-table-header-cell style="min-width: 200px;">Country</vwc-table-header-cell>
			<vwc-table-header-cell>Type</vwc-table-header-cell>
			<vwc-table-header-cell>Supported countries</vwc-table-header-cell>
			<vwc-table-header-cell style="min-width: 200px;">Actions</vwc-table-header-cell>
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
				<vwc-country code="NO"></vwc-country>
				<vwc-country code="US"></vwc-country>
			</vwc-table-cell>
			<vwc-table-cell>
				<vwc-badge text="Positive" icon="check-line" connotation="success" appearance="subtle" shape="pill"></vwc-badge>
			</vwc-table-cell>
			<vwc-table-cell>PL, RO</vwc-table-cell>
			<vwc-table-cell>
				<vwc-button appearance="outlined" icon="edit-line" label="Edit" size="condensed"></vwc-button>
				<vwc-button appearance="outlined" icon="delete-line" label="Delete" size="condensed"></vwc-button>
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
				<vwc-country code="GB"></vwc-country>
				<vwc-country code="NO"></vwc-country>
				<vwc-country code="US"></vwc-country>
			</vwc-table-cell>
			<vwc-table-cell>
				<vwc-badge text="Positive" icon="check-line" connotation="success" appearance="subtle" shape="pill"></vwc-badge>
			</vwc-table-cell>
			<vwc-table-cell>PL, RO</vwc-table-cell>
			<vwc-table-cell>
				<vwc-button appearance="outlined" icon="edit-line" label="Edit" size="condensed"></vwc-button>
				<vwc-button appearance="outlined" icon="delete-line" label="Delete" size="condensed"></vwc-button>
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
				<vwc-country code="GB"></vwc-country>
				<vwc-country code="NO"></vwc-country>
				<vwc-country code="US"></vwc-country>
			</vwc-table-cell>
			<vwc-table-cell>
				<vwc-badge text="Positive" icon="check-line" connotation="success" appearance="subtle" shape="pill"></vwc-badge>
			</vwc-table-cell>
			<vwc-table-cell>PL, RO</vwc-table-cell>
			<vwc-table-cell>
				<vwc-button appearance="outlined" icon="edit-line" label="Edit" size="condensed"></vwc-button>
				<vwc-button appearance="outlined" icon="delete-line" label="Delete" size="condensed"></vwc-button>
			</vwc-table-cell>
		</vwc-table-row>
	</vwc-table-body>
</vwc-table>
```

</vwc-tab-panel>
</vwc-tabs>
