# Menu

Menu, commonly known as a "context menu", is an element that is displayed upon user interaction. It is typically used to provide a list of actions available in the current context for a user to choose from.

```js
<script type="module">
 import '@vonage/vivid/menu';
</script>
```

```html preview
<vwc-menu open>Should contain menu items</vwc-menu>
```

## Members

### Open

`vwc-menu` internally uses `vwc-popup` to display an element and its descendants above the rest of the document.

Open property from `vwc-popup` propagate through `vwc-menu`.

<https://github.com/Vonage/vivid-3/blob/3c6daf88ab35108016467a79c8324ce92786cbe8/libs/components/src/lib/popup/README.md#L34-L38>

```html preview
<vwc-button label="open" onclick="menu.open = !menu.open"></vwc-button>

<vwc-menu id="menu" text="Focus or hover to open." open>Should contain menu items</vwc-menu>
```

### Anchor

Proxies the [`anchor` property to the underlying popup element](../popup#anchor).

```html preview center
<div style="position: relative">
  <vwc-button id="button" label="open" onclick="menu.open = !menu.open"></vwc-button>

  <vwc-menu id="menu" anchor="button" text="Focus or hover to open." open>Should contain menu items</vwc-menu>
</div>
```

### Placement

Proxies the [`placement` property to the underlying popup element](../popup#placement).

```html preview center
<div style="position: relative">
  <vwc-button id="button" label="open" onclick="menu.open = !menu.open"></vwc-button>

  <vwc-menu id="menu" anchor="button" text="Focus or hover to open." placement="top-start" open>Should contain menu items</vwc-menu>
</div>
```

## Slots

### Default

The default slot for the menu items.

While any DOM content is permissible as a child of the menu, only `vwc-menu-item`'s and slotted content with a role of menu`item`, `menuitemcheckbox`, or `menuitemradio` will receive keyboard support.

```html preview full
<vwc-menu open>
Should contain menu items
</vwc-menu>
```

## Methods

### focus()

- Returns: void

Focuses the first item in the menu.

### collapseExpandedItem()

- Returns: void

Collapses any expanded menu items.

## Caveat

Document elements display precedence is formed by the imaginary z-axis [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context), commonly by order of which elements are rendered and special properties (e.g. _z-index_).
Menu component is a low level element, unaware of its document context, but is, in most cases, required to overlay on top of all elements.

A common practice used in apps / frameworks to promote a Menu component to top other elements z-axis, is to utilise a service that dynamically appends a Menu component to the end of the body element, when called for.

This helps ensure elements don't render over top a Menu undesirebly.
