# Menu Item

Represents a menu-item custom element.

```js
<script type="module">
 import '@vonage/vivid/menu-item';
</script>
```

```html preview

<vwc-menu open>
 <vwc-menu-item>Menu item</vwc-menu-item>
</vwc-menu>
```

## Members

### Role

set `role` to change the role of the menu item

- Type: `'menuitem'` | `'menuitemcheckbox'` | `'menuitemradio'`
- Default: `'menuitem'`

```html preview
<style>
 html { 
  block-size: 360px; 
 }
</style>

<vwc-menu open>
 <vwc-menu-item role="menuitem">Menu item 1</vwc-menu-item>
 <vwc-menu-item role="menuitem">Menu item 2</vwc-menu-item>
 <vwc-divider></vwc-divider>
 <vwc-menu-item role="menuitemcheckbox">Checkbox 1</vwc-menu-item>
 <vwc-menu-item role="menuitemcheckbox">Checkbox 2</vwc-menu-item>
 <vwc-divider></vwc-divider>
 <vwc-menu-item role="menuitemradio">Radio 1.1</vwc-menu-item>
 <vwc-menu-item role="menuitemradio">Radio 1.2</vwc-menu-item>
 <vwc-divider></vwc-divider>
 <vwc-menu-item role="menuitemradio">Radio 2.1</vwc-menu-item>
 <vwc-menu-item role="menuitemradio">Radio 2.2</vwc-menu-item>
</vwc-menu>
```

### Checked

The checked value of the element.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-menu open>
 <vwc-menu-item>Menu item</vwc-menu-item>
 <vwc-menu-item checked>Checked Menu item</vwc-menu-item>
</vwc-menu>
```

### Disabled

The disabled state of the element

- Type: `boolean`
- Default: `false`

```html preview
<vwc-menu open>
 <vwc-menu-item>Menu item</vwc-menu-item>
 <vwc-menu-item disabled>Disabled Menu item</vwc-menu-item>
</vwc-menu>
```

<!-- ### Expanded

The expanded state of the element

- Type: `boolean`
- Default: `false` -->

## Methods

### expandedChanged

- Parameters:
  - oldValue: `boolean`
- Returns: `void`

### checkedChanged

- Parameters:
  - oldValue: `boolean`
  - newValue: `boolean`
- Returns: `void`

oldValue: boolean, newValue: boolean void

## Events

### Expanded Change

Fires a custom 'expanded-change' event when the expanded state changes

### Change

Fires a custom 'change' event when a non-submenu item with a role of `menuitemcheckbox`, `menuitemradio`, or `menuitem` is invoked
