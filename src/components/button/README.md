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

Badge text can be affixed by a decorative icon, either by its start or end. 
Use the `icon` attribute to add an icon. Use the `icon-trailing` to place the icon to the right.

```html preview
<vwc-button label='icon' icon='check-line'></vwc-button>
<vwc-button label='icon-trailing' icon='check-line' icon-trailing></vwc-button>
```

## Layout

Set the `layout` attribute to change the button's layout.

- Type: `'filled'` | `'soft'` | `'outlined'`
- Default: `'filled'`

```html preview
<vwc-button label='filled' layout='filled'></vwc-button>
<vwc-button label='soft' layout='soft'></vwc-button>
<vwc-button label='outlined' layout='outlined'></vwc-button>
```

## Connotation

Set the `connotation` attribute to change the button's connotation.
It accepts a subset of predefined values.

- Type: `'primary'` | `'cta'` | `'success'` | `'alert'` | `'warning'` | `'info'`
- Default: `'primary'`

### Filled button with connotation

```html preview
<vwc-button label='primary' connotation='primary'></vwc-button>
<vwc-button label='cta' connotation='cta'></vwc-button>
<vwc-button label='info' connotation='info'></vwc-button>
<vwc-button label='success' connotation='success'></vwc-button>
<vwc-button label='warning' connotation='warning'></vwc-button>
<vwc-button label='alert' connotation='alert'></vwc-button>
```

### Soft button with connotation

```html preview
<vwc-button label='primary' layout='soft' connotation='primary'></vwc-button>
<vwc-button label='cta' layout='soft' connotation='cta'></vwc-button>
<vwc-button label='info' layout='soft' connotation='info'></vwc-button>
<vwc-button label='success' layout='soft' connotation='success'></vwc-button>
<vwc-button label='warning' layout='soft' connotation='warning'></vwc-button>
<vwc-button label='alert' layout='soft' connotation='alert'></vwc-button>
```

### Outlined button with connotation

```html preview
<vwc-button label='primary' layout='outlined' connotation='primary'></vwc-button>
<vwc-button label='cta' layout='outlined' connotation='cta'></vwc-button>
<vwc-button label='info' layout='outlined' connotation='info'></vwc-button>
<vwc-button label='success' layout='outlined' connotation='success'></vwc-button>
<vwc-button label='warning' layout='outlined' connotation='warning'></vwc-button>
<vwc-button label='alert' layout='outlined' connotation='alert'></vwc-button>
```