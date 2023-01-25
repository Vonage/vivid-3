# data-grid

Represents a data-grid custom element.

```js
<script type="module">import '@vonage/vivid/data-grid';</script>
```

```html preview
<vwc-data-grid></vwc-data-grid>
<script>
    const grid = document.querySelector('vwc-data-grid');
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
        
    const grid = document.querySelector('vwc-data-grid');
    
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


### noTabbing

- Type: `boolean`
- Default: `false`

When true the component will not add itself to the tab queue.

```html preview
<vwc-button label="Tabbing" onclick="changeTabbing(false)"></vwc-button>
<vwc-button label="No Tabbing" onclick="changeTabbing(true)"></vwc-button>

<div id="active-element-content-display">
	<p>Hit Tab key to browse the tab queue. When in `noTabbing` mode, grid will never be focused.</p>
	<div id="active-element-content">Grid not focused</div>
</div>
<vwc-data-grid></vwc-data-grid>
<script>
	function changeTabbing(tabbing) {
		grid.noTabbing = tabbing;
	}
    
	const grid = document.querySelector('vwc-data-grid');
	grid.rowsData = [
			{data1: 'tabs', data2: 'will'},
			{data1: 'not', data2: 'work'},
	];
	grid.addEventListener('focusin', () => {
		document.getElementById('active-element-content').innerText = 'Grid Focused';
	});
	grid.addEventListener('focusout', () => {
		document.getElementById('active-element-content').innerText = 'Grid Not Focused';
	});
    grid.addEventListener('cell-focused', e => {
       console.log(e.detail.innerText); 
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
    const grid = document.querySelector('vwc-data-grid');
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
    const grid = document.querySelector('vwc-data-grid');
    grid.columnDefinitions = [
        {columnDataKey: 'data1', title: 'Data 1'},
        {columnDataKey: 'data2', title: 'Data 2'},
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

The template used to render rows.

```html preview
<vwc-data-grid></vwc-data-grid>
<script>
    // TODO:: add example
    const grid = document.querySelector('vwc-data-grid');
    grid.rowsData = [
        {data1: 'data11', data2: 'data12'},
        {data1: 'data21', data2: 'data22'},
    ];
</script>
```

### cellItemTemplate

- Type: `ViewTemplate`
- Default: DataGridCellTemplate

The template used to render cells in generated rows.

```html preview
<vwc-data-grid></vwc-data-grid>
<script>
    // TODO:: add example
    const grid = document.querySelector('vwc-data-grid');
    grid.rowsData = [
        {data1: 'data11', data2: 'data12'},
        {data1: 'data21', data2: 'data22'},
    ];
</script>
```

### headerCellItemTemplate

- Type: `ViewTemplate`
- Default: DataGridCellTemplate

The template used to render cells in generated header rows.

```html preview
<vwc-data-grid></vwc-data-grid>
<script>
    // TODO:: add example
    const grid = document.querySelector('vwc-data-grid');
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
<vwc-data-grid></vwc-data-grid>
<script>
    // TODO:: add example with text-field and change focus button to change the focus?
    const grid = document.querySelector('vwc-data-grid');
    grid.rowsData = [
        {data1: 'data11', data2: 'data12'},
        {data1: 'data21', data2: 'data22'},
    ];
</script>
```

### focusColumnIndex

- Type: `number`
- Default: 0

The index of the column that will be focused the next time the grid is focused inside `focusRowIndex`. If grid is already focused, changing this value will result in changing the focused column.

```html preview
<vwc-data-grid></vwc-data-grid>
<script>
    // TODO:: add example with text-field and change focus button to change the focus?
    const grid = document.querySelector('vwc-data-grid');
    grid.rowsData = [
        {data1: 'data11', data2: 'data12'},
        {data1: 'data21', data2: 'data22'},
    ];
</script>
```

### rowElementTag

- Type: `string`
- Default: `undefined`

The element tag for header row

```html preview
<vwc-data-grid></vwc-data-grid>
<script>
    const grid = document.querySelector('vwc-data-grid');
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

## Slots

### default

The default slot, where all the content is rendered.

## Events

### row-focused

Fires when a row is focused.

### cell-focused

Fires when a cell is focused.

## Methods

### handleFocusout

### handleCellFocus

### handleKeydown

## Accessibility

Keyboard events and focus handling are compliant with WACG standards.
