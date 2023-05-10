# FAB

A floating action button (FAB) is a circled icon that floats above the user interface. You should use it for actions that strongly define your app, so that it stands out among the rest of the UI.

```js
<script type='module'>
  import '@vonage/vivid/fab';
</script>
```

## Members

### Label

Use the `label` attribute to add text to the FAB.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-fab icon='cart-line' label='Add to cart'></vwc-fab>
```

### Icon

Use `icon` to set an icon to the FAB.
View list of available icon at the [vivid icons gallery](https://icons.vivid.vonage.com).

Note: Icon, by its own, doesn't make a discernible text. An `aria-label`, `aria-labelledby` or `title` must be provided to ensure that the user can understand the FAB's purpose.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-fab icon='cart-line' aria-label="Shopping Cart"></vwc-fab>
```

### Icon with Label

FAB text can be affixed by a decorative icon, either by its start or end.
Toggle `icon-trailing` to set the icon's horizontal alignment.

```html preview
<vwc-fab icon='check-line' label='icon'></vwc-fab>
<vwc-fab icon='check-line' label='icon-trailing' icon-trailing></vwc-fab>
```

### Connotation

Set the `connotation` attribute to change the FAB's connotation.
It accepts a subset of predefined values.

- Type: `'accent'`, `'cta'`
- Default: `'accent'`

```html preview
<vwc-fab icon='plus-line' connotation='accent'></vwc-fab>
<vwc-fab icon='plus-line' connotation='cta'></vwc-fab>
```

### Size

Use the `size` attribute to set the FAB's to one of the predefined block size extent.

- Type: `'normal'` | `'expanded'`
- Default: `'normal'`

```html preview
<vwc-fab icon="thumbs-up-line" label='normal' size='normal'></vwc-fab>
<vwc-fab icon="thumbs-up-line" label='expanded' size='expanded'></vwc-fab>
```

### Disabled

To disable the FAB, use the `disabled` attribute.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-fab icon='store-line' disabled></vwc-fab>
```

## Custom Colors

```html preview variables
<vwc-fab connotation="$CONNOTATION" icon='cart-line' label='Add to cart'></vwc-fab>
```
