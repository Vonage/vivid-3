# Button

A button represents an action that the user can take. Use buttons to enable important actions.
All native attributes of `button` are supported as well as some enhancements.


```js
<script type='module'>
  import '@vonage/vivid/button';
</script>
```

## Members

### Label

- Type: `string`
- Default: `undefined`

Add a `label` attribute to add text to the button.

```html preview
<vwc-button appearance='filled' label='A default button'></vwc-button>
```

### Appearance

Set the `appearance` attribute to change the button's appearance.

- Type: `'ghost'` | `'filled'` | `'outlined'`
- Default: `'ghost'`

```html preview
<vwc-button label='ghost' appearance='ghost'></vwc-button>
<vwc-button label='filled' appearance='filled'></vwc-button>
<vwc-button label='outlined' appearance='outlined'></vwc-button>
```

### Icon

Use `icon` to set an icon to the button.
View list of available icon at the [vivid icons gallery](https://icons.vivid.vonage.com).

Note: Icon, by its own, doesn't make a discernible text. An `aria-label`, `aria-labelledby` or `title` must be provided to ensure that the user can understand the button's purpose.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-button appearance="filled" icon='message-sent-line' aria-label="Send Message"></vwc-button>
<vwc-button appearance="filled" icon='message-sent-line' aria-label="Send Message" shape="pill"></vwc-button>
```

### Icon with Label

Button text can be affixed by a decorative icon, either by its start or end.
Toggle `icon-trailing` to set the icon's horizontal alignment.

```html preview
<vwc-button appearance="filled" label='icon' icon='check-line'></vwc-button>
<vwc-button appearance="filled" label='icon-trailing' icon='check-line' icon-trailing></vwc-button>
```

### Shape

Use the `shape` attribute to set the button's edges.

- Type: `'rounded'` | `'pill'`
- Default: `'rounded'`

```html preview
<vwc-button appearance='filled' label='rounded' shape='rounded'></vwc-button>
<vwc-button appearance='filled' label='pill' shape='pill'></vwc-button>
```

### Size

Use the `size` attribute to set the button's to one of the predefined block size extent.

- Type: `'super-condensed'` | `'condensed'` | `'normal'` | `'expanded'`
- Default: `'normal'`

```html preview
<vwc-button appearance='filled' label='super-condensed' size='super-condensed'></vwc-button>
<vwc-button appearance='filled' label='condensed' size='condensed'></vwc-button>
<vwc-button appearance='filled' label='normal' size='normal'></vwc-button>
<vwc-button appearance='filled' label='expanded' size='expanded'></vwc-button>
```

### Stacked

Set the `stacked` attribute to change the button's layout to stacked.

- Type: `boolean`
- Default: `false`

Caveats:

- This is only applicable to the `'rounded'` shape.
- This will override any applied [size](#size) style to match a predefined stacked block size.

```html preview

<vwc-button stacked appearance='filled' icon='message-sent-line' label='With Icon'></vwc-button>
<vwc-button stacked appearance='filled' icon='message-sent-line' icon-trailing label='Icon Trailing'></vwc-button>
```

### Connotation

Set the `connotation` attribute to change the button's connotation.
It accepts a subset of predefined values.

- Type: `'accent'` | `'cta'` | `'success'` | `'alert'`
- Default: `'accent'`

#### Ghost button with connotation

```html preview
<vwc-button appearance="ghost" label='accent' connotation='accent'></vwc-button>
<vwc-button appearance="ghost" label='cta' connotation='cta'></vwc-button>
<vwc-button appearance="ghost" label='success' connotation='success'></vwc-button>
<vwc-button appearance="ghost" label='alert' connotation='alert'></vwc-button>
```

#### Filled button with connotation

```html preview
<vwc-button appearance="filled" label='accent' connotation='accent'></vwc-button>
<vwc-button appearance="filled" label='cta' connotation='cta'></vwc-button>
<vwc-button appearance="filled" label='success' connotation='success'></vwc-button>
<vwc-button appearance="filled" label='alert' connotation='alert'></vwc-button>
```

#### Outlined button with connotation

```html preview
<vwc-button appearance="outlined" label='accent' connotation='accent'></vwc-button>
<vwc-button appearance="outlined" label='cta' connotation='cta'></vwc-button>
<vwc-button appearance="outlined" label='success' connotation='success'></vwc-button>
<vwc-button appearance="outlined" label='alert' connotation='alert'></vwc-button>
```

### Disabled

Add the `disabled` attribute to disable the button.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-button appearance='ghost' label='ghost' disabled></vwc-button>
<vwc-button appearance='filled' label='filled' disabled></vwc-button>
<vwc-button appearance='outlined' label='outlined' disabled></vwc-button>
```

### Pending

Add the `pending` attribute to disable the button and display a processing indicator.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-button appearance='ghost' label='ghost' pending></vwc-button>
<vwc-button appearance='filled' label='filled' pending></vwc-button>
<vwc-button appearance='outlined' label='outlined' pending></vwc-button>
```

## Use Cases

### Toggle Button

```html preview
<vwc-button
  id='button'
  connotation='cta'
  shape='pill'
  icon='microphone-solid'
  aria-label="Mute">
</vwc-button>

<script>
  button.addEventListener('click', () => {
    button.ariaPressed = !button.ariaPressed;
    button.icon = button.ariaPressed ? 'mic-mute-solid' : 'microphone-solid';
    button.ariaLabel = button.ariaPressed ? 'Unmute' : 'Mute';
  });
</script>
```

### Full-width Button
```html preview
<style>
.button-width {
  display: block;
}
</style>
<vwc-button
  class='button-width'
  label="I'm full width"
  shape='pill'
  appearance='filled'>
</vwc-button>
```

## Custom Colors

```html preview variables
<vwc-button connotation="$CONNOTATION" label='ghost' appearance='ghost'></vwc-button>
<vwc-button connotation="$CONNOTATION" label='filled' appearance='filled'></vwc-button>
<vwc-button connotation="$CONNOTATION" label='outlined' appearance='outlined'></vwc-button>
```
