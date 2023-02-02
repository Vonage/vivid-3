# Popup

Popup are used to display a message or notification to the user and are displayed on top of all other web page elements.
Popup's goal is to provide additional, helpful content. To trigger the Popup, it should be paired with an anchor (e.g., a button).

```js
<script type='module'>
  import '@vonage/vivid/popup';
</script>
```

## Properties

### Anchor

Use the `anchor` attribute to reference the ID of an element (in the same popup's owner document) of which the popup should be anchored to.

- Type: `string`
- Default: `''`

```html preview center
<span id="anchor">Anchor</span>
<vwc-popup popover anchor="anchor" defaultopen>
  This is a popup.
</vwc-popup>
```

### Invokers

(taken from browsers' native `popover` support)

[Supported elements](https://whatpr.org/html/8221/popover.html#attr-popover-target-supported-elements) can be used to invoke the popup display state.
Set `popovertoggletarget`, `popovershowtarget` or `popoverhidetarget` on a supported element to reference the ID to popover element for it to be used as a trigger.
Alternatively, use the attributes respective properties `popoverToggleTargetElement`, `popoverShowTargetElement` or `popoverHideTargetElement` to reference to the popover element(this can come in handy when referencing accross different tree scopes).

Normally, these attributes are set on the popover's anchored element, but they can be set on any other supported element.

```html preview center
<vwc-button popovertoggletarget="popup" label="toggle popup"></vwc-button>
<span id="anchor">Anchor</span>
<vwc-popup popover id="popup" anchor="anchor" defaultopen>
  This is a popup.
</vwc-popup>
```

### Default Open

Use the `defaultopen` attribute to indicate whether the popup should be open when the page loads.

- Type: `boolean`
- Default: `false`

```html preview center
<vwc-button id="anchor" appearance='outlined' label='Click me!'></vwc-button>
<vwc-popup id="popup" anchor="anchor" defaultopen>
  <vwc-layout gutters="small">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </vwc-layout>
</vwc-popup>

<script>
  anchor.addEventListener('click', () => popup.open = !popup.open);
</script>
```

### Dismissible

Add the `dismissible` attribute to add a close button to the popup.

- Type: `boolean`
- Default: `false`

```html preview center
<vwc-button id="anchor" appearance='outlined' label='Click on me!'></vwc-button>
<vwc-popup id="popup" anchor="anchor" defaultopen dismissible>
  <vwc-layout gutters="small">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </vwc-layout>
</vwc-popup>

<script>
  anchor.addEventListener('click', () => popup.open = !popup.open);
</script>
```

### Popover

Use the `popover` attribute to add Light dismiss behaviors.

- When `'auto'` the following will dismiss the popup: ~~pressing the ESC key~~ (TBD), ~~keyboard-navigation~~ (TBD), invoking elsewhere in the document, invoking another popup, etc.
- When `'manual'`, popup cannot be light dismissed (it can only be dismissed by an explicit trigger element or by JavaScript), and they don't automatically dismiss previously-shown popups.

- Type: `'auto'` | `'manual'`
- Default: `'auto'`

```html preview center
<vwc-button id="anchor" appearance='outlined' label='Click outside of the popup!' ></vwc-button>
<vwc-popup id="popover" anchor="anchor" defaultopen popover>
  <vwc-layout gutters="small">
   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </vwc-layout>
</vwc-popup>
<script>
  anchor.addEventListener('click', () => popover.open = !popover.open);
</script>
```

### Arrow

Add the `arrow` attribute to add a small triangle to indicate the trigger element.

- Type: `boolean`
- Default: `false`

```html preview center
<vwc-icon id="anchor" name='info-line'></vwc-icon>
<vwc-popup anchor="anchor" defaultopen arrow>
  <vwc-layout gutters="small" style="200px">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </vwc-layout>
</vwc-popup>
```

### Alternate

Add the `alternate` attribute to set the color-scheme to dark or light (depending on current user's system settings).

- Type: `boolean`
- Default: `false`

```html preview center
<vwc-icon id="anchor" name='info-line'></vwc-icon>
<vwc-popup anchor="anchor" defaultopen alternate>
  <vwc-layout gutters="small" style="200px">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </vwc-layout>
</vwc-popup>
```

### Placement

Use the `placement` attribute to set the placement of the popup around the anchor.

- Type: `'top'` | `'top-start'` | `'top-end'` | `'right'` | `'right-start'` | `'right-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'`| `'left'` | `'left-start'`| `'left-end'`
- Default: `''`

```html preview center
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

<vwc-popup id="popup" anchor="anchor" defaultopen placement="right-end">
  right-end
</vwc-popup>
<vwc-popup id="popup" anchor="anchor" defaultopen placement="right">
  right
</vwc-popup>
<vwc-popup id="popup" anchor="anchor" defaultopen placement="right-start">
  right-start
</vwc-popup>
<vwc-popup id="popup" anchor="anchor" defaultopen placement="left-end">
  left-end
</vwc-popup>
<vwc-popup id="popup" anchor="anchor" defaultopen placement="left">
  left
</vwc-popup>
<vwc-popup id="popup" anchor="anchor" defaultopen placement="left-start">
  left-start
</vwc-popup>
<vwc-popup id="popup" anchor="anchor" defaultopen placement="top-end">
  top-end
</vwc-popup>
<vwc-popup id="popup" anchor="anchor" defaultopen placement="top">
  top
</vwc-popup>
<vwc-popup id="popup" anchor="anchor" defaultopen placement="top-start">
  top-start
</vwc-popup>
<vwc-popup id="popup" anchor="anchor" defaultopen placement="bottom-end">
  bottom-end
</vwc-popup>
<vwc-popup id="popup" anchor="anchor" defaultopen placement="bottom">
  bottom
</vwc-popup>
<vwc-popup id="popup" anchor="anchor" defaultopen placement="bottom-start">
  bottom-start
</vwc-popup>
```

## Methods

### updatePosition()

- Type: `function`
- Returns: `void`

Updates popup's position.

## Caveat

Document elements display precedence is formed by the imaginary z-axis [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context), commonly by order of which elements are rendered and special properties (e.g. _z-index_).
Popup component is a low level element, unaware of its document context, but is, in most cases, required to overlay on top of all elements.

A common practice used in apps / frameworks to promote a popup component to top other elements z-axis, is to utilise a service that dynamically appends a popup component to the end of the body element, when called for.

This helps ensure elements don't render over top a popup undesirebly.
