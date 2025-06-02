## Total

The `total` attribute sets the total amount of pages. If set to `0` (it's default value) both 'Previous' and 'Next' links will be disabled.

```html preview
<vwc-pagination total="20"></vwc-pagination>
```

## Selected Index

The `selected-index` attribute sets the currently selected page.

<vwc-note connotation="information">
  <vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>

The value is zero-indexed. It is set to `0` if total pages is `0`.

</vwc-note>

```html preview
<vwc-pagination total="20" selected-index="5"></vwc-pagination>
```

## Size

The `size` attribute sets the pagination's buttons sizes.

```html preview
<p>super-condensed (default)</p>
<vwc-pagination size="super-condensed" total="20"></vwc-pagination>
<p>condensed</p>
<vwc-pagination size="condensed" total="20"></vwc-pagination>
<p>normal</p>
<vwc-pagination size="normal" total="20"></vwc-pagination>
```

## Shape

The `shape` attribute sets the pagination's buttons shapes.

```html preview
<p>rounded (default)</p>
<vwc-pagination shape="rounded" total="20"></vwc-pagination>
<p>pill</p>
<vwc-pagination shape="pill" total="20"></vwc-pagination>
```

## Nav Icons

The `nav-icons` attribute changes the pagination's "Previous" and "Next" buttons to be chevron icons.

```html preview
<vwc-pagination total="20" nav-icons selected-index="2"></vwc-pagination>
```
