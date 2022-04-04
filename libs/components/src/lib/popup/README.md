# vwc-popup

Popup are used to display a message or notification to the user and are displayed on top of all other web page elements.
Popup's goal is to provide additional, helpful content. To trigger the Popup, it should be paired with an anchor (e.g., a button). 

```js
<script type='module'>
    import '@vonage/vivid/popup';
</script>
```
## Anchor

Use the `anchor` attribute to reference the ID to element in the popup’s owner document.

The popup is positioned absolutely to its anchor.  It is recommended to wrap it with a div element and set its position `relative`.

- Type: `string`
- Default: `''`

```js
<div class="wrapper" style="position:relative;">
  <vwc-button id="anchor"></vwc-button>
  <vwc-popup anchor="anchor"></vwc-popup>
</div>
```
## Open
Use the `open` attribute to indicate whether the popup is open.

- Type: `boolean`
- Default: `false`

```html preview
<style>
  .content {
    width: 200px;
    padding: 1rem;
	}
  .wrapper{
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<div class="wrapper">
  <vwc-button id="anchor1" appearance='outlined' label='Click on me!'></vwc-button>
  <vwc-popup id="popup" anchor="anchor1" open>
      <div class="content">
        <vwc-text tight font-face="body-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</vwc-text>
      </div>
  </vwc-popup>
</div>
<script>
  const popup = document.getElementById("popup");
  const button = document.getElementById("anchor1");
  button.addEventListener('click', toggleOpen);
  function toggleOpen() {
	  popup.open = !popup.open;
  }
</script>
```

## Dismissible

Adds a close button to the popup.

- Type: `boolean`
- Default: `false`

```html preview
<style>
  .content {
    width: 120px;
    padding: 1rem;
	}
  .wrapper{ 
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<div class="wrapper">
  <vwc-button id="anchor2" appearance='outlined' label='Click on me!'></vwc-button>
  <vwc-popup id="popup" anchor="anchor2" open dismissible>
      <div class="content">
        <vwc-text tight font-face="body-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</vwc-text>
      </div>
  </vwc-popup>
</div>
<script>
  const popup = document.getElementById("popup");
  const button = document.getElementById("anchor2");
  button.addEventListener('click', toggleOpen);
  function toggleOpen() {
	  popup.open = !popup.open;
  }
</script>
```
## Arrow
Adds a small triangle to indicate the trigger element.

- Type: `boolean`
- Default: `false`

```html preview
<style>
  .content {
    width: 200px;
    padding: 1rem;
	}
  .wrapper{
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<div class="wrapper">
  <vwc-icon id="anchor3" type='info-line'></vwc-icon>
  <vwc-popup anchor="anchor3" open arrow>
      <div class="content">
        <vwc-text tight font-face="body-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</vwc-text>
      </div>
  </vwc-popup>
</div>
```
## Alternate
Sets the color-scheme to dark or light (depending on current user's system settings).

- Type: `boolean`
- Default: `false`

```html preview
<style>
  .content {
    width: 200px;
    padding: 1rem;
	}
  .wrapper{
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<div class="wrapper">
  <vwc-icon id="anchor4" type='info-line'></vwc-icon>
  <vwc-popup anchor="anchor4" open alternate>
      <div class="content">
        <vwc-text tight font-face="body-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</vwc-text>
      </div>
  </vwc-popup>
</div>
```
## Corner

Sets the placement of the popup around the anchor.

- Type: `'top'` | `'top-start'` | `'top-end'` | `'right'` | `'right-start'` | `'right-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'`| `'left'` | `'left-start'`| `'left-end'`
- Default: `'left'`

```html preview
<style>
  .content {
    padding: 1rem;
	}
  .wrapper{
    width: 100%;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
<div class="wrapper">
  <vwc-button id="anchor5" appearance='outlined' label='this is an anchor'></vwc-button>
  <vwc-popup id="popup" anchor="anchor5" open corner="right">
      <div class="content">
        <vwc-text tight font-face="body-2">right</vwc-text>
      </div>
  </vwc-popup>
  <vwc-popup id="popup" anchor="anchor5" open corner="left">
      <div class="content">
        <vwc-text tight font-face="body-2">left</vwc-text>
      </div>
  </vwc-popup>
  <vwc-popup id="popup" anchor="anchor5" open corner="top">
      <div class="content">
        <vwc-text tight font-face="body-2">top</vwc-text>
      </div>
  </vwc-popup>
  <vwc-popup id="popup" anchor="anchor5" open corner="bottom">
      <div class="content">
        <vwc-text tight font-face="body-2">bottom</vwc-text>
      </div>
  </vwc-popup>
</div>
```
## Caveat

Document elements display precedence is formed by the imaginary z-axis [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context), commonly by order of which elements are rendered and special properties (e.g. _z-index_).
Popup component is a low level element, unaware of its document context, but in most cases required to overlay on top of all elements.

A common practice used in apps / frameworks to promote a popup component to top other elements z-axis, is to utilise a service that dynamically appends a popup component to the end of the body element, when called for.

This helps ensure elements don't render over top a popup undesirebly.
