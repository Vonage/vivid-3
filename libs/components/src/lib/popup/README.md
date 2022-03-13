# vwc-popup

Popup are used to display a message or notification to the user and are displayed on top of all other web page elements.
Popup's goal is to provide additional, helpful content. To trigger the Popup, it should be paired with an **anchor** (e.g., a button). 

```js
<script type='module'>
    import '@vonage/vivid/popup';
</script>
```
## Anchor

Use the `anchor` attribute to reference the ID to element in the popup’s owner document.

Since the popup is positioned absolutely to its anchor, it is best to wrap it with a div element and set its position `relative`.

- Type: `string`
- Default: `''`

```js
<div class="wrapper" style="position:relative;">
  <vwc-button id="popupAnchor"></vwc-button>
  <vwc-popup anchor="popupAnchor"></vwc-popup>
</div>
```
## Open
Use the `open` attribute to indicate whether the popup is open.

- Type: `boolean`
- Default: `false`

```html preview
<div class="wrapper">
  <vwc-button id="buttonAnchor" appearance='filled' label='Click on me!'></vwc-button>
  <vwc-popup id="popup" anchor="buttonAnchor" open>
      <div class="content">
        <vwc-text font-face="body-1-bold" tight><p class="line">Popup title</p></vwc-text>
        <vwc-text font-face="body-2" tight>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</vwc-text>
      </div>
  </vwc-popup>
</div>
<script>
  const popup = document.getElementById("popup");
  const button = document.getElementById("buttonAnchor");
  button.addEventListener('click', toggleOpen);
  function toggleOpen() {
	  popup.open = !popup.open;
  }
</script>

```

## Dismissible

Use the `dismissible` attribute to add close button to the popup.

- Type: `boolean`
- Default: `false`

```html preview
<div class="wrapper">
  <vwc-icon id="dismissibleAnchor" type='info-line'></vwc-icon>
  <vwc-popup anchor="dismissibleAnchor" open dismissible>
      <div class="content">
        <vwc-text font-face="body-1-bold" tight><p class="line">Popup title</p></vwc-text>
        <vwc-text font-face="body-2" tight>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</vwc-text>
      </div>
  </vwc-popup>
</div>

```

## Corner

Use the `corner` attribute to set the placement of the popup.

- Type: `'top'` | `'top-start'` | `'top-end'` | `'right'` | `'right-start'` | `'right-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'`| `'left'` | `'left-start'`| `'left-end'`
- Default: `'left'`

```html preview
<div class="wrapper">
  <vwc-icon id="cornerAnchor" type='info-line'></vwc-icon>
  <vwc-popup anchor="cornerAnchor" open corner="right">
      <div class="content">
        <vwc-text font-face="body-1-bold" tight><p class="line">Popup title</p></vwc-text>
        <vwc-text font-face="body-2" tight>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</vwc-text>
      </div>
  </vwc-popup>
</div>

```

## Arrow
Use the `arrow` attribute to add small triangle to indicate the trigger element.

- Type: `boolean`
- Default: `false`

```html preview
<div class="wrapper">
  <vwc-icon id="arrowAnchor" type='info-line'></vwc-icon>
  <vwc-popup anchor="arrowAnchor" open arrow>
      <div class="content">
        <vwc-text font-face="body-1-bold" tight><p class="line">Popup title</p></vwc-text>
        <vwc-text font-face="body-2" tight>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</vwc-text>
      </div>
  </vwc-popup>
</div>

```
## Alternate
Use the `alternate` attribute to set the color-scheme to dark.

- Type: `boolean`
- Default: `false`

```html preview
<div class="wrapper">
  <vwc-icon id="alternateAnchor" type='info-line'></vwc-icon>
  <vwc-popup anchor="alternateAnchor" open alternate>
      <div class="content">
        <vwc-text font-face="body-1-bold" tight><p class="line">Popup title</p></vwc-text>
        <vwc-text font-face="body-2" tight>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</vwc-text>
      </div>
  </vwc-popup>
</div>

```
## Strategy
Use the `strategy` attribute to set the position of the popup.

You will want to use 'fixed' if the anchor is inside a fixed container, but the popup is not.

- Type: `'fixed'` | `'absolute'`
- Default: `'fixed'`

```html preview
<div class="wrapper">
  <vwc-icon id="strategyAnchor" type='info-line'></vwc-icon>
  <vwc-popup anchor="strategyAnchor" open strategy="absolute">
      <div class="content">
        <vwc-text font-face="body-1-bold" tight><p class="line">Popup title</p></vwc-text>
        <vwc-text font-face="body-2" tight>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</vwc-text>
      </div>
  </vwc-popup>
</div>

```
## Z-index

Document elements display precedence is formed by the imaginary z-axis [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context), commonly by order of which elements are rendered and special properties (e.g. _z-index_).
Popup component is a low level element, unaware of its document context, but in most cases required to overlay on top of all elements.

A common practice used in apps / frameworks to promote a popup component to top other elements z-axis, is to utilise a service that dynamically appends a popup component to the **end of the body element**, when called for.

This helps ensure elements don't render over top a popup undesirebly.


<style>
  .content {
    width: 200px;
    text-align: left;
    padding: 1rem;
	}
  .line {
    border-bottom: 1px solid var(--vvd-color-neutral-40);
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .wrapper{
    position: relative;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--vvd-color-neutral-10);
  }
</style>
