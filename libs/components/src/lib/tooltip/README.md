# Tooltip

A tooltip displays additional, non-essential, informative message, description or explanation to a focusable element upon hover or focus. It disappears when the element loses focus, is hovered off, or when the `Escape` key is pressed

```js
<script type="module">import '@vonage/vivid/tooltip';</script>
```

```html preview center 150px
<vwc-tooltip text="I'm a tooltip">
	<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
</vwc-tooltip>
```

## Members

### Text

Use the `text` attribute to set the text content to the tooltip.

Because the tooltip itself never receives focus and is not in the tabbing order, a tooltip can not contain interactive elements like links, inputs, or buttons.

- Type: `string`
- Default: `undefined`

### Placement

Use the `placement` attribute to set the placement of the tooltip around the anchor.

- Type: `'top'` | `'top-start'` | `'top-end'` | `'right'` | `'right-start'` | `'right-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'`| `'left'` | `'left-start'`| `'left-end'`
- Default: `'left'`

```html preview center 400px
<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(5, auto);
		gap: 4px;
	}
</style>
<div class="grid">
	<div></div>
	<vwc-tooltip text="top-start" placement="top-start">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="top" placement="top">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="top-end" placement="top-end">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
	</vwc-tooltip>
	<div></div>

	<vwc-tooltip text="left-start" placement="left-start">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
	</vwc-tooltip>
	<div></div>
	<div></div>
	<div></div>
	<vwc-tooltip text="right-start" placement="right-start">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
	</vwc-tooltip>

	<vwc-tooltip text="left" placement="left">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
	</vwc-tooltip>
	<div></div>
	<div></div>
	<div></div>
	<vwc-tooltip text="right" placement="right">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
	</vwc-tooltip>

	<vwc-tooltip text="left-end" placement="left-end">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
	</vwc-tooltip>
	<div></div>
	<div></div>
	<div></div>
	<vwc-tooltip text="right-end" placement="right-end">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
	</vwc-tooltip>

	<div></div>
	<vwc-tooltip text="bottom-start" placement="bottom-start">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="bottom" placement="bottom">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
	</vwc-tooltip>
	<vwc-tooltip text="bottom-end" placement="bottom-end">
		<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
	</vwc-tooltip>
	<div></div>
</div>
```

### Anchor

It's best to use the [`anchor` slot](#anchor-1) to set the anchor, but you can also use the `anchor` member.

Either set it to the `id` of the anchor element or pass the anchor element itself.

- Type: `string | HTMLElement`
- Default: `undefined`

```html preview center 150px
<vwc-button id="button" icon="help-line" shape="pill"></vwc-button>
<vwc-tooltip anchor="button" text="I'm a tooltip"></vwc-tooltip>

<vwc-button id="button2" icon="help-line" shape="pill"></vwc-button>
<vwc-tooltip id="tooltip2" text="My anchor is an HTMLElement"></vwc-tooltip>

<script>
	document.querySelector('#tooltip2').anchor =
		document.querySelector('#button2');
</script>
```

## Slots

### Anchor

Tooltips need to be anchored to an element. Place the anchor element inside the `anchor` slot of the tooltip.

Do not use a non-interactive element (`div`, `p`, etc.) as an anchor, as the tooltip will not be accessible to keyboard or screen reader users.

```html preview center 150px
<vwc-tooltip text="I'm a tooltip">
	<vwc-button slot="anchor" icon="help-line" shape="pill"></vwc-button>
</vwc-tooltip>
```

## CSS Variables

### Max Inline Size

Use the `--tooltip-max-inline-size` variable to set the tooltip's max inline size.

- Default: `30ch`

```html preview center 300px
<style>
	.tooltip {
		--tooltip-max-inline-size: 40ch;
	}
</style>

<vwc-tooltip
	text="Turn on to receive notifications for important updates and alerts directly to your email or mobile device."
	class="tooltip"
>
	<vwc-button slot="anchor" icon="info-line" shape="pill"></vwc-button>
</vwc-tooltip>
```

### Deprecated CSS Variable: Inline Size

The `--tooltip-inline-size` CSS variable is deprecated (as of 05/24). Use `--tooltip-max-inline-size` instead to limit the inline size.
`--tooltip-inline-size` is still functional in the component but will be removed in a future major release.
This will be communicated when it's removal becomes a release candidate at the end of the support period.

## Caveat

Document elements display precedence is formed by the imaginary z-axis [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context), commonly by order of which elements are rendered and special properties (e.g. _z-index_).
Tooltip component is a low level element, unaware of its document context, but is, in most cases, required to overlay on top of all elements.

A common practice used in apps / frameworks to promote a tooltip component to top other elements z-axis, is to utilise a service that dynamically appends a tooltip component to the end of the body element, when called for.

This helps ensure elements don't render over top a tooltip undesirebly.
