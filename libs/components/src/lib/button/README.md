# button

A button represents an action that the user can take. Use buttons to enable important actions.

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

Use the `size` attribute to set the button's to a predefined block size extent.

- Type: `'condensed'` | `'base'` | `'extended'`
- Default: `'base'`

```html preview
<vwc-button appearance='filled' label='condensed' basis='condensed'></vwc-button>
<vwc-button appearance='filled' label='base' basis='base'></vwc-button>
<vwc-button appearance='filled' label='extended' basis='extended'></vwc-button>
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

## Stacked

Set the `stacked` attribute to change the button's layout to stacked.
- Default: `false`

```html preview
<vwc-button label='density -1' appearance='filled' icon='message-sent-line' stacked density='-1'></vwc-button>
<vwc-button label='base of stacked' appearance='filled' icon='message-sent-line' stacked density='0'></vwc-button>
<vwc-button label='density +1' appearance='outlined' icon='message-sent-line' stacked density='1'></vwc-button>
```

## Connotation

Set the `connotation` attribute to change the button's connotation.
It accepts a subset of predefined values.

- Type: `'primary'` | `'cta'` | `'success'` | `'alert'`
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
