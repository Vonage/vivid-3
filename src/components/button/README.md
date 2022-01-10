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
<vwc-button label='A default button'></vwc-button>
```

## Size

Use the `size` attribute to change the button's size.

- Type: `'small'` | `'medium'` | `'large'`
- Default: `'medium'`


```html preview
<vwc-button label='small' size='small'></vwc-button>
<vwc-button label='medium' size='medium'></vwc-button>
<vwc-button label='large' size='large'></vwc-button>
```

## Shape

Use the `shape` attribute to change the button's edges.

- Type: `'rounded'` | `'pill'`
- Default: `'rounded'`

```html preview
<vwc-button label='rounded' shape='rounded'></vwc-button>
<vwc-button label='pill' shape='pill'></vwc-button>
```

## Icon

Button text can be affixed by a decorative icon, either by its start or end. 
Use the `icon` attribute to add an icon. Use the `icon-trailing` to place the icon to the right.

```html preview
<vwc-button label='icon' icon='check-line'></vwc-button>
<vwc-button label='icon-trailing' icon='check-line' icon-trailing></vwc-button>
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
<vwc-button appearance="ghost" label='announcement' connotation='announcement'></vwc-button>
<vwc-button appearance="ghost" label='info' connotation='info'></vwc-button>
```

### Filled button with connotation

```html preview
<vwc-button appearance="filled" label='primary' connotation='primary'></vwc-button>
<vwc-button appearance="filled" label='cta' connotation='cta'></vwc-button>
<vwc-button appearance="filled" label='success' connotation='success'></vwc-button>
<vwc-button appearance="filled" label='alert' connotation='alert'></vwc-button>
<vwc-button appearance="filled" label='announcement' connotation='announcement'></vwc-button>
<vwc-button appearance="filled" label='info' connotation='info'></vwc-button>
```

### Outlined button with connotation

```html preview
<vwc-button appearance="outlined" label='primary' connotation='primary'></vwc-button>
<vwc-button appearance="outlined" label='cta' connotation='cta'></vwc-button>
<vwc-button appearance="outlined" label='success' connotation='success'></vwc-button>
<vwc-button appearance="outlined" label='alert' connotation='alert'></vwc-button>
<vwc-button appearance="outlined" label='announcement' connotation='announcement'></vwc-button>
<vwc-button appearance="outlined" label='info' connotation='info'></vwc-button>
```
