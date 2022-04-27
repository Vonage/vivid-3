# badge

Badge is a label that holds small amounts of information.
A badge can be used to display unread notifications, or to label a block of text.
Badges don’t work for navigation because they can't include a hyperlink.

```js
<script type='module'>
    import '@vonage/vivid/badge';
</script>
```

## Text

- Type: `String`
- Default: `''`

Add a `text` attribute to add text to the badge.

```html preview
<vwc-badge text='A default badge'></vwc-badge>
```

## Size

Use the `size` attribute to change the badge's size.

- Type: `'base-small'` | `'base'` | `'base-large'`
- Default: `'base'`


```html preview
<vwc-badge text='base-small' size='base-small'></vwc-badge>
<vwc-badge text='base' size='base'></vwc-badge>
<vwc-badge text='base-large' size='base-large'></vwc-badge>
```

## Shape

Use the `shape` attribute to change the badge's edges.

- Type: `'rounded'` | `'pill'`
- Default: `'rounded'`

```html preview
<vwc-badge text='rounded' shape='rounded'></vwc-badge>
<vwc-badge text='pill' shape='pill'></vwc-badge>
```

## Icon

Badge text can be affixed by a decorative icon, either by its start or end. 
Use the `icon` attribute to add an icon. Use the `icon-trailing` to place the icon to the right.

```html preview
<vwc-badge text='icon' icon='check-line'></vwc-badge>
<vwc-badge text='icon-trailing' icon='check-line' icon-trailing></vwc-badge>
```

## Appearance

Set the `appearance` attribute to change the badge's appearance.

- Type: `'filled'` | `'subtle'` | `'outlined'`
- Default: `'filled'`

```html preview
<vwc-badge text='filled' appearance='filled'></vwc-badge>
<vwc-badge text='subtle' appearance='subtle'></vwc-badge>
<vwc-badge text='outlined' appearance='outlined'></vwc-badge>
```

## Connotation

Set the `connotation` attribute to change the badge's connotation.
It accepts a subset of predefined values.

- Type: `'primary'` | `'cta'` | `'success'` | `'alert'` | `'warning'` | `'info'`
- Default: `'primary'`

### Filled badge with connotation

```html preview
<vwc-badge text='primary' connotation='primary' appearance="filled"></vwc-badge>
<vwc-badge text='cta' connotation='cta' appearance="filled"></vwc-badge>
<vwc-badge text='info' connotation='info' appearance="filled"></vwc-badge>
<vwc-badge text='success' connotation='success'></vwc-badge>
<vwc-badge text='warning' connotation='warning'></vwc-badge>
<vwc-badge text='alert' connotation='alert'></vwc-badge>
```

### Subtle badge with connotation

```html preview
<vwc-badge text='primary' appearance='subtle' connotation='primary'></vwc-badge>
<vwc-badge text='cta' appearance='subtle' connotation='cta'></vwc-badge>
<vwc-badge text='info' appearance='subtle' connotation='info'></vwc-badge>
<vwc-badge text='success' appearance='subtle' connotation='success'></vwc-badge>
<vwc-badge text='warning' appearance='subtle' connotation='warning'></vwc-badge>
<vwc-badge text='alert' appearance='subtle' connotation='alert'></vwc-badge>
```

### Outlined badge with connotation

```html preview
<vwc-badge text='primary' appearance='outlined' connotation='primary'></vwc-badge>
<vwc-badge text='cta' appearance='outlined' connotation='cta'></vwc-badge>
<vwc-badge text='info' appearance='outlined' connotation='info'></vwc-badge>
<vwc-badge text='success' appearance='outlined' connotation='success'></vwc-badge>
<vwc-badge text='warning' appearance='outlined' connotation='warning'></vwc-badge>
<vwc-badge text='alert' appearance='outlined' connotation='alert'></vwc-badge>
```
