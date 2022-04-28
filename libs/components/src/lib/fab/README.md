# FAB

A floating action button (FAB) is a circled icon that floats above the user interface. You should use it for actions that strongly define your app, so that it stands out among the rest of the UI.

```js
<script type='module'>
    import '@vonage/vivid/fab';
</script>
```

## Icon

Use the `icon` attribute to change the FAB's icon.
You can choose an icon from the [vivid icons search platform](https://icons.vivid.vonage.com).

- Type: `String`
- Default: `''`

```html preview
<vwc-fab icon='plus-line'></vwc-fab>
```

## Label

Use the `label` attribute to add text to the FAB.

- Type: `String`
- Default: `''`

```html preview
<vwc-fab icon='cart-line' label='Add to cart'></vwc-fab>
```

## Icon-Trailing

To add an icon to the right of the text, use the `icon-trailing` attribute (or `iconTrailing` property).

- Type: `boolean`
- Default: `false`

```html preview
<vwc-fab icon='cart-line' label='Add to cart' icon-trailing></vwc-fab>
```

## Connotation

Set the `connotation` attribute to change the FAB's connotation.
It accepts a subset of predefined values.

- Type: `'primary'` | `'cta'` | `'success'`  | `'announcement'` | `'alert'` | `'warning'` | `'info'`
- Default: `'primary'`

```html preview
<vwc-fab icon='plus-line' connotation='primary'></vwc-fab>
<vwc-fab icon='plus-line' connotation='cta'></vwc-fab>
<vwc-fab icon='plus-line' connotation='success'></vwc-fab>
<vwc-fab icon='plus-line' connotation='announcement'></vwc-fab>
<vwc-fab icon='plus-line' connotation='alert'></vwc-fab>
<vwc-fab icon='plus-line' connotation='warning'></vwc-fab>
<vwc-fab icon='plus-line' connotation='info'></vwc-fab>

```