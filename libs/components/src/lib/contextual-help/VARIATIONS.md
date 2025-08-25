The Contextual Help component is a helper wrapper that contains a Toggletip, a Button, and a default Icon. It was introduced to simplify the integration of contextual help toggletips into existing components and to ensure consistency across the entire design system.

```html preview
<vwc-contextual-help>This is an example contextual help</vwc-contextual-help>
```

## Custom Icon

Default Icon can be overridden using the `icon` slot.

```html preview
<vwc-contextual-help>
	This is an example contextual help
	<vwc-icon slot="icon" size="-6" name="info-solid"></vwc-icon>
</vwc-contextual-help>
```
