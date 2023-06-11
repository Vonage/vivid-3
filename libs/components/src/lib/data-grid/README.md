# data-grid

Represents a data-grid custom element.

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
Use `generate-header"` for data grid header visibility mode.

- Type: `none` | `default`| `sticky`
- Default: `default`

```html preview

<vwc-button label="None" onclick="changeHeader('none')"></vwc-button>
<vwc-button label="Sticky" onclick="changeHeader('sticky')"></vwc-button>
<vwc-button label="Default" onclick="changeHeader('default')"></vwc-button>

<vwc-data-grid></vwc-data-grid>
<script>
		function changeHeader(headerType) {
			grid.generateHeader = headerType;
		}
        
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

### selectionMode

- Type: `none` | `single-cell` | `multi-cell` | `single-row` | `multi-row`
- Default: `none`

Use the `selection-mode` attribute to specify the selection mode of the grid.

```html preview
<style>
  html { 
    block-size: 300px; 
  }
</style>
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

- Type: `ColumnDefinition[]`
- Default: `null`

The column definitions of the grid

```html preview
<vwc-data-grid></vwc-data-grid>
<script>
    grid = document.querySelector('vwc-data-grid');
    grid.columnDefinitions = [
        {columnDataKey: 'data1', title: 'Custom Title 1'},
        {columnDataKey: 'data2', title: 'Custom Title 2'},
    ];
    grid.rowsData = [
        {data1: 'data11', data2: 'data12'},
        {data1: 'data21', data2: 'data22'},
    ];
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
    grid.rowItemTemplate = html`<div>All rows will look like me!</civ>`;
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
		grid.cellItemTemplate = html`<div>All cells will look like me!</civ>`;
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
		grid.headerCellItemTemplate = html`<div>All header cells will look like me!</civ>`;
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

| Name | Type | Description |
| ---- | ---- | ----------- |
| `columndDataKey` | `string` | The property from which the data of the column is taken from |
| `title` | `string` | The title of the column |
| `headerCellTemplate` | `ViewTemplate` | A custom template for a header cell |
| `headerCellFocusTargetCallback` | `(cell) => HTMLElement` | Callback function that is called when header cell is focused |
| `cellTemplate` | `ViewTemplate` | A custom template for a cell |
| `cellFocusTargetCallback` | `(cell) => HTMLElement` | Callback function that is called when cell is focused |
| `isRowHeader` | `boolean` | Whether this column is the row header |

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

#### aria-selected

User the `aria-selected` attribute to indicate the selected state of a cell. 
For a full selection functionality the cell has to be inside a grid with the proper `selectionMode`.
The grid also adds the `aria-selected` attribute to the cell when it is selected and adds `aria-selected="false"` for none-selected cells.

```html preview
<vwc-data-grid selection-mode="single-cell">
	<vwc-data-grid-row>
		<vwc-data-grid-cell aria-selected="true">Cell 1</vwc-data-grid-cell>
		<vwc-data-grid-cell aria-selected="false">Cell 2</vwc-data-grid-cell>
		<vwc-data-grid-cell>Cell 3</vwc-data-grid-cell>
	</vwc-data-grid-row>
</vwc-data-grid>
```

## Slots

### default

The default slot, where all the content is rendered.

## Events

### row-focused

Fires when a row is focused.

### cell-focused

Fires when a cell is focused.

## Accessibility

Keyboard events and focus handling are compliant with WACG standards.

Usage of `aria-selected` hints on a selectable element and its selection status.

## Use Cases

### Select in a grid

In order for the select popup to show correctly in the grid, use the `fixed-dropdown` attribute on the select inside grid cells.

```html preview
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
