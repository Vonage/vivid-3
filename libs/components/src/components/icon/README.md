# vwc-icon

Find the icon you want to use on the [vivid icons search platform](https://icons.vivid.vonage.com).

```js
<script type='module'>
    import '@vonage/vivid/icon';
</script>
```

```html preview
<p>I <vwc-icon type='heart-line' connotation='alert'></vwc-icon> VIVID!</p>
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

- Type: `'base-small'` | `'base'` | `'base-large'`
- Default: `'base'`

```html preview
<vwc-icon type='close-line' size='base-small'></vwc-icon>
<vwc-icon type='close-line' size='base'></vwc-icon>
<vwc-icon type='close-line' size='base-large'></vwc-icon>
```