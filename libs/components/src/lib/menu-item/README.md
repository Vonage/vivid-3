# menu-item

Represents a menu-item custom element.

```js
<script type="module">
 import '@vonage/vivid/menu-item';
</script>
```

```html preview
<style>
 html { 
  block-size: 400px; 
 }
</style>

<vwc-menu open>
 <vwc-menu-item>Menu item 1</vwc-menu-item>
 <vwc-menu-item>Menu item 2</vwc-menu-item>
 <vwc-menu-item>Menu item 3</vwc-menu-item>
</vwc-menu>
```

## Members

### Role

set `role` to change the role of the menu item.

- Type: `'menuitem'` | `'menuitemcheckbox'` | `'menuitemradio'`
- Default: `'menuitem'`
-
- menuitemradio

```html preview
<style>
 html { 
  block-size: 400px; 
 }
</style>

<vwc-menu open>
 <vwc-menu-item>Menu item 1</vwc-menu-item>
 <vwc-menu-item>Menu item 2</vwc-menu-item>
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

disabled public boolean  The disabled state of the element.
expanded public boolean  The expanded state of the element.
role public MenuItemRole  The role of the element.
checked public boolean  The checked value of the element.

## Slots

## Methods

expandedChanged protected  oldValue: boolean void
checkedChanged protected  oldValue: boolean, newValue: boolean void

expanded-change  Fires a custom 'expanded-change' event when the expanded state changes
change  Fires a custom 'change' event when a non-submenu item with a role of `menuitemcheckbox`, `menuitemradio`, or `menuitem` is invoked

## Accessibility

## Use Cases
