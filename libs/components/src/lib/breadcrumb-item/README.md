# Breadcrumb item

`vwc-breadcrum-item`s should be placed inside a `vwc-breadcrumb` element.

```js
<script type="module">import '@vonage/vivid/breadcrumb-item';</script>
```

## Members

### Href

Use the `href` attribute to set the breadcrumb-item's link.

{% clientSideNavigationHint %}

- Type: `string`
- Default: `undefined`

```html preview
<vwc-breadcrumb>
	<vwc-breadcrumb-item text="Breadcrumb" href="#"></vwc-breadcrumb-item>
</vwc-breadcrumb>
```

### Text

Use the `text` attribute to set the breadcrumb-item's text.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-breadcrumb>
	<vwc-breadcrumb-item text="Breadcrumb"></vwc-breadcrumb-item>
</vwc-breadcrumb>
```
