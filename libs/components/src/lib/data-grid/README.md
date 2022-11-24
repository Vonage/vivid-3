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
