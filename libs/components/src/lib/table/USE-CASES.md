## Select In a Table

In order for the select popup to show correctly in the table, use the `fixed-dropdown` attribute on the select inside table cells.

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

## Add and Remove Rows Dynamically

You can add and remove rows dynamically by manipulating the DOM.

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

## Custom Cell Content

Table cells can contain any HTML content, including other Vivid components.

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
