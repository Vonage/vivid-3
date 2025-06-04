## Select In a Grid

In order for the select popup to show correctly in the grid, use the `fixed-dropdown` attribute on the select inside grid cells.

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

## Sortable Columns

In order for a grid column to show as sortable, use the `sort-direction` attribute on the sortable column header.

Here's an example of sorting when building the grid manually:

```html preview
<vwc-data-grid class="data-grid">
	<vwc-data-grid-row row-type="header">
		<vwc-data-grid-cell cell-type="columnheader">
			Not Sortable
		</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader" sort-direction="none">
			Sortable
		</vwc-data-grid-cell>
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
			return nameA > nameB ? -1 : 1;
		} else {
			return nameA < nameB ? -1 : 1;
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
		} else if (e.detail.sortDirection === 'descending') {
			target.sortDirection = 'none';
		} else {
			target.sortDirection = 'ascending';
		}
		renderData(e.target.sortDirection);
	});
</script>
```

Here's an example of sorting the data-grid when building it with `rowsData`:

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
			column.sortDirection =
				e.detail.sortDirection === 'ascending'
					? 'descending'
					: e.detail.sortDirection === 'descending'
					? 'none'
					: 'ascending';
		});

		grid.rowsData = Array.from(data).sort((a, b) => {
			const nameA = a[sortedColumnHeaderDef.columnDataKey];
			const nameB = b[sortedColumnHeaderDef.columnDataKey];

			if (sortedColumnHeaderDef.sortDirection === 'none') return 0;
			if (sortedColumnHeaderDef.sortDirection === 'ascending') {
				return nameA > nameB ? -1 : 1;
			} else {
				return nameA < nameB ? -1 : 1;
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

## Focusable Child Elements

If your cell contains a focusable child element that you would like to delegate focus to, use the `cellFocusTargetCallback` of the column definition to return the child element. It will now take focus instead of the cell.

If you cell contains multiple focusable elements or elements that require arrow keys to operate, combine this will `cellInternalFocusQueue` of the column definition. This will allow users to press Enter or F2 when the cell has focus to move focus into the cell and operate the elements as usual.

```html preview
<vwc-data-grid class="data-grid">
	<vwc-data-grid-row row-type="header">
		<vwc-data-grid-cell cell-type="columnheader"> Column 1 </vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader"> Column 2 </vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell> Cell 1.1 </vwc-data-grid-cell>
		<vwc-data-grid-cell id="single-action">
			<vwc-button
				appearance="outlined"
				label="Action 1"
				connotation="alert"
			></vwc-button>
		</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell> Cell 2.1 </vwc-data-grid-cell>
		<vwc-data-grid-cell id="multiple-actions">
			<vwc-button
				appearance="outlined"
				label="Action 1"
				connotation="alert"
			></vwc-button>
			<vwc-button
				appearance="outlined"
				label="Action 2"
				connotation="success"
			></vwc-button>
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

## Add and Remove Rows Dynamically

You can add and remove rows dynamically by manipulating the `rowsData`.

```html preview
<vwc-button
	label="Add item"
	appearance="outlined"
	onclick="push()"
></vwc-button>
<vwc-button
	label="Remove last item"
	appearance="outlined"
	onclick="pop()"
></vwc-button>
<vwc-button
	label="Remove first item"
	appearance="outlined"
	onclick="shift()"
></vwc-button>
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

## Selectable cells and rows

Data grid supports selecting cells and rows by setting `selection-mode` attribute to one of `single-row`, `multi-row`, `single-cell` or `multi-cell`. If you want to turn off selection, set it to `none` or remove the attribute.

### Single row

```html preview
<vwc-data-grid
	selection-mode="single-row"
	id="data-grid-selection-single-row"
></vwc-data-grid>
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

### Multiple rows

Use a control / command key to select multiple rows.

```html preview
<vwc-data-grid
	selection-mode="multi-row"
	id="data-grid-selection-multi-row"
></vwc-data-grid>
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

### Single cell

```html preview
<vwc-data-grid
	selection-mode="single-cell"
	id="data-grid-selection-single-cell"
></vwc-data-grid>
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

### Multiple cells

Use a control / command key to select multiple rows.

```html preview
<vwc-data-grid
	selection-mode="multi-cell"
	id="data-grid-selection-multi-cell"
></vwc-data-grid>
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
