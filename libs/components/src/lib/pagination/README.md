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

### Selected Index
Set the `selectedIndex` attribute to change the pagination's currently selected index. Note that this is a Zero Index counter. It is set to -1 if total pages is 0.

- Type: `number`
- Default: `0`

```html preview
<vwc-pagination total="20"></vwc-pagination>
<script>
		pagination = document.querySelector('vwc-pagination');
		pagination.selectedIndex = 5;
</script>
```

### Nav Icons

Set the `navIcons` attribute to change the pagination's navigation buttons type.

- Type: `Boolean`
- Default: `false`

```html preview blocks
<vwc-pagination total="20"></vwc-pagination>
<vwc-pagination total="20" nav-icons></vwc-pagination>
```

### Pages List
`pagesList` is an immutable array that represents the current pagination's state.

## Events

### pagination-change
Listen to the `pagination-change` event to get notified when the pagination's state changes.

```html preview
<vwc-pagination id="pagination" total="20"></vwc-pagination>
<div id="output"></div>
<script>
		pagination = document.querySelector('#pagination');
		pagination.addEventListener('pagination-change', (e) => {
			document.querySelector('#output').innerHTML = JSON.stringify(e.detail);
		});
		setTimeout(() => pagination.shadowRoot.querySelectorAll('.vwc-pagination-button').item(2).click(), 100);
</script>
```
