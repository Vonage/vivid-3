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

```html preview center
<vwc-button id="button" label="open" onclick="menu.open = !menu.open"></vwc-button>

<vwc-menu id="menu" anchor="button" text="Focus or hover to open."></vwc-menu>
```

### Anchor

Proxies the [`anchor` property to the underlying popup element](../popup#anchor).

### Placement

Proxies the [`placement` property to the underlying popup element](../popup#placement).

## Slots

## CSS Variables

## Events

## Methods

## Accessibility

## Use Cases
