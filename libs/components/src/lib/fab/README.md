# FAB

A floating action button (FAB) is a circled icon that floats above the user interface. You should use it for actions that strongly define your app, so that it stands out among the rest of the UI.

```js
<script type='module'>
    import '@vonage/vivid/fab';
</script>
```

## Icon

Use the `icon` attribute to change the FAB's icon.
You can choose an icon from the [icons gallery](https://icons.vivid.vonage.com).

- Type: `String`
- Default: `undefined`

```html preview
<vwc-fab icon='plus-line'></vwc-fab>
```

## Label

Use the `label` attribute to add text to the FAB.

- Type: `String`
- Default: `undefined`

```html preview
<vwc-fab icon='cart-line' label='Add to cart'></vwc-fab>
```

## Icon-Trailing

To add an icon to the right of the text, use the `icon-trailing` attribute (or `iconTrailing` property).

- Type: `Boolean`
- Default: `false`

```html preview
<vwc-fab icon='cart-line' label='Add to cart' icon-trailing></vwc-fab>
```

## Connotation

Set the `connotation` attribute to change the FAB's connotation.
It accepts a subset of predefined values.

- Type: `'brand'`, `'cta'`
- Default: `'brand'`

```html preview
<vwc-fab icon='plus-line' connotation='brand'></vwc-fab>
<vwc-fab icon='plus-line' connotation='cta'></vwc-fab>
```

## Disabled

To disable the FAB, use the `disabled` attribute.

- Type: `Boolean`
- Default: `false`

```html preview
    <vwc-fab icon='store-line' disabled></vwc-fab>
```
