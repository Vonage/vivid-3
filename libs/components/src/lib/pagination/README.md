# pagination

Represents a pagination custom element.

```js
<script type="module">import '@vonage/vivid/pagination';</script>
```

```html preview
<vwc-pagination total="10"></vwc-pagination>
```

## Members

### Total

Set the `total` attribute to change the pagination's view total pages.

Type: `number`
Default: `0`

```html preview
<vwc-pagination total="20"></vwc-pagination>
```

### Selected Index
Set the `selectedIndex` attribute to change the pagination's currently selected index. Note that this is a Zero Index counter. It is set to -1 if total pages is 0.

Type: `number`
Default: `0`

```html preview
<vwc-pagination total="20"></vwc-pagination>
<script>
		pagination = document.querySelector('vwc-pagination');
		pagination.selectedIndex = 5;
</script>
```

### Nav Icons

Set the `navIcons` attribute to change the pagination's navigation buttons type.

Type: `Boolean`
Default: `false`

```html preview
<vwc-pagination total="20"></vwc-pagination>
<vwc-pagination total="20" nav-icons></vwc-pagination>
```

### Pages List
`pagesList` is an immutable array that represents the current pagination's state.

## CSS Variables

## Events

### vwc-pagination-change
Listen to the `vwc-pagination-change` event to get notified when the pagination's state changes.

```html preview
<vwc-pagination total="20"></vwc-pagination>
<div id="output"></div>
<script>
		pagination = document.querySelector('vwc-pagination');
		pagination.addEventListener('vwc-pagination-change', (e) => {
			document.querySelector('#output').innerHTML = JSON.stringify(e.detail);
		});
</script>
```
