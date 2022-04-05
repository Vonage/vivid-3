# vwc-tooltip

A Tooltip is a page overlay that provides additional information about an interacted target. It's commonly shown on mouse hover or focus.  
A tooltip displays non-interactive clarifying text related to a trigger element.  

Note that touch screen devices do not share the same pointer input events and may fail to show anything.

Consider avoiding the use of tooltip as it may fail to produce the same UX for ALL users. If must, contemplate on practices such as `aria-describedby` to add alternative experience to users who aren't able to interact with a control in the same manner sighted users do.

```js
<script type="module">
    import '@vonage/vivid/tooltip';
</script>
```

## Anchor
The tooltip can be placed on interactive controls (things that can be clicked or focusable) such as:
- button
- checkbox
- input text

The tooltip can't be placed on non-interactive elements such as paragraph or plain div.  
Do not target non-interactive controls as a tooltip's anchor (such as non-focusable / disabled elements). The absence of user interaction will prevent the tooltip from showing up.

## Text
The tooltip is a description and therefor, the tooltip itself can not be interactive. `vwc-tooltip` contains only text.

## Accessibility
Be sure to add `aria-describedby="the vwc-tooltip ID name"` on the tooltip trigger element for screen readers readability.

## Open
Use the `open` attribute to indicate whether the tooltip is open.

- Type: `boolean`
- Default: `false`

```html preview
<style>
  .wrapper{
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  vwc-tooltip#tooltip{
    --tooltip-inline-size:200px;
  }
</style>
<div class="wrapper">
  <vwc-button id="button" icon="info-line" shape="pill" aria-describedby="tooltip" ></vwc-button>
  <vwc-tooltip id="tooltip" anchor="button" text="Click on then icon to toggle" open></vwc-tooltip>
</div>
<script>
  button.addEventListener('click', toggleOpen);
  function toggleOpen() {
	tooltip.open = !tooltip.open;
  }
</script>
```

## Corner

Use the `corner` attribute to set the placement of the tooltip around the anchor.

- Type: `'top'` | `'top-start'` | `'top-end'` | `'right'` | `'right-start'` | `'right-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'`| `'left'` | `'left-start'`| `'left-end'`
- Default: `'left'`

```html preview
<style>
  .wrapper{
    width: 100%;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  vwc-tooltip#tooltip2{
    --tooltip-inline-size:100px;
  }
</style>
<div class="wrapper">
  <vwc-button id="anchor2" aria-describedby="tooltip2" appearance='outlined' label='This is an anchor'></vwc-button>
  <vwc-tooltip id="tooltip2" anchor="anchor2" open text="right" corner="right">
  </vwc-tooltip>
  <vwc-tooltip id="tooltip2" anchor="anchor2" open text="left" corner="left">
  </vwc-tooltip>
  <vwc-tooltip id="tooltip2" anchor="anchor2" open text="top" corner="top">
  </vwc-tooltip>
  <vwc-tooltip id="tooltip2" anchor="anchor2" open text="bottom" corner="bottom">
  </vwc-tooltip>
</div>
```

## CSS Custom Properties

| Property                | Default | Description                |
|-------------------------|---------|----------------------------|
| `--tooltip-inline-size` | 240px   | Controls the tooltip width |

