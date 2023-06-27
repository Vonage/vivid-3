# Menu

Menu, commonly known as a "context menu", is an element that is displayed upon user interaction. It is typically used to provide a list of actions available in the current context for a user to choose from.

```js
<script type="module">
  import '@vonage/vivid/menu';
</script>
```

```html preview
<vwc-menu open>
  <vwc-menu-item text="Menu item 1"></vwc-menu-item>
  <vwc-menu-item text="Menu item 2"></vwc-menu-item>
</vwc-menu>
```

## Members

### Open

_Menu_ internally uses _popup_ to display an element and its descendants above the rest of the document.

`open` property from _popup_ propagate through _menu_ and sets its open state.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-menu open>
  <vwc-menu-item text="Menu item 1"></vwc-menu-item>
  <vwc-menu-item text="Menu item 2"></vwc-menu-item>
</vwc-menu>
```

### Anchor

_Menu_ internally uses _popup_ to display an element and its descendants above the rest of the document.

`anchor` property from _popup_ propagate through _menu_ and sets its anchor reference.

- Type: `string`
- Default: `''`

```html preview
<div style="position: relative">
  <vwc-button id="button" label="Toggle Menu" onclick="menu.open = !menu.open" appearance="outlined"></vwc-button>

  <vwc-menu id="menu" anchor="button" open>
    <vwc-menu-item text="Menu item 1"></vwc-menu-item>
    <vwc-menu-item text="Menu item 2"></vwc-menu-item>
 </vwc-menu>
</div>
```

### Auto Dismiss

Use the auto dismiss property to automatically close the menu when the user clicks outside of it.

- Type: `boolean`
- Default: `false`

```html preview
<div style="position: relative">
  <vwc-button id="button" label="Toggle Menu" onclick="menu.open = !menu.open" appearance="outlined"></vwc-button>

  <vwc-menu id="menu" anchor="button" auto-dismiss>
    <vwc-menu-item text="Menu item 1"></vwc-menu-item>
    <vwc-menu-item text="Menu item 2"></vwc-menu-item>
 </vwc-menu>
</div>
```

### Placement

_Menu_ internally uses _popup_ to display an element and its descendants above the rest of the document.

`placement` property from _popup_ propagate through _menu_ and sets its position in accordance to its anchor.

- Type: `'top'` | `'top-start'` | `'top-end'` | `'right'` | `'right-start'` | `'right-end'` | `'bottom'` | `'bottom-start'` | `'bottom-end'`| `'left'` | `'left-start'`| `'left-end'`
- Default: `''`

```html preview
<div style="position: relative">
  <vwc-button id="button" label="Toggle Menu" onclick="menu.open = !menu.open" appearance="outlined"></vwc-button>

  <vwc-menu id="menu" anchor="button" placement="right-start" open>
    <vwc-menu-item text="Menu item 1"></vwc-menu-item>
    <vwc-menu-item text="Menu item 2"></vwc-menu-item>
  </vwc-menu>
</div>
```

## Slots

### Default

The default slot for the menu items.

While any DOM content is permissible as a child of the menu, only `vwc-menu-item`'s and slotted content with a role of menu`item`, `menuitemcheckbox`, or `menuitemradio` will receive keyboard support.

```html preview
<vwc-menu open>
  <vwc-menu-item text="Menu item 1"></vwc-menu-item>
  <vwc-menu-item text="Menu item 2"></vwc-menu-item>
</vwc-menu>
```

## CSS Variables

### Max Inline Size

Use the `--menu-max-inline-size` variable to set the menu's inline size.

- Type: [`<length>`](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
- Default: `auto`

```html preview
<style>
  vwc-menu {
    --menu-max-inline-size: 300px;
  }
</style>

<vwc-menu open>
  <vwc-menu-item text="Lorem ipsum dolor sit amet, consectetur adipisicing elit"></vwc-menu-item>
</vwc-menu>
```

### Min Inline Size

Use the `--menu-min-inline-size` variable to set the menu's inline size.

- Type: [`<length>`](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
- Default: `auto`

```html preview
<style>
  vwc-menu {
    --menu-min-inline-size: 300px;
  }
</style>

<vwc-menu open>
  <vwc-menu-item text="Menu Item"></vwc-menu-item>
</vwc-menu>
```

### Menu Block Size

Use the `--menu-block-size` variable to set the menu's block size.

- Type: [`<length>`](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
- Default: `408px`

```html preview
<style>
  vwc-menu {
    --menu-block-size: 100px;
  }
</style>

<vwc-menu open>
  <vwc-menu-item text="Menu Item"></vwc-menu-item>
  <vwc-menu-item text="Menu Item"></vwc-menu-item>
  <vwc-menu-item text="Menu Item"></vwc-menu-item>
  <vwc-menu-item text="Menu Item"></vwc-menu-item>
  <vwc-menu-item text="Menu Item"></vwc-menu-item>
  <vwc-menu-item text="Menu Item"></vwc-menu-item>
  <vwc-menu-item text="Menu Item"></vwc-menu-item>
</vwc-menu>
```

## Methods

### focus()

- Returns: `void`

Focuses the first item in the menu.

### collapseExpandedItem()

- Returns: `void`

Collapses any expanded menu items.

## Caveat

Document elements display precedence is formed by the imaginary z-axis [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context), commonly by order of which elements are rendered and special properties (e.g. _z-index_).
Menu component is a low level element, unaware of its document context, but is, in most cases, required to overlay on top of all elements.

A common practice used in apps / frameworks to promote a Menu component to top other elements z-axis, is to utilise a service that dynamically appends a Menu component to the end of the body element, when called for.

This helps ensure elements don't render over top a Menu undesirebly.
