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
