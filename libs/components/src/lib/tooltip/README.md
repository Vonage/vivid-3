# Tooltip

A tooltip is a brief, informative message or descriptions or explanations for their paired element. Tooltips in general are less accessible so be sure to follow our [accessibility recommendation](#accessibility) in the docs.

```js
<script type="module">
  import '@vonage/vivid/tooltip';
</script>
```

## Members

### Text

The tooltip is a description and therefor, the tooltip itself can not be interactive and contains only text.

- Type: `string`
- Default: `undefined`

### Open

Proxies the [`open` property to the underlying popup element](../../components/popup#open).

```html preview center
<vwc-button id="button" icon="info-line" shape="pill" aria-describedby="tooltip"></vwc-button>
<vwc-tooltip id="tooltip" anchor="button" text="Focus or hover to open."></vwc-tooltip>

<script>
  button.addEventListener('mouseover', ()=> tooltip.open = true);
  button.addEventListener('mouseout', ()=> tooltip.open = false);

  button.addEventListener('focusin', ()=> tooltip.open = true);
  button.addEventListener('focusout', ()=> tooltip.open = false);
</script>
```

### Anchor

The tooltip can be placed on interactive controls (things that can be hovered or focusable) such as: button, checkbox, input text.  
The tooltip can't be placed on non-interactive elements such as paragraph or plain div.  
Do not target non-interactive controls as a tooltip's anchor (such as non-focusable / disabled elements).

Proxies the [`anchor` property to the underlying popup element](../../components/popup#anchor).

```html preview center
<vwc-button id="anchor" icon="help-line" shape="pill" aria-describedby="tooltip"></vwc-button>
<vwc-tooltip id="tooltip" anchor="anchor" text="I'm a tooltip" open></vwc-tooltip>
```

### Placement

Proxies the [`placement` property to the underlying popup element](../../components/popup#placement).

```html preview center
<style>
  vwc-tooltip {
    --tooltip-inline-size: 100px;
  }
</style>
<vwc-button id="anchor" appearance='outlined' label='This is an anchor'></vwc-button>
<vwc-tooltip anchor="anchor" open text="right" placement="right"></vwc-tooltip>
<vwc-tooltip anchor="anchor" open text="left" placement="left"></vwc-tooltip>
<vwc-tooltip anchor="anchor" open text="top" placement="top"></vwc-tooltip>
<vwc-tooltip anchor="anchor" open text="bottom" placement="bottom"></vwc-tooltip>
```

## CSS Variables

### Inline Size

Use the `--tooltip-inline-size` variable to set the tooltip's inline size.

- Type: `Number`
- Default: `240px`

```html preview center
<style>
  #tooltip {
    --tooltip-inline-size: 200px;
  }
</style>

<vwc-button id="button" icon="info-line" shape="pill" aria-describedby="tooltip"></vwc-button>
<vwc-tooltip open id="tooltip" anchor="button" text="My inline size is 200px"></vwc-tooltip>
```

## Accessibility

- Tooltip has a `role` tooltip.
- Be sure to add `aria-describedby= "tooltip's id"` on the tooltip trigger element for screen readers readability.
- The trigger of the tooltip must be focusable and interactive.
- A tooltip cannot contain interactive or focusable content.
- The escape key hides the tooltip when the anchor is focused.
- Tooltip should show on mouse hover and keyboard focus.
- Tabbing to the element should display the tooltip.

## Use Cases

### Usage inside text

```html preview
<p>
  Text with tooltip - press the question mark
  <vwc-button id="button" icon="help-line" shape="pill" aria-describedby="tooltip"></vwc-button>
  more text after tooltip.
</p>

<vwc-tooltip id="tooltip" anchor="button" placement="bottom-end" text="I'm the tooltip content"></vwc-tooltip>

<script>
  button.addEventListener('mouseover', ()=> tooltip.open = true);
  button.addEventListener('mouseout', ()=> tooltip.open = false);

  button.addEventListener('focusin', ()=> tooltip.open = true);
  button.addEventListener('focusout', ()=> tooltip.open = false);
</script>
```

## Caveat

Document elements display precedence is formed by the imaginary z-axis [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context), commonly by order of which elements are rendered and special properties (e.g. _z-index_).
Tooltip component is a low level element, unaware of its document context, but is, in most cases, required to overlay on top of all elements.

A common practice used in apps / frameworks to promote a tooltip component to top other elements z-axis, is to utilise a service that dynamically appends a tooltip component to the end of the body element, when called for.

This helps ensure elements don't render over top a tooltip undesirebly.
