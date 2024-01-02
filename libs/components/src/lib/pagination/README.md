# Pagination

The pagination component is used to navigate through a series of pages.

```js
<script type="module">
	import '@vonage/vivid/pagination';
</script>
```

```html preview
<vwc-pagination total="10"></vwc-pagination>
```

## Members

### Total

Set the `total` attribute to change the pagination's view total pages.

- Type: `number`
- Default: `0`

```html preview
<vwc-pagination total="20"></vwc-pagination>
```

### Size

Set the `size` attribute to change the pagination's buttons sizes.

- Type: `super-condensed` | `condensed` | `normal`
- Default: `super-condensed`

```html preview blocks
<vwc-pagination size="super-condensed" total="20"></vwc-pagination>
<vwc-pagination size="condensed" total="20"></vwc-pagination>
<vwc-pagination size="normal" total="20"></vwc-pagination>
```

### Shape

Set the `shape` attribute to change the pagination's buttons shapes.

- Type: `rounded` | `pill`
- Default: `rounded`

```html preview blocks
<vwc-pagination shape="rounded" total="20"></vwc-pagination>
<vwc-pagination shape="pill" total="20"></vwc-pagination>
```

### Selected Index
Set the `selected-index` attribute to change the pagination's currently selected index. Note that the value is zero-indexed. It is set to -1 if total pages is 0.

- Type: `number`
- Default: `0`

```html preview
<vwc-pagination total="20" selected-index="5"></vwc-pagination>
```

### Nav Icons

Set the `nav-icons` attribute to change the pagination's navigation buttons type.

- Type: `Boolean`
- Default: `false`

```html preview blocks
<vwc-pagination total="20"></vwc-pagination>
<vwc-pagination total="20" nav-icons></vwc-pagination>
```

## Properties

<div class="table-wrapper">

| Name        | Type       | Default | Description                                                        |
| ----------- | ---------- | ------- | ------------------------------------------------------------------ |
| `pagesList` | `number[]` | `[]`    | An immutable array that represents the current pagination's state. |

</div>

## Events

<div class="table-wrapper">

| Name                | Description         |
| ------------------- |---------------------------------- |
| `pagination-change` | Listen to the `pagination-change` event to get notified when the pagination's state changes. Returns detail{selectedIndex, total, oldIndex} |  


</div>


## Use Cases

### With border

```html preview
<style>
vwc-pagination#outlined {
    border: 1px solid var(--vvd-color-neutral-400);
    padding: 6px;
    border-radius: 24px;
    display: inline-block;
}
</style>

<vwc-pagination id="outlined" total="10" shape="pill"></vwc-pagination>
```
