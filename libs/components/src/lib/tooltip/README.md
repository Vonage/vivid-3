# Tooltip

A tooltip displays additional, non-essential, informative message, description or explanation to a focusable element upon hover or focus. It appears after a short delay and disappears when `Escape` key is pressed, element loses focus or hovered off. 

```js
<script type="module">
  import '@vonage/vivid/tooltip';
</script>
```

## Members

### Anchor

The tooltip should have an `anchor` attribute with the anchor's id.

The tooltip should be placed on interactive controls, elements that can be hovered over or focusable (e.g. button, checkbox, input text etc.).
The tooltip can't be placed on non-interactive elements such as paragraph or plain div.
Do not target non-interactive controls as a tooltip's anchor (such as non-focusable / disabled elements).

- Type: `string`
- Default: `undefined`

```html preview center
<vwc-button id="button" icon="help-line" shape="pill"></vwc-button>
<vwc-tooltip anchor="button" text="I'm a tooltip"></vwc-tooltip>
```

### Text

Use the `text` attribute to add text content to the tooltip.

Because the tooltip itself never receives focus and is not in the tabbing order, a tooltip can not contain interactive elements like links, inputs, or buttons

- Type: `string`
- Default: `undefined`

### Placement

Use the `placement` attribute to set the placement of the tooltip around the anchor.

- Type: `'top'` | `'top-start'` | `'top-end'` | `'right'` | `'right-start'` | `'right-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'`| `'left'` | `'left-start'`| `'left-end'`
- Default: `'left'`

```html preview center
<vwc-button id="anchor" appearance='outlined' label='This is an anchor'></vwc-button>
<vwc-tooltip anchor="anchor" text="right" placement="right"></vwc-tooltip>
<vwc-tooltip anchor="anchor" text="left" placement="left"></vwc-tooltip>
<vwc-tooltip anchor="anchor" text="top" placement="top"></vwc-tooltip>
<vwc-tooltip anchor="anchor" text="bottom" placement="bottom"></vwc-tooltip>
```

## CSS Variables

### Inline Size

Use the `--tooltip-inline-size` variable to set the tooltip's inline size.

- Type: `Number`
- Default: `auto`

```html preview center
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
  .tooltip {
    --tooltip-inline-size: 160px;
  }
</style>

<vwc-button id="button" icon="info-line" shape="pill"></vwc-button>
<vwc-tooltip anchor="button" text="I'm a tooltip with long text so my inline size is 160px" class="tooltip"></vwc-tooltip>
```

## Caveat

Document elements display precedence is formed by the imaginary z-axis [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context), commonly by order of which elements are rendered and special properties (e.g. _z-index_).
Tooltip component is a low level element, unaware of its document context, but is, in most cases, required to overlay on top of all elements.

A common practice used in apps / frameworks to promote a tooltip component to top other elements z-axis, is to utilise a service that dynamically appends a tooltip component to the end of the body element, when called for.

This helps ensure elements don't render over top a tooltip undesirebly.
