## Default Configuration

The Contextual Help component is a helper wrapper that contains a [Toggletip](/components/contextual-help/), a [Button](/components/button/), and a default [Icon](/components/icon/). It was introduced to simplify the integration of contextual help into existing components and to ensure consistency across Vivid.

```html preview
<vwc-contextual-help>This is an example contextual help</vwc-contextual-help>
```

## Custom Icon

Default Icon can be overridden using the `icon` slot.

```html preview
<vwc-contextual-help>
	This is an example contextual help
	<vwc-icon slot="icon" name="info-solid"></vwc-icon>
</vwc-contextual-help>
```
