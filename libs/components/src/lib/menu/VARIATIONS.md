### Open

The `open` attribute controls the open state.

```html preview 150px
<vwc-menu open aria-label="Menu example">
	<vwc-menu-item text="Menu item 1"></vwc-menu-item>
	<vwc-menu-item text="Menu item 2"></vwc-menu-item>
</vwc-menu>
```

### Placement

The `placement` attribute controls the position of the Menu relative to its anchor element. See the [API Reference](/component/menu/code/#menu) for all possibile values.

```html preview 150px
<div style="position: relative; text-align: end;">
	<vwc-menu
		placement="left-start"
		open
		trigger="auto"
		aria-label="Menu example"
	>
		<vwc-button
			slot="anchor"
			label="Toggle Menu"
			appearance="outlined"
		></vwc-button>
		<vwc-menu-item text="Menu item 1"></vwc-menu-item>
		<vwc-menu-item text="Menu item 2"></vwc-menu-item>
	</vwc-menu>
</div>
```

<vwc-note connotation="warning" icon="warning-line" headline="Bottom Placement at Viewport side">

When the menu anchor is placed close to the start/end of the viewport, `placement` of `bottom` or `top` will not present well due to lack of space.

In such cases - prefer using `bottom-start` or `end` instead.

</vwc-note>
