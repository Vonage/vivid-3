# Breadcrumb item

Breadcrumbs helps users navigate through a website or web application by showing the current location within the hierarchy of pages,
and by providing links to navigate back to pages higher in the hierarchy.

`vwc-breadcrum-item` should be placed inside a `vwc-breadcrumb` element.

```js
<script type="module">
  import '@vonage/vivid/breadcrumb';
  import '@vonage/vivid/breadcrumb-item';
</script>
```

## Members

### Href

Use the `href` attribute to set the breadcrumb-item's link.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-breadcrumb>
	<vwc-breadcrumb-item
		text="Breadcrumb"
		href="#"></vwc-breadcrumb-item>
</vwc-breadcrumb>
```

### Text

Use the `text` attribute to set the breadcrumb-item's text.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-breadcrumb>
	<vwc-breadcrumb-item
		text="Breadcrumb"></vwc-breadcrumb-item>
</vwc-breadcrumb>
```

## Use Cases

### Common Usage

```html preview
<vwc-breadcrumb>
  <vwc-breadcrumb-item href="#" text="Breadcrumb"></vwc-breadcrumb-item>
  <vwc-breadcrumb-item href="#" text="Breadcrumb"></vwc-breadcrumb-item>
  <vwc-breadcrumb-item href="#" text="Breadcrumb"></vwc-breadcrumb-item>
  <vwc-breadcrumb-item text="Breadcrumb"></vwc-breadcrumb-item>
</vwc-breadcrumb>
```

### Multiple hidden crumbs

```html preview
<vwc-breadcrumb>
	<vwc-breadcrumb-item
		text="Breadcrumb"
		href="#"></vwc-breadcrumb-item>
	
	<vwc-breadcrumb-item
		text="..."></vwc-breadcrumb-item>
	
	<vwc-breadcrumb-item
		text="Breadcrumb" ></vwc-breadcrumb-item>
	</div>
</vwc-breadcrumb>
```
