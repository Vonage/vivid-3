# Menu Item

Represents a menu-item custom element.

```js
<script type="module">
  import '@vonage/vivid/menu-item';
</script>
```

```html preview

<vwc-menu open>
  <vwc-menu-item text="Menu item"></vwc-menu-item>
</vwc-menu>
```

## Members

### Text

- Type: `string`
- Default: `undefined`

Use the `text` attribute to set the menu item's text.

```html preview
<vwc-menu open>
  <vwc-menu-item text="Menu item"></vwc-menu-item>
</vwc-menu>
```

### Secondary text

- Type: `string`
- Default: `undefined`

Use the `text-secondary` attribute (or `textSecondary` property) to set the menu item's secondary text.

Note: to improve readability, **avoid long text and multiple lines** where possible.

```html preview
<vwc-menu open>
 <vwc-menu-item text="menu item" text-secondary="secondary text"></vwc-menu-item>
</vwc-menu>
```

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
  <vwc-menu-item role="menuitem" text="Menu item 1"></vwc-menu-item>
  <vwc-menu-item role="menuitem" text="Menu item 2"></vwc-menu-item>
  <vwc-divider></vwc-divider>
  <vwc-menu-item role="menuitemcheckbox" text="Checkbox 1"></vwc-menu-item>
  <vwc-menu-item role="menuitemcheckbox" text="Checkbox 2"></vwc-menu-item>
  <vwc-divider></vwc-divider>
  <vwc-menu-item role="menuitemradio" text="Radio 1.1"></vwc-menu-item>
  <vwc-menu-item role="menuitemradio" text="Radio 1.2"></vwc-menu-item>
  <vwc-divider></vwc-divider>
  <vwc-menu-item role="menuitemradio" text="Radio 2.1"></vwc-menu-item>
  <vwc-menu-item role="menuitemradio" text="Radio 2.2"></vwc-menu-item>
</vwc-menu>
```

### Icon

Use `icon` to set an icon to the nav item.
View list of available icon at the [vivid icons gallery](https://icons.vivid.vonage.com).

Note: Icon, by its own, doesn't make a discernible text. An `aria-label`, `aria-labelledby` or `title` must be provided to ensure that the user can understand the nav item's purpose.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-menu open>
  <vwc-menu-item icon="file-pdf-line" text="Export to PDF"></vwc-menu-item>
</vwc-menu>
```

### Checked

The checked value of the element (if role is set to `'menuitemcheckbox'`).

- Type: `boolean`
- Default: `false`

```html preview
<vwc-menu open>
  <vwc-menu-item role="menuitemcheckbox" checked text="Checked Menu item"></vwc-menu-item>
</vwc-menu>
```

### Disabled

The disabled state of the element

- Type: `boolean`
- Default: `false`

```html preview
<vwc-menu open>
  <vwc-menu-item disabled text="Disabled Menu item"></vwc-menu-item>
</vwc-menu>
```

<!-- ### Expanded

The expanded state of the element

- Type: `boolean`
- Default: `false` -->

## Events

### Expanded Change

Fires a custom 'expanded-change' event when the expanded state changes

### Change

Fires a custom 'change' event when a non-submenu item with a role of `menuitemcheckbox`, `menuitemradio`, or `menuitem` is invoked

## Custom Colors

```html preview variables
<style>
  html { 
    block-size: 360px; 
  }
</style>

<vwc-menu open>
  <vwc-menu-item role="menuitem" text="Menu item 1" text-secondary="secondary text"></vwc-menu-item>
  <vwc-divider></vwc-divider>
  <vwc-menu-item role="menuitemcheckbox" text="Checkbox 1"></vwc-menu-item>
  <vwc-menu-item role="menuitemcheckbox" text="Checkbox 2"></vwc-menu-item>
  <vwc-divider></vwc-divider>
  <vwc-menu-item role="menuitemradio" text="Radio 1.1"></vwc-menu-item>
  <vwc-menu-item role="menuitemradio" text="Radio 1.2"></vwc-menu-item>
  <vwc-divider></vwc-divider>
  <vwc-menu-item role="menuitemradio" text="Radio 2.1"></vwc-menu-item>
  <vwc-menu-item role="menuitemradio" text="Radio 2.2"></vwc-menu-item>
</vwc-menu>
```
