# Tooltip

A tooltip is a brief, informative message or descriptions or explanations for their paired element. Tooltips in general are less accessible so be sure to follow our accessibility recommendation in the docs.

```js
<script type="module">
    import '@vonage/vivid/tooltip';
</script>
```

## Anchor
The tooltip can be placed on interactive controls (things that can be clicked or focusable) such as: button, checkbox, input text.
The tooltip can't be placed on non-interactive elements such as paragraph or plain div.  
Do not target non-interactive controls as a tooltip's anchor (such as non-focusable / disabled elements).

- Type: `string`
- Default: `undefined`

```html preview
<vwc-button id="anchor" icon="help-line" shape="pill" aria-describedby="tooltip"></vwc-button>
<vwc-tooltip id="tooltip" anchor="anchor" text="I'm a tooltip" open></vwc-tooltip>
```
## Text
The tooltip is a description and therefor, the tooltip itself can not be interactive. `vwc-tooltip` contains only text.

- Type: `string`
- Default: `undefined`

## Open
Use the `open` attribute to indicate whether the tooltip is open.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-button id="button" icon="info-line" shape="pill" aria-describedby="tooltip"></vwc-button>
<vwc-tooltip id="tooltip" anchor="button" text="Click on the icon to toggle"></vwc-tooltip>

<script>
  button.addEventListener('click', () => tooltip.open = !tooltip.open);
</script>
```

## Corner

Use the `corner` attribute to set the placement of the tooltip around the anchor.

- Type: `'top'` | `'top-start'` | `'top-end'` | `'right'` | `'right-start'` | `'right-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'`| `'left'` | `'left-start'`| `'left-end'`
- Default: `'left'`

```html preview center
<style>
  vwc-tooltip {
    --tooltip-inline-size: 100px;
  }
</style>
<vwc-button id="anchor" appearance='outlined' label='This is an anchor'></vwc-button>
<vwc-tooltip anchor="anchor" open text="right" corner="right"></vwc-tooltip>
<vwc-tooltip anchor="anchor" open text="left" corner="left"></vwc-tooltip>
<vwc-tooltip anchor="anchor" open text="top" corner="top"></vwc-tooltip>
<vwc-tooltip anchor="anchor" open text="bottom" corner="bottom"></vwc-tooltip>
```
## Usage inside text
```html preview
<vwc-text font-face="body-1" tight>
  Text with tooltip - press the question mark
  <vwc-button id="button" icon="help-line" shape="pill" aria-describedby="tooltip"></vwc-button>
  more text after tooltip.
</vwc-text>

<vwc-tooltip open id="tooltip" anchor="button" corner="bottom-end" text="I'm the tooltip content"></vwc-tooltip>

<script>
  button.addEventListener('click', () => tooltip.open = !tooltip.open);
</script>
```

## Accessibility
Be sure to add `aria-describedby="vwc-tooltip's ID"` on the tooltip trigger element for screen readers readability.

```js
<vwc-button id="anchor" aria-describedby="tooltip"></vwc-button>
<vwc-tooltip id="tooltip" anchor="anchor"></vwc-tooltip>
```

## CSS Custom Properties

### Inline Size

Use the `--tooltip-inline-size` variable to set the tooltip's inline size.

- Type: `Number`
- Default: `240px`

```html preview
<style>
  #tooltip {
    --tooltip-inline-size: 200px;
  }
</style>

<vwc-button id="button" icon="info-line" shape="pill" aria-describedby="tooltip"></vwc-button>
<vwc-tooltip open id="tooltip" anchor="button" text="My inline size is 200px"></vwc-tooltip>
```

