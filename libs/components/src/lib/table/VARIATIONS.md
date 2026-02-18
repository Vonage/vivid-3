## Default Configurations

Use the Table Head, Table Body, Table Row, Table Header Cell, and Table Cell sub-components to construct the tabular data like you would using `thead`, `tbody`, `tr`, `th`, and `td` tags inside of a `table` element.

```html preview
<b>Top row header cells</b><br />
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
<b>First column header cells</b><br />
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

## Setting Column Widths

Set column widths by applying `width` or `min-width` to header cells. This will enforce a fixed table layout.

```html preview
<div style="width: 500px; overflow-x: auto;">
	<vwc-table>
		<vwc-table-head>
			<vwc-table-row>
				<vwc-table-header-cell style="width: 15%;">Status</vwc-table-header-cell>
				<vwc-table-header-cell style="width: 15%; min-width: 70px">Name</vwc-table-header-cell>
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

## Partials within cells

Place [Partials](/components/partials) (e.g. Status, Country) widgets together with **Badge** and **Button** inside table cells to build rich rows—status.

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
