# vwc-icon

Find the icon you want to use on the [vivid icons search platform](https://icons.vivid.vonage.com).

```js
<script type='module'>
    import '@vonage/vivid/icon';
</script>
```

## Type

- Type: `String`
- Default: `''`

Add a `type` attribute to add type to the icon.

```html preview
<vwc-icon type='profile-line'></vwc-icon>
```

## Connotation

Set the `connotation` attribute to change the icon's connotation.
It accepts a subset of predefined values.

- Type: `'primary'` | `'announcement'` | `'cta'` | `'success'` | `'alert'` | `'info'`
- Default: `'primary'`

```html preview
<vwc-icon type='heart-solid' connotation='primary'></vwc-icon>
<vwc-icon type='heart-solid' connotation='announcement'></vwc-icon>
<vwc-icon type='heart-solid' connotation='cta'></vwc-icon>
<vwc-icon type='heart-solid' connotation='success'></vwc-icon>
<vwc-icon type='heart-solid' connotation='alert'></vwc-icon>
<vwc-icon type='heart-solid' connotation='info'></vwc-icon>
```

Use the `size` attribute to change the icon's size.

- Type: `'small'` | `'medium'` | `'large'`
- Default: `'medium'`

```html preview
<vwc-icon type='close-line' size='small'></vwc-icon>
<vwc-icon type='close-line' size='medium'></vwc-icon>
<vwc-icon type='close-line' size='large'></vwc-icon>
```