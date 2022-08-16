# Menu

Menu, commonly known as a "context menu", is an element that is displayed upon user interaction. It is typically used to provide a list of actions available in the current context for a user to choose from.

```js
<script type="module">
 import '@vonage/vivid/menu';
</script>
```

```html preview
<vwc-menu open>yo</vwc-menu>
```

## Members

### Open

Proxies the [`open` property to the underlying popup element](../popup#open).

```html preview
<vwc-button label="open" onclick="menu.open = !menu.open"></vwc-button>

<vwc-menu id="menu" text="Focus or hover to open." open>Yo</vwc-menu>
```

### Anchor

Proxies the [`anchor` property to the underlying popup element](../popup#anchor).

```html preview center
<div style="position: relative">
  <vwc-button id="button" label="open" onclick="menu.open = !menu.open"></vwc-button>

  <vwc-menu id="menu" anchor="button" text="Focus or hover to open." open>Yo</vwc-menu>
</div>
```

### Placement

Proxies the [`placement` property to the underlying popup element](../popup#placement).

```html preview center
<div style="position: relative">
  <vwc-button id="button" label="open" onclick="menu.open = !menu.open"></vwc-button>

  <vwc-menu id="menu" anchor="button" text="Focus or hover to open." placement="top-end" open>Yo</vwc-menu>
</div>
```

## Slots

### Default

The default slot for the menu items.

While any DOM content is permissible as a child of the menu, only `vwc-menu-item`'s and slotted content with a role of menu`item`, `menuitemcheckbox`, or `menuitemradio` will receive keyboard support.

```html preview full
<vwc-menu open>
Yo
</vwc-menu>
```

## Methods

### focus

- Returns: void

Focuses the first item in the menu.

### collapseExpandedItem

- Returns: void

Collapses any expanded menu items.
