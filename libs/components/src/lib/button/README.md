# vwc-button

say a few words on button

```js
<script type='module'>
    import '@vonage/vivid/button';
</script>
```

## Label

- Type: `String`
- Default: `''`

Add a `label` attribute to add text to the button.

```html preview
<vwc-button appearance='filled' label='A default button'></vwc-button>
```

## Size

Use the `size` attribute to change the button's size.

- Type: `'base-small'` | `'base'` | `'base-large'`
- Default: `'medium'`

```html preview
<vwc-button appearance='filled' label='base-small' size='base-small'></vwc-button>
<vwc-button appearance='filled' label='base' size='base'></vwc-button>
<vwc-button appearance='filled' label='base-large' size='base-large'></vwc-button>
```

## Shape

Use the `shape` attribute to change the button's edges.

- Type: `'rounded'` | `'pill'`
- Default: `'rounded'`

```html preview
<vwc-button appearance='filled' label='rounded' shape='rounded'></vwc-button>
<vwc-button appearance='filled' label='pill' shape='pill'></vwc-button>
```

## Icon

Button text can be affixed by a decorative icon, either by its start or end. 
Use the `icon` attribute to add an icon. Use the `icon-trailing` to place the icon to the right.

```html preview
<vwc-button appearance="filled" label='icon' icon='check-line'></vwc-button>
<vwc-button appearance="filled" label='icon-trailing' icon='check-line' icon-trailing></vwc-button>
```

## Icon Only

If label not applied...

```html preview
<vwc-button appearance="filled" icon='message-sent-line'></vwc-button>
<vwc-button appearance="filled" shape="pill" icon='message-sent-line'></vwc-button>
```

## Appearance

Set the `appearance` attribute to change the button's appearance.

- Type: `'ghost'` | `'filled'` | `'outlined'`
- Default: `'ghost'`

```html preview
<vwc-button label='ghost' appearance='ghost'></vwc-button>
<vwc-button label='filled' appearance='filled'></vwc-button>
<vwc-button label='outlined' appearance='outlined'></vwc-button>
```

## Connotation

Set the `connotation` attribute to change the button's connotation.
It accepts a subset of predefined values.

- Type: `'primary'` | `'cta'` | `'success'` | `'alert'` | `'announcement'` | `'info'`
- Default: `'primary'`

### Ghost button with connotation

```html preview
<vwc-button appearance="ghost" label='primary' connotation='primary'></vwc-button>
<vwc-button appearance="ghost" label='cta' connotation='cta'></vwc-button>
<vwc-button appearance="ghost" label='success' connotation='success'></vwc-button>
<vwc-button appearance="ghost" label='alert' connotation='alert'></vwc-button>
```

### Filled button with connotation

```html preview
<vwc-button appearance="filled" label='primary' connotation='primary'></vwc-button>
<vwc-button appearance="filled" label='cta' connotation='cta'></vwc-button>
<vwc-button appearance="filled" label='success' connotation='success'></vwc-button>
<vwc-button appearance="filled" label='alert' connotation='alert'></vwc-button>
```

### Outlined button with connotation

```html preview
<vwc-button appearance="outlined" label='primary' connotation='primary'></vwc-button>
<vwc-button appearance="outlined" label='cta' connotation='cta'></vwc-button>
<vwc-button appearance="outlined" label='success' connotation='success'></vwc-button>
<vwc-button appearance="outlined" label='alert' connotation='alert'></vwc-button>
```

## States
### Disabled
```html preview
<vwc-button disabled appearance='ghost' label='ghost'></vwc-button>
<vwc-button disabled appearance='filled' label='filled'></vwc-button>
<vwc-button disabled appearance='outlined' label='outlined'></vwc-button>
```
