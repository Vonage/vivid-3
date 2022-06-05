# Popup

Popup are used to display a message or notification to the user and are displayed on top of all other web page elements.
Popup's goal is to provide additional, helpful content. To trigger the Popup, it should be paired with an anchor (e.g., a button).

```js
<script type='module'>
    import '@vonage/vivid/popup';
</script>
```

## Anchor

Use the `anchor` attribute to reference the ID to element in the popup’s owner document.

The popup is positioned in a fixed manner to its anchor.

- Type: `string`
- Default: `''`

```html preview center
<span id="anchor">
  ⚓️
</span>
<vwc-popup anchor="anchor" open>
  <vwc-text>
    This is a popup.
  </vwc-text>
</vwc-popup>
```

## Open

Use the `open` attribute to indicate whether the popup is open.

- Type: `boolean`
- Default: `false`

```html preview center
<vwc-button id="anchor" appearance='outlined' label='Click me!'></vwc-button>
<vwc-popup id="popup" anchor="anchor" open>
  <vwc-layout gutters="small">
    <vwc-text tight font-face="body-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</vwc-text>
  </vwc-layout>
</vwc-popup>

<script>
  anchor.addEventListener('click', () => popup.open = !popup.open);
</script>
```

## Dismissible

Add the `dismissible` attribute to add a close button to the popup.

- Type: `boolean`
- Default: `false`

```html preview center
<vwc-button id="anchor" appearance='outlined' label='Click on me!'></vwc-button>
<vwc-popup id="popup" anchor="anchor" open dismissible>
  <vwc-layout gutters="small">
    <vwc-text tight font-face="body-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</vwc-text>
  </vwc-layout>
</vwc-popup>

<script>
  anchor.addEventListener('click', () => popup.open = !popup.open);
</script>
```

## Arrow

Add the `arrow` attribute to add a small triangle to indicate the trigger element.

- Type: `boolean`
- Default: `false`

```html preview center
<vwc-icon id="anchor" type='info-line'></vwc-icon>
<vwc-popup anchor="anchor" open arrow>
  <vwc-layout gutters="small" style="200px">
    <vwc-text tight font-face="body-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</vwc-text>
  </vwc-layout>
</vwc-popup>
```

## Alternate

Add the `alternate` attribute to set the color-scheme to dark or light (depending on current user's system settings).

- Type: `boolean`
- Default: `false`

```html preview center
<vwc-icon id="anchor" type='info-line'></vwc-icon>
<vwc-popup anchor="anchor" open alternate>
  <vwc-layout gutters="small" style="200px">
    <vwc-text tight font-face="body-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</vwc-text>
  </vwc-layout>
</vwc-popup>
```

## Corner

Use the `corner` attribute to set the placement of the popup around the anchor.

- Type: `'top'` | `'top-start'` | `'top-end'` | `'right'` | `'right-start'` | `'right-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'`| `'left'` | `'left-start'`| `'left-end'`
- Default: `'left'`

```html preview center
<style>
  .square {
    inline-size: 270px;
    block-size: 100px;
    background-color: var(--vvd-color-neutral-10);
  }

  vwc-text {
    white-space: nowrap;
  }
</style>

<div id="anchor" class="square"></div>

<vwc-popup id="popup" anchor="anchor" open corner="right-end">
  <vwc-text tight font-face="body-2">
    right-end
  </vwc-text>
</vwc-popup>
<vwc-popup id="popup" anchor="anchor" open corner="right">
  <vwc-text tight font-face="body-2">
    right
  </vwc-text>
</vwc-popup>
<vwc-popup id="popup" anchor="anchor" open corner="right-start">
  <vwc-text tight font-face="body-2">
    right-start
  </vwc-text>
</vwc-popup>
<vwc-popup id="popup" anchor="anchor" open corner="left-end">
  <vwc-text tight font-face="body-2">
    left-end
  </vwc-text>
</vwc-popup>
<vwc-popup id="popup" anchor="anchor" open corner="left">
  <vwc-text tight font-face="body-2">
    left
  </vwc-text>
</vwc-popup>
<vwc-popup id="popup" anchor="anchor" open corner="left-start">
  <vwc-text tight font-face="body-2">
    left-start
  </vwc-text>
</vwc-popup>
<vwc-popup id="popup" anchor="anchor" open corner="top-end">
  <vwc-text tight font-face="body-2">
    top-end
  </vwc-text>
</vwc-popup>
<vwc-popup id="popup" anchor="anchor" open corner="top">
  <vwc-text tight font-face="body-2">
    top
  </vwc-text>
</vwc-popup>
<vwc-popup id="popup" anchor="anchor" open corner="top-start">
  <vwc-text tight font-face="body-2">
    top-start
  </vwc-text>
</vwc-popup>
<vwc-popup id="popup" anchor="anchor" open corner="bottom-end">
  <vwc-text tight font-face="body-2">
    bottom-end
  </vwc-text>
</vwc-popup>
<vwc-popup id="popup" anchor="anchor" open corner="bottom">
  <vwc-text tight font-face="body-2">
    bottom
  </vwc-text>
</vwc-popup>
<vwc-popup id="popup" anchor="anchor" open corner="bottom-start">
  <vwc-text tight font-face="body-2">
    bottom-start
  </vwc-text>
</vwc-popup>
```

## Caveat

Document elements display precedence is formed by the imaginary z-axis [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context), commonly by order of which elements are rendered and special properties (e.g. _z-index_).
Popup component is a low level element, unaware of its document context, but in most cases required to overlay on top of all elements.

A common practice used in apps / frameworks to promote a popup component to top other elements z-axis, is to utilise a service that dynamically appends a popup component to the end of the body element, when called for.

This helps ensure elements don't render over top a popup undesirebly.

## Methods

### updatePosition()

- Type: function
- Returns: void

Updates popup's position.
