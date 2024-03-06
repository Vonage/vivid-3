# Breadcrumb

Breadcrumbs helps users navigate through a website or web application by showing the current location within the hierarchy of pages,
and by providing links to navigate back to pages higher in the hierarchy.

```js
<script type="module">import '@vonage/vivid/breadcrumb';</script>
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
	<vwc-breadcrumb-item text="Breadcrumb" href="#"></vwc-breadcrumb-item>
	<vwc-breadcrumb-item text="..."></vwc-breadcrumb-item>
	<vwc-breadcrumb-item text="Breadcrumb"></vwc-breadcrumb-item>
</vwc-breadcrumb>
```
