# tooltip

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
<style>
  .wrapper{
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<div class="wrapper">
  <vwc-button id="anchor" icon="help-line" shape="pill" aria-describedby="tooltip"></vwc-button>
  <vwc-tooltip id="tooltip" anchor="anchor" text="I'm a tooltip" open></vwc-tooltip>
</div>
```
## Text
The tooltip is a description and therefor, the tooltip itself can not be interactive. `vwc-tooltip` contains only text.

- Type: `string`
- Default: `''`

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
  <vwc-button id="button" icon="info-line" shape="pill" aria-describedby="tooltip"></vwc-button>
  <vwc-tooltip id="tooltip" anchor="button" text="Click on the icon to toggle"></vwc-tooltip>
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
## Usage inside text
```html preview
	<div>
    <vwc-text font-face="body-1" tight>Text with tooltip - press the question mark<vwc-button id="button3" icon="help-line" shape="pill" aria-describedby="tooltip3"></vwc-button>more text after tooltip.</vwc-text>
		  <vwc-tooltip id="tooltip3" anchor="button3" corner="bottom-end" text="I'm the tooltip content"></vwc-tooltip>
	</div>
  <script>
  button3.addEventListener('click', toggle);
  function toggle() {
	  tooltip3.open = !tooltip3.open;
  }
</script>
```

## Accessibility
Be sure to add `aria-describedby="vwc-tooltip's ID"` on the tooltip trigger element for screen readers readability.

```js
<vwc-button id="anchor" aria-describedby="tooltip"></vwc-button>
<vwc-tooltip id="tooltip" anchor="anchor"></vwc-tooltip>
```
## Methods

| Method | Type       | Description          |
| ------ | ---------- | -------------------- |
| `hide` | `(): void` | Closes the tooltip.  |
| `show` | `(): void` | Opens the tooltip.   |
## CSS Custom Properties

| Property                | Default | Description                |
|-------------------------|---------|----------------------------|
| `--tooltip-inline-size` | 240px   | Controls the tooltip width |

