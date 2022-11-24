# data-grid

Represents a data-grid custom element.

```js
<script type="module">import '@vonage/vivid/data-grid';</script>
```

```html preview
<vwc-data-grid></vwc-data-grid>
<script>
    const dataGrid = window.x = document.querySelector('vwc-data-grid');
    dataGrid.rowsData = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
        { name: 'Mary', age: 28 },
    ];
</script>
```

## Members

## Slots

## CSS Variables

## Events

## Methods

## Accessibility

## Use Cases

### Selectable Rows

```html preview
<vwc-data-grid></vwc-data-grid>
<script>
    const dataGrid = window.x = document.querySelector('vwc-data-grid');
    dataGrid.rowsData = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
        { name: 'Mary', age: 28 },
    ];
    dataGrid.selectableRows = true;
    
</script>
```

### Selectable Cells

```html preview
<vwc-data-grid></vwc-data-grid>
<script>
    const dataGrid = window.x = document.querySelector('vwc-data-grid');
    dataGrid.rowsData = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
        { name: 'Mary', age: 28 },
    ];
    dataGrid.selectableCells = true;
    
</script>
```

### Sort

```html preview
<vwc-data-grid></vwc-data-grid>
<vwc-button label="Sort by Age Ascending" onclick="sort('age', 'asc')"></vwc-button>
<vwc-button label="Sort by Age Decending" onclick="sort('age')"></vwc-button>
<vwc-button label="Sort by Name Ascending" onclick="sort('name', 'asc')"></vwc-button>
<vwc-button label="Sort by Name Decending" onclick="sort('name')"></vwc-button>
<vwc-button label="Sort by Name and Age" onclick="multiSort()"></vwc-button>

<script>
    const dataGrid = window.x = document.querySelector('vwc-data-grid');
    dataGrid.rowsData = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
        { name: 'Anne', age: 28 },
        { name: 'Mary', age: 28 },
        { name: 'Anne', age: 25 },
    ];
    
    function sort(by, order) {
        dataGrid.rowsData = dataGrid.rowsData.sort((a, b) => {
            if (a[by] > b[by]) {
                return order === 'asc' ? 1 : -1;
            }
            if (a[by] < b[by]) {
                return order === 'asc' ? -1 : 1;
            }
            return 0;
        });
    }
    function multiSort() {
        dataGrid.rowsData = dataGrid.rowsData.sort((a, b) => {
            let diff = 0;
            if (a.name > b.name) {
                diff = 1;
            }
            if (a.name < b.name) {
                diff = -1;
            }
            
            if (diff === 0) {
                if (a.age > b.age) {
                    diff = 1;
                }
                if (a.age < b.age) {
                    diff = -1;
                }
            }
            return diff;
        });
    }
    
</script>
```
