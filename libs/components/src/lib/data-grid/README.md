# Data Grid

The data grid allows users to interact with data in a tabular format.

```js
<script type="module">import '@vonage/vivid/data-grid';</script>
```

```html preview
<vwc-data-grid></vwc-data-grid>
<script>
    grid = document.querySelector('vwc-data-grid');
    grid.rowsData = [
        {data1: 'data11', data2: 'data12'},
        {data1: 'data21', data2: 'data22'},
    ];
</script>
```

## Members
### Generate-header
Use `generate-header` for data grid header visibility mode.

- Type: `'none'` | `'default'` | `'sticky'`
- Default: `'default'`

```html preview
<style>
	vwc-data-grid {
		max-block-size: 300px;
	}
</style>
<vwc-select onchange="changeHeader()">
	<vwc-option value="none" text="none"></vwc-option>
	<vwc-option value="default" text="default"></vwc-option>
	<vwc-option value="sticky" text="sticky"></vwc-option>
</vwc-select>

<vwc-data-grid></vwc-data-grid>
<script>
		function changeHeader() {
			headerType = event.target.value;
			grid.generateHeader = headerType;
		}
		
    grid = document.querySelector('vwc-data-grid');
    grid.rowsData = [

        {data1: 'data111', data2: 'data12'},
        {data1: 'data21', data2: 'data22'},
        {data1: 'data31', data2: 'data32'},
        {data1: 'data41', data2: 'data42'},
        {data1: 'data51', data2: 'data52'},
        {data1: 'data61', data2: 'data62'},
    ];
	
</script>
```

### selectionMode

- Type: `'none'` | `'single-cell'` | `'multi-cell'` | `'single-row'` | `'multi-row'`
- Default: `'none'`

Use the `selection-mode` attribute to specify the selection mode of the grid.

```html preview 300px
<vwc-select onchange="changeSelectionMode()">
	<vwc-option value="none" text="none"></vwc-option>
	<vwc-option value="single-cell" text="single-cell"></vwc-option>
	<vwc-option value="multi-cell" text="multi-cell"></vwc-option>
	<vwc-option value="single-row" text="single-row"></vwc-option>
	<vwc-option value="multi-row" text="multi-row"></vwc-option>
</vwc-select>

<vwc-data-grid></vwc-data-grid>
<script>
	function changeSelectionMode() {
    selectionMode = event.target.value;
		grid.selectionMode = selectionMode;
	}
    
	grid = document.querySelector('vwc-data-grid');
	grid.rowsData = [
			{data1: 'tabs', data2: 'will'},
			{data1: 'not', data2: 'work'},
	];
</script>
```

### noTabbing

- Type: `boolean`
- Default: `false`

When true the component will not add itself to the tab queue.

```html preview
<vwc-button appearance="filled" label="Tabbing" onclick="changeTabbing(false)"></vwc-button>
<vwc-button label="No Tabbing" onclick="changeTabbing(true)"></vwc-button>

<div id="active-element-content-display">
	<p>Hit Tab key to browse the tab queue. When in `noTabbing` mode, grid will never be focused.</p>
	<div id="active-element-content">Grid not focused</div>
	<div id="focused-cell-content"></div>
</div>
<vwc-data-grid></vwc-data-grid>
<script>
	function changeTabbing(tabbing) {
    event.target.appearance = 'filled';
		Array.from(event.target.parentElement.querySelectorAll('vwc-button')).filter(x => x !== event.target)[0].appearance = null;
		grid.noTabbing = tabbing;
	}
    
	grid = document.querySelector('vwc-data-grid');
	grid.rowsData = [
			{data1: 'tabs', data2: 'will'},
			{data1: 'not', data2: 'work'},
	];
	grid.addEventListener('focusin', () => {
		document.getElementById('active-element-content').innerText = 'Grid Focused';
	});
	grid.addEventListener('focusout', () => {
		document.getElementById('active-element-content').innerText = 'Grid Not Focused';
		document.getElementById('focused-cell-content').innerText = '';
	});
	grid.addEventListener('cell-focused', e => {
		document.getElementById('focused-cell-content').innerText = 'Focused Cell Content: ' + e.detail.innerText;
	});
</script>
```

### rowsData

- Type: `Array`
- Default: `[]`

The data being displayed in the grid.

```html preview
<vwc-data-grid></vwc-data-grid>
<script>
    grid = document.querySelector('vwc-data-grid');
    grid.rowsData = [
        {data1: 'data11', data2: 'data12'},
        {data1: 'data21', data2: 'data22'},
    ];
</script>
```

### columnDefinitions

- Type: [ColumnDefinition](#columndefinition)`[]`
- Default: `null`

The column definitions of the grid. 

Note that the sortable feature doesn't actually sort the data, it only changes the visual representation of the column header. 
See the [use cases](#sortable-columns) for more information.

```html preview
<vwc-data-grid></vwc-data-grid>
<script>
    grid = document.querySelector('vwc-data-grid');
    grid.columnDefinitions = [
        {columnDataKey: 'data1', title: 'Custom Title 1', sortable: true, sortDirection: 'ascending'},
        {columnDataKey: 'data2', title: 'Custom Title 2', sortable: true},
    ];
    grid.rowsData = [
        {data1: 'data11', data2: 'data12'},
        {data1: 'data21', data2: 'data22'},
    ];
</script>
```

### gridTemplateColumns

- Type: `string`
- Default: `undefined`

The `grid-template-columns` attribute and `gridTemplateColumns` property define the line size of every grid column.

Values match the CSS grid-template-columns property.

```html preview	
<style>
	vwc-data-grid-cell {
		text-align: center;
		min-inline-size: 50px; /* Needed to reduce the default min-inline-size of 80px */
	}
</style>
<vwc-data-grid></vwc-data-grid>
<script>
	grid = document.querySelector('vwc-data-grid');
	grid.rowsData = [
		{data1: '#1', data2: 'data12'},
		{data1: '#2', data2: 'data22'},
	];
	grid.gridTemplateColumns = '50px 200px';
</script>
```

### rowItemTemplate

- Type: `ViewTemplate`
- Default: DataGridRowTemplate

The template used to render rows. Note you need to use `html` from `fast-element`.

```html
<vwc-data-grid></vwc-data-grid>
<script>
		import { html } from '@microsoft/fast-element';
    grid = document.querySelector('vwc-data-grid');
    grid.rowItemTemplate = html`<div>All rows will look like me!</div>`;
    grid.rowsData = [
        {data1: 'data11', data2: 'data12'},
        {data1: 'data21', data2: 'data22'},
    ];
</script>
```

### cellItemTemplate

- Type: `ViewTemplate`
- Default: DataGridCellTemplate

The template used to render cells in generated rows. Note you need to use `html` from `fast-element`.

```html
<vwc-data-grid></vwc-data-grid>
<script>
		import { html } from '@microsoft/fast-element';
		grid = document.querySelector('vwc-data-grid');
		grid.cellItemTemplate = html`<div>All cells will look like me!</div>`;
    grid.rowsData = [
        {data1: 'data11', data2: 'data12'},
        {data1: 'data21', data2: 'data22'},
    ];
</script>
```

### headerCellItemTemplate

- Type: `ViewTemplate`
- Default: DataGridCellTemplate

The template used to render cells in generated header rows. Note you need to use `html` from `fast-element`.

```html
<vwc-data-grid></vwc-data-grid>
<script>
		import { html } from '@microsoft/fast-element';
		grid = document.querySelector('vwc-data-grid');
		grid.headerCellItemTemplate = html`<div>All header cells will look like me!</div>`;
		grid.rowsData = [
        {data1: 'data11', data2: 'data12'},
        {data1: 'data21', data2: 'data22'},
    ];
</script>
```

### focusRowIndex

- Type: `number`
- Default: 0

The index of the row that will be focused the next time the grid is focused. If grid is already focused, changing this value will result in changing the focused row.

```html preview
<div>Row Index (starts from 0)</div>
<vwc-number-field id="row-number"></vwc-number-field>
<vwc-button appearance="filled" connotation="cta" label="Change Focused Row" onclick="changeActiveRow()"></vwc-button>
<vwc-data-grid></vwc-data-grid>
<script>
		function changeActiveRow() {
            newActiveRow = document.getElementById('row-number').value;
            grid.focusRowIndex = Number(newActiveRow);
		}

    grid = document.querySelector('vwc-data-grid');
    grid.rowsData = [
			{data1: 'data11', data2: 'data12', data3: 'data13'},
			{data1: 'data21', data2: 'data22', data3: 'data23'},
			{data1: 'data31', data2: 'data32', data3: 'data33'},
			{data1: 'data41', data2: 'data42', data3: 'data43'},
    ];
</script>
```

### focusColumnIndex

- Type: `number`
- Default: 0

The index of the column that will be focused the next time the grid is focused inside `focusRowIndex`. If grid is already focused, changing this value will result in changing the focused column.

```html preview
<div>Column Index (starts from 0)</div>
<vwc-number-field id="col-number"></vwc-number-field><br/>
<vwc-button appearance="filled" connotation="cta" label="Change Focused Column" onclick="changeActiveColumn()"></vwc-button>
<vwc-data-grid></vwc-data-grid>
<script>
		function changeActiveColumn() {
        newActiveColumn = document.getElementById('col-number').value;
        grid.focusColumnIndex = Number(newActiveColumn);
    }

    grid = document.querySelector('vwc-data-grid');
    grid.rowsData = [
        {data1: 'data11', data2: 'data12', data3: 'data13'},
        {data1: 'data21', data2: 'data22', data3: 'data23'},
        {data1: 'data31', data2: 'data32', data3: 'data33'},
        {data1: 'data41', data2: 'data42', data3: 'data43'},
    ];
</script>
```

### rowElementTag

- Type: `string`
- Default: `undefined`

The element tag for header row cells. If not set, the default tag `vwc-data-grid-cell` will be used.

```html preview
<vwc-data-grid></vwc-data-grid>
<script>
    grid = document.querySelector('vwc-data-grid');
    grid.rowElementTag = 'div';
    grid.rowsData = [
        {data1: 'data11', data2: 'data12'},
        {data1: 'data21', data2: 'data22'},
    ];
</script>
```

## Interfaces

### ColumnDefinition
<div class="table-wrapper">

| Name                            | Type                                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|---------------------------------|----------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `columndDataKey`                | `string`                                                             | The property from which the data of the column is taken from                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `title`                         | `string`                                                             | The title of the column                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `headerCellTemplate`            | `ViewTemplate`                                                       | A custom template for a header cell                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `headerCellInternalFocusQueue`  | `boolean`                                                            | Indicates whether the header cell has in internal focus queue. This should be set to `true` for header cells that host controls that need to use arrow keys or have multiple focusable internal elements. When the user hits the Enter or F2 key the element specified by the `headerCellFocusTargetCallback` function will be focused (see keyboard interactions described [here](https://w3c.github.io/aria-practices/#grid)).                                                                                                                           |
| `headerCellFocusTargetCallback` | `(cell) => HTMLElement`                                              | Callback function that takes the cell node as a parameter and returns the HTMLElement to focus in a custom cell. This enables authors to direct focus in a custom cell with interactive elements. When `headerCellInternalFocusQueue` is `false` this function is called when the cell is first focused to immediately move focus to a cell element, for example a cell that contains a button could move focus directly to the button when focused. When `headerCellInternalFocusQueue` is `true` this function is called when the user hits Enter or F2. |
| `cellTemplate`                  | `ViewTemplate`                                                       | A custom template for a cell                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `cellInternalFocusQueue`        | `boolean`                                                            | Indicates whether the cell has in internal focus queue. This should be set to `true` for cells that host controls that need to use arrow keys or have multiple focusable internal elements. When the user hits the Enter or F2 key the element specified by the `cellFocusTargetCallback` function will be focused (see keyboard interactions described [here](https://w3c.github.io/aria-practices/#grid)).                                                                                                                                               |
| `cellFocusTargetCallback`       | `(cell) => HTMLElement`                                              | Callback function that takes the cell node as a parameter and returns the `HTMLElement` to focus in a custom cell. This enables authors to direct focus in a custom cell with interactive elements. When `cellInternalFocusQueue` is `false` this function is called when the cell is first focused to immediately move focus to a cell element, for example a cell that contains a button could move focus directly to the button when focused. When `cellInternalFocusQueue` is `true` this function is called when the user hits Enter or F2.           |
| `isRowHeader`                   | `boolean`                                                            | Whether this column is the row header                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `sortable`                      | `boolean`                                                            | Whether this column is sortable                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `sortDirection`                 | `'none'` &#124; `'ascending'` &#124; `'descending'` &#124; `'other'` | Define the column's sort direction                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

</div>

### Row

#### aria-selected

User the `aria-selected` attribute to indicate the selected state of a row. 
For a full selection functionality the cell has to be inside a grid with the proper `selectionMode`.
The grid also adds the `aria-selected` attribute to the row when it is selected and adds `aria-selected="false"` for none-selected rows.

```html preview
<vwc-data-grid selection-mode="single-row">
	<vwc-data-grid-row role="row" class="header" row-type="header">
		<vwc-data-grid-cell cell-type="columnheader" role="columnheader">
			data1
		</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader">
			data2
		</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row aria-selected="true">
		<vwc-data-grid-cell>Cell 1</vwc-data-grid-cell>
		<vwc-data-grid-cell>Cell 2</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row aria-selected="false">
		<vwc-data-grid-cell>Cell 1</vwc-data-grid-cell>
		<vwc-data-grid-cell>Cell 2</vwc-data-grid-cell>
	</vwc-data-grid-row>
</vwc-data-grid>
```

### Cell


#### aria-sort

- Type: `'ascending'` | `'descending'` | `'none'` | `'other'` | `null`
- Default: `null`

Use the `aria-sort` attribute on a `columnheader` cell to indicate the sortable state of a header cell. 
This will add the right chevron(s) according to the state. 

In a nutshell:
* `ascending` - Items are sorted in ascending order by this column. Will show one chevron pointing up.

* `descending` - Items are sorted in descending order by this column. Will show one chevron pointing down.

* `none` - There is no defined sort applied to the column. Will show indeterminate state with the two chevrons.

* `other` - A sorting algorithm other than ascending or descending has been applied. Will show no hint. 

For more information regarding `aria-sort` you can reference [the W3C spec](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-sort).

```html preview
<vwc-data-grid>
  <vwc-data-grid-row role="row">
    <vwc-data-grid-cell cell-type="columnheader" aria-sort="ascending">ascending</vwc-data-grid-cell>
	<vwc-data-grid-cell cell-type="columnheader" aria-sort="descending">descending</vwc-data-grid-cell>
	<vwc-data-grid-cell cell-type="columnheader" aria-sort="none">none</vwc-data-grid-cell>
	<vwc-data-grid-cell cell-type="columnheader" aria-sort="other">other</vwc-data-grid-cell>
 </vwc-data-grid-row>
</vwc-data-grid>
```

#### aria-selected

Use the `aria-selected` attribute to indicate the selected state of a cell. 
For a full selection functionality the cell has to be inside a grid with the proper `selectionMode`.
The grid also adds the `aria-selected` attribute to the cell when it is selected and adds `aria-selected="false"` for none-selected cells.

```html preview
<vwc-data-grid selection-mode="single-cell">
	<vwc-data-grid-row>
		<vwc-data-grid-cell aria-selected="true">Cell 1</vwc-data-grid-cell>
		<vwc-data-grid-cell aria-selected="false">Cell 2</vwc-data-grid-cell>
		<vwc-data-grid-cell>Cell 3 with long text, all cells has ellipsis</vwc-data-grid-cell>
	</vwc-data-grid-row>
</vwc-data-grid>
```

## Slots

### default

The default slot, where all the content is rendered.

## Events

<div class="table-wrapper">

| Name            | Description                      |
|-----------------|----------------------------------|
| `row-focused`   | Fires when a row is focused.     |
| `cell-focused`  | Fires when a cell is focused.    |
| `cell-click`    | Fires when a cell is clicked on. |

</div>

### Cell-click

The `cell-click` event is fired when a cell is clicked on or when the enter or space key is pressed on a focused cell.

Event details: `{ cell, row, isHeaderCell, columnDataKey }`

```html preview
<vwc-data-grid></vwc-data-grid>
<script>
    grid = document.querySelector('vwc-data-grid');
    grid.columnDefinitions = [
				{columnDataKey: 'data1', title: 'Column 1'},
				{columnDataKey: 'data2', title: 'Column 2'},
		];
    grid.rowsData = [
        {data1: 'data11', data2: 'data12'},
        {data1: 'data21', data2: 'data22'},
    ];
    
    grid.addEventListener('cell-click', (e) => {
				console.log('clicked on cell', e.detail.cell.gridColumn, 'row', e.detail.row.rowIndex);
        if (!e.detail.isHeaderCell) {
          console.log('key', e.detail.columnDataKey, 'of row data', e.detail.row.rowData);
        }
		});
</script>
```

## CSS Variables

### Row Background
When Row is set to sticky there's a default canvas background-color.  
Use `--data-grid-row-background` to change the sticky row background-color.

```html preview
<style>
vwc-data-grid {--data-grid-row-background: var(--vvd-color-neutral-50);}
</style>
<vwc-data-grid></vwc-data-grid>
<script>
    grid = document.querySelector('vwc-data-grid');
    
    grid.generateHeader = 'sticky';
    grid.rowsData = [

        {data1: 'data111', data2: 'data12'},
        {data1: 'data21', data2: 'data22'},
        {data1: 'data31', data2: 'data32'},
        {data1: 'data41', data2: 'data42'},
        {data1: 'data51', data2: 'data52'},
        {data1: 'data61', data2: 'data62'},
    ];
	
</script>
```

### Block Size
By default, cells have a fixed `block-size`. Use `--data-grid-cell-block-size` to change the cell's `block-size`.

Set it to `100%` to make the cells' height dynamic based on content.

<vwc-note connotation="information" icon="info-solid" headline="Change Announcement">

We will change the default value of `--data-grid-cell-block-size` to `100%` in a future major version of Vivid to make dynamic row heights the default behavior.

</vwc-note>

```html preview
<style>
.dynamic-height {
	--data-grid-cell-block-size: 100%;
}
</style>
<vwc-data-grid>
	<vwc-data-grid-row row-type="header">
		<vwc-data-grid-cell cell-type="columnheader">
			Column 1
		</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader">
			Column 2
		</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>
			Fixed height (default)
		</vwc-data-grid-cell>
		<vwc-data-grid-cell>
			<vwc-button label="Action" appearance="outlined"></vwc-button>
		</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row class="dynamic-height">
		<vwc-data-grid-cell>
			Variable height
		</vwc-data-grid-cell>
		<vwc-data-grid-cell>
			<vwc-button label="Action" appearance="outlined" size="expanded"></vwc-button>
		</vwc-data-grid-cell>
	</vwc-data-grid-row>
</vwc-data-grid>
```

### White Space

By default, the cell's `white-space` is `nowrap`, which prevents text from wrapping to multiple lines.

Set the value to `normal` in combination with a `--data-grid-cell-block-size` of `100%` to allow text to wrap to multiple lines.

<vwc-note connotation="information" icon="info-solid" headline="Change Announcement">

We will change the default value of `--data-grid-cell-white-space` to `normal` in a future major version of Vivid to make dynamic row heights the default behavior.

</vwc-note>

```html preview
<style>
vwc-data-grid {
	--data-grid-cell-white-space: normal;
	--data-grid-cell-block-size: 100%;
}
</style>
<vwc-data-grid>
	<vwc-data-grid-row row-type="header">
		<vwc-data-grid-cell cell-type="columnheader">
			Column 1
		</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader">
			Column 2
		</vwc-data-grid-cell>
	</vwc-data-grid-row>
	<vwc-data-grid-row>
		<vwc-data-grid-cell>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius libero ipsum, ut rhoncus nulla varius sit amet. Vestibulum volutpat feugiat neque eget semper. Nam commodo pharetra lobortis. Sed id enim metus.
		</vwc-data-grid-cell>
		<vwc-data-grid-cell>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		</vwc-data-grid-cell>
	</vwc-data-grid-row>
</vwc-data-grid>
```


## Dimensions
### Inline-size
Data-grid inline-size is 100% by default.
If needed inline-size can be set on the `data-grid`.

```html preview
<style>
vwc-data-grid {inline-size: 350px;}
</style>
<vwc-data-grid></vwc-data-grid>
<script>
    grid = document.querySelector('vwc-data-grid');
    grid.rowsData = [
        {data1: 'data11', data2: 'data12', data3: 'data13', data4: 'data14', data5: 'data15', data6: 'data16'},
        {data1: 'data21', data2: 'data22', data3: 'data23', data4: 'data24', data5: 'data25', data6: 'data26'},
    ];
</script>
```

### Max-Block-size
Data-grid has no block-size definition by default.  
When setting `generate-header` to `sticky` the `data-grid` gets `max-block-size: 400px`, if needed, set a custom max-block-size.

```html preview
<style>
	vwc-data-grid {
		max-block-size: 200px;
	}
</style>
<vwc-data-grid></vwc-data-grid>
<script>
    grid = document.querySelector('vwc-data-grid');
    grid.generateHeader = "sticky"
    grid.rowsData = [
        {data1: 'data111', data2: 'data12'},
        {data1: 'data21', data2: 'data22'},
        {data1: 'data31', data2: 'data32'},
        {data1: 'data41', data2: 'data42'},
        {data1: 'data51', data2: 'data52'},
        {data1: 'data61', data2: 'data62'},
    ];
</script>
```

## Accessibility

Keyboard events and focus handling are compliant with WACG standards.

Usage of `aria-selected` hints on a selectable element and its selection status.

When a cell is sorted but not according to ascending or descending algorithm, use `aria-sort="other"`. 

## Use Cases

### Select in a grid

In order for the select popup to show correctly in the grid, use the `fixed-dropdown` attribute on the select inside grid cells.

```html preview
<style>
	vwc-data-grid {
		--data-grid-cell-block-size: 100%;
	}
</style>
<vwc-data-grid>
	<vwc-data-grid-row role="row" class="header" row-type="header">
		<vwc-data-grid-cell cell-type="columnheader" role="columnheader">
			data1
		</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type="columnheader">
			data2
		</vwc-data-grid-cell>
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
```

### Sortable Columns

In order for a grid column to show as sortable, use the `aria-sort` attribute on the sortable column header.

Here's an example of sorting when building the grid manually:

```html preview

<vwc-data-grid>
	<vwc-data-grid-row row-type='header'>
		<vwc-data-grid-cell cell-type='columnheader'>
			Not Sortable
		</vwc-data-grid-cell>
		<vwc-data-grid-cell cell-type='columnheader' aria-sort='none'>
			Sortable
		</vwc-data-grid-cell>
	</vwc-data-grid-row>
</vwc-data-grid>

<script>
	grid = document.querySelector('vwc-data-grid');

	data = [
		{ data1: '111', data2: '312' },
		{ data1: '211', data2: '212' },
		{ data1: '311', data2: '112' },
		{ data1: '411', data2: '612' },
		{ data1: '511', data2: '512' },
		{ data1: '611', data2: '412' }
	];

	gridRowForEntry = new Map(data.map((entry) => {
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
	}));

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

	function renderData(sortDirection = "none") {
		const sortedData = Array.from(data).sort(compare(sortDirection));
		for (const entry of sortedData) {
			grid.appendChild(gridRowForEntry.get(entry));
		}
	}

	renderData();

	grid.addEventListener('sort', (e) => {
		console.log(e.detail);
		e.target.ariaSort = e.detail.sortDirection === "ascending" ? "descending" :
			e.detail.sortDirection === "descending" ? "none" : "ascending";
		renderData(e.target.ariaSort);
	});
</script>
```

Here's an example of sorting the data-grid when building it with `rowsData`:

```html preview
<style>
	vwc-data-grid {
		max-block-size: 200px;
	}
</style>
<vwc-data-grid></vwc-data-grid>
<script>
    grid = document.querySelector('vwc-data-grid');
    grid.generateHeader = "sticky"
		const data = [
        {data1: 'data111', data2: 'data12'},
        {data1: 'data21', data2: 'data22'},
        {data1: 'data31', data2: 'data32'},
        {data1: 'data41', data2: 'data42'},
        {data1: 'data51', data2: 'data52'},
        {data1: 'data61', data2: 'data62'},
    ];
    grid.rowsData = Array.from(data);
    grid.columnDefinitions = [
				{columnDataKey: 'data1', title: 'Custom Title 1', sortable: true},
				{columnDataKey: 'data2', title: 'Custom Title 2', sortable: true},
		];
    grid.addEventListener('sort', (e) => {
        console.log(e.detail);
       const sortedColumnHeaderDef = e.target.columnDefinition;
       
       grid.columnDefinitions.forEach(column => {
					 if (column.columnDataKey !== sortedColumnHeaderDef.columnDataKey) {
							 column.sortDirection = 'none';
							 return;
					 }
					 column.sortDirection = e.detail.sortDirection === "ascending" ? "descending" :
						 e.detail.sortDirection === "descending" ? "none" : "ascending";
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
```

### Focusable child elements

If your cell contains a focusable child element that you would like to delegate focus to, use the `cellFocusTargetCallback` of the column definition to return the child element. It will now take focus instead of the cell.

If you cell contains multiple focusable elements or elements that require arrow keys to operate, combine this will `cellInternalFocusQueue` of the column definition. This will allow users to press Enter or F2 when the cell has focus to move focus into the cell and operate the elements as usual.

```html preview
<style>
	vwc-data-grid {
		--data-grid-cell-block-size: 100%;
	}
</style>
<vwc-data-grid>
  <vwc-data-grid-row row-type="header">
    <vwc-data-grid-cell cell-type="columnheader">
      Column 1
    </vwc-data-grid-cell>
    <vwc-data-grid-cell cell-type="columnheader">
      Column 2
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      Cell 1.1
    </vwc-data-grid-cell>
    <vwc-data-grid-cell id="single-action">
      <vwc-button appearance="outlined" label="Action 1" connotation="alert"></vwc-button>
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
  <vwc-data-grid-row>
    <vwc-data-grid-cell>
      Cell 2.1
    </vwc-data-grid-cell>
    <vwc-data-grid-cell id="multiple-actions">
      <vwc-button appearance="outlined" label="Action 1" connotation="alert"></vwc-button>
      <vwc-button appearance="outlined" label="Action 2" connotation="success"></vwc-button>
    </vwc-data-grid-cell>
  </vwc-data-grid-row>
</vwc-data-grid>

<script>
  document.querySelector("#single-action").columnDefinition = {
    cellFocusTargetCallback: (cell) => cell.querySelector("vwc-button")
  };
  document.querySelector("#multiple-actions").columnDefinition = {
    cellInternalFocusQueue: true,
    cellFocusTargetCallback: (cell) => cell.querySelector("vwc-button")
  };
</script>
```

### Add and remove rows dynamically

You can add and remove rows dynamically by manipulating the `rowsData`.


```html preview
<style>
	vwc-data-grid {
		max-block-size: 200px;
	}
</style>
<vwc-button label="Add item" appearance="outlined" onclick="push()"></vwc-button>
<vwc-button label="Remove last item" appearance="outlined" onclick="pop()"></vwc-button>
<vwc-button label="Remove first item" appearance="outlined" onclick="shift()"></vwc-button>
<vwc-data-grid selection-mode="single-row"></vwc-data-grid>

<script>
	let count = 1
	grid = document.querySelector('vwc-data-grid');
	grid.rowsData = [];
	grid.generateHeader = 'sticky';

	for (let i = 0; i < 3; i++){
		push();
	}
  
	function push() {
		grid.rowsData.push({
			data1: `data${count}1`,
			data2: `data${count}2`
		});
		count++
	}

	function pop() {
		grid.rowsData.pop();
	}

	function shift() {
		grid.rowsData.shift();
	}
</script>
```
