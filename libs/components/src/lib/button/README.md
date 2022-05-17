# button

A button represents an action that the user can take. Use buttons to enable important actions.

```js
<script type='module'>
    import '@vonage/vivid/button';
</script>
```

## Label

- Type: `String`
- Default: `undefined`

Add a `label` attribute to add text to the button.

```html
<!-- preview -->
<vwc-button appearance='filled' label='A default button'></vwc-button>
```

## Appearance

Set the `appearance` attribute to change the button's appearance.

- Type: `'ghost'` | `'filled'` | `'outlined'`
- Default: `'ghost'`

```html
<!-- preview -->
<vwc-button label='ghost' appearance='ghost'></vwc-button>
<vwc-button label='filled' appearance='filled'></vwc-button>
<vwc-button label='outlined' appearance='outlined'></vwc-button>
```

## Icon

Use the `icon` attribute/property to set an icon to the button.
View list of available icon at the [vivid icons gallery](https://icons.vivid.vonage.com).

- Type: `String`
- Default: `undefined`

```html
<!-- preview -->
<vwc-button appearance="filled" icon='message-sent-line'></vwc-button>
<vwc-button appearance="filled" shape="pill" icon='message-sent-line'></vwc-button>
```

## Icon with Label

Button text can be affixed by a decorative icon, either by its start or end.
Use the `icon` attribute to add an icon. Use the `icon-trailing` to place the icon to the right.

```html
<!-- preview -->
<vwc-button appearance="filled" label='icon' icon='check-line'></vwc-button>
<vwc-button appearance="filled" label='icon-trailing' icon='check-line' icon-trailing></vwc-button>
```

## Shape

Use the `shape` attribute to set the button's edges.

- Type: `'rounded'` | `'pill'`
- Default: `'rounded'`

```html
<!-- preview -->
<vwc-button appearance='filled' label='rounded' shape='rounded'></vwc-button>
<vwc-button appearance='filled' label='pill' shape='pill'></vwc-button>
```

## Density

Use the `density` attribute to set the button's to one of the predefined block size extent.

- Type: `'condensed'` | `'normal'` | `'extended'`
- Default: `'normal'`

```html
<!-- preview -->
<vwc-button appearance='filled' label='condensed' density='condensed'></vwc-button>
<vwc-button appearance='filled' label='normal' density='normal'></vwc-button>
<vwc-button appearance='filled' label='extended' density='extended'></vwc-button>
```

## Stacked

Set the `stacked` attribute to change the button's layout to stacked.

- Type: `Boolean`
- Default: `false`

Caveats:

- This is only applicable to the `'rounded'` shape.
- This will override any applied [density](#density) style to match a predefined stacked block size.

```html
<!-- preview -->
<vwc-button stacked appearance='filled' label='Stacked'></vwc-button>
<vwc-button stacked appearance='filled' icon='message-sent-line' label='With Icon'></vwc-button>
<vwc-button stacked appearance='filled' icon='message-sent-line' icon-trailing label='Icon Trailing'></vwc-button>
<vwc-button stacked appearance='filled' icon='message-sent-line'></vwc-button>
```

## Connotation

Set the `connotation` attribute to change the button's connotation.
It accepts a subset of predefined values.

- Type: `'primary'` | `'cta'` | `'success'` | `'alert'`
- Default: `'primary'`

### Ghost button with connotation

```html
<!-- preview -->
<vwc-button appearance="ghost" label='primary' connotation='primary'></vwc-button>
<vwc-button appearance="ghost" label='cta' connotation='cta'></vwc-button>
<vwc-button appearance="ghost" label='success' connotation='success'></vwc-button>
<vwc-button appearance="ghost" label='alert' connotation='alert'></vwc-button>
```

### Filled button with connotation

```html
<!-- preview -->
<vwc-button appearance="filled" label='primary' connotation='primary'></vwc-button>
<vwc-button appearance="filled" label='cta' connotation='cta'></vwc-button>
<vwc-button appearance="filled" label='success' connotation='success'></vwc-button>
<vwc-button appearance="filled" label='alert' connotation='alert'></vwc-button>
```

### Outlined button with connotation

```html
<!-- preview -->
<vwc-button appearance="outlined" label='primary' connotation='primary'></vwc-button>
<vwc-button appearance="outlined" label='cta' connotation='cta'></vwc-button>
<vwc-button appearance="outlined" label='success' connotation='success'></vwc-button>
<vwc-button appearance="outlined" label='alert' connotation='alert'></vwc-button>
```

## Disabled
Add the `disabled` attribute to disable the button.

- Type: `Boolean`
- Default: `false`

```html
<!-- preview -->
<vwc-button appearance='ghost' label='ghost' disabled></vwc-button>
<vwc-button appearance='filled' label='filled' disabled></vwc-button>
<vwc-button appearance='outlined' label='outlined' disabled></vwc-button>
```
