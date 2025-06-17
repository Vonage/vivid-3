# Popup

Popup are used to display a message or notification to the user and are displayed on top of all other web page elements.
Popup's goal is to provide additional, helpful content. To trigger the Popup, it should be paired with an anchor (e.g., a button).

```js
<script type="module">import '@vonage/vivid/popup';</script>
```

## Members

### Anchor

Use the `anchor` property to set the anchor element of the popup.

The popup is positioned in a fixed manner to its anchor.

- Type: `HTMLElement`
- Default: `undefined`

```html preview center 150px
<span id="anchor">⚓️</span>
<vwc-popup id="popup" open>This is a popup.</vwc-popup>
<script>
	popup.anchor = anchor;
</script>
```

### Open

Use the `open` attribute to indicate whether the popup is open.

- Type: `boolean`
- Default: `false`

```html preview center 150px
<vwc-button id="anchor" appearance="outlined" label="Click me!"></vwc-button>
<vwc-popup id="popup" open>
	<vwc-layout gutters="small">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua.
	</vwc-layout>
</vwc-popup>

<script>
	popup.anchor = anchor;
	anchor.addEventListener('click', () => (popup.open = !popup.open));
</script>
```

### Dismissible

Add the `dismissible` attribute to add a close button to the popup.

- Type: `boolean`
- Default: `false`

```html preview center 150px
<vwc-button id="anchor" appearance="outlined" label="Click on me!"></vwc-button>
<vwc-popup id="popup" open dismissible>
	<vwc-layout gutters="small">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	</vwc-layout>
</vwc-popup>

<script>
	popup.anchor = anchor;
	anchor.addEventListener('click', () => (popup.open = !popup.open));
</script>
```

### Arrow

Add the `arrow` attribute to add a small triangle to indicate the trigger element.

- Type: `boolean`
- Default: `false`

```html preview center 150px
<vwc-icon id="anchor" name="info-line"></vwc-icon>
<vwc-popup id="popup" open arrow>
	<vwc-layout gutters="small" style="200px">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua.
	</vwc-layout>
</vwc-popup>
<script>
	popup.anchor = anchor;
</script>
```

### Alternate

Add the `alternate` attribute to set the color-scheme to dark or light (depending on current user's system settings).

- Type: `boolean`
- Default: `false`

```html preview center 150px
<vwc-icon id="anchor" name="info-line"></vwc-icon>
<vwc-popup id="popup" open alternate>
	<vwc-layout gutters="small" style="200px">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua.
	</vwc-layout>
</vwc-popup>
<script>
	popup.anchor = anchor;
</script>
```

### Placement

Use the `placement` attribute to set the placement of the popup around the anchor.

- Type: `'top'` | `'top-start'` | `'top-end'` | `'right'` | `'right-start'` | `'right-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'`| `'left'` | `'left-start'`| `'left-end'`
- Default: `''`

```html preview center 150px
<style>
	.square {
		inline-size: 270px;
		block-size: 100px;
		background-color: var(--vvd-color-neutral-50);
	}

	vwc-text {
		white-space: nowrap;
	}
</style>

<div id="anchor" class="square"></div>

<vwc-popup class="popup" open placement="right-end">right-end</vwc-popup>
<vwc-popup class="popup" open placement="right">right</vwc-popup>
<vwc-popup class="popup" open placement="right-start">right-start</vwc-popup>
<vwc-popup class="popup" open placement="left-end">left-end</vwc-popup>
<vwc-popup class="popup" open placement="left">left</vwc-popup>
<vwc-popup class="popup" open placement="left-start">left-start</vwc-popup>
<vwc-popup class="popup" open placement="top-end">top-end</vwc-popup>
<vwc-popup class="popup" open placement="top">top</vwc-popup>
<vwc-popup class="popup" open placement="top-start">top-start</vwc-popup>
<vwc-popup class="popup" open placement="bottom-end">bottom-end</vwc-popup>
<vwc-popup class="popup" open placement="bottom">bottom</vwc-popup>
<vwc-popup class="popup" open placement="bottom-start">bottom-start</vwc-popup>
<script>
	document
		.querySelectorAll('.popup')
		.forEach((popup) => (popup.anchor = anchor));
</script>
```

### Placement Strategy

Controls the placement strategy of the popup. The `Flip` strategy will flip the popup to the opposite side if there is not enough space. The `AutoPlacementHorizontal` and `AutoPlacementVertical` strategies will place the popup on the side with the most space in the respective axis.

- Type: `PlacementStrategy.Flip` | `PlacementStrategy.AutoPlacementHorizontal` | `PlacementStrategy.AutoPlacementVertical`
- Default: `PlacementStrategy.Flip`

### Animation Frame

Whether to update the position of the floating element on every animation frame if required.

See the [Floating UI Documentation](https://floating-ui.com/docs/autoUpdate#animationframe) for more information.

- Type: `boolean`
- Default: `false`

### Strategy

Use the `strategy` attribute to set the placement strategy.

- Type: `'fixed'` | `'absolute'`
- Default: `'fixed'`

```html preview center 150px
<span id="anchor">⚓️</span>
<vwc-popup id="popup" strategy="absolute" open>This is a popup.</vwc-popup>
<script>
	popup.anchor = anchor;
</script>
```

### Offset

Use the `offset` attribute to add an extra gap (in `px`) between the popup and the anchor element.

- Type: `number`
- Default: `null`

```html preview center 150px
<span id="anchor">⚓️</span>
<vwc-popup id="popup" offset="12" open>This is a popup.</vwc-popup>
<script>
	popup.anchor = anchor;
</script>
```

## CSS Variables

### Z-Index

Use the `--_popup-z-index` CSS variable to set the z-index of the popup.

- Default: `10`

```html preview 100px
<style>
	#anchor {
		text-align: center;
	}
	#popup {
		--_popup-z-index: 12;
	}
	#block {
		position: relative;
		z-index: 11;
		background: black;
		block-size: 50px;
	}
</style>
<div id="anchor">⚓️</div>
<vwc-popup id="popup" strategy="absolute" open>This is a popup.</vwc-popup>
<div id="block"></div>
<script>
	popup.anchor = anchor;
</script>
```

### Display

Use the `--_popup-display` CSS variable to change the `display` of the popup.

When display is not set to `contents`, the host element will be considered an empty element that is not removed the document flow, therefore
affecting things like flexbox layout.

The default should really be `contents`, but is not due to backwards compatibility.

- Default: `inline`

```html preview 100px
<style>
	.container {
		display: flex;
		gap: 100px;
	}
	#popup {
		--_popup-display: contents;
	}
</style>
<div class="container">
	<span>◼️</span>
	<span id="anchor">⚓️</span>
	<vwc-popup id="popup" strategy="absolute" open>This is a popup.</vwc-popup>
	<span>◼️</span>
</div>
<script>
	popup.anchor = anchor;
</script>
```

## Methods

<div class="table-wrapper">

| Name             | Returns | Description               |
| ---------------- | ------- | ------------------------- |
| `updatePosition` | `void`  | Updates popup's position. |

</div>

## Caveat

Document elements display precedence is formed by the imaginary z-axis [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context), commonly by order of which elements are rendered and special properties (e.g. _z-index_).
Popup component is a low level element, unaware of its document context, but is, in most cases, required to overlay on top of all elements.

A common practice used in apps / frameworks to promote a popup component to top other elements z-axis, is to utilise a service that dynamically appends a popup component to the end of the body element, when called for.

This helps ensure elements don't render over top a popup undesirebly.
