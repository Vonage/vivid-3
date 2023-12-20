# Button

A button represents an action that the user can take. Use buttons to enable important actions.

All [native attributes of `<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) are supported as well as some enhancements.


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
View the list of available icons at the [vivid icons gallery](../../icons/icons-gallery).

Note: An icon on its own doesn't make a discernible text. An `aria-label` or `title` must be provided to ensure that the user can understand the button's purpose.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-button appearance="filled" icon='message-sent-line' aria-label="Send Message"></vwc-button> 
<vwc-button appearance="filled" icon='message-sent-line' title="Send Message" shape="pill"></vwc-button>
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
<hr>
<vwc-button shape='pill' appearance='filled' label='super-condensed' size='super-condensed'></vwc-button>
<vwc-button shape='pill' appearance='filled' label='condensed' size='condensed'></vwc-button>
<vwc-button shape='pill' appearance='filled' label='normal' size='normal'></vwc-button>
<vwc-button shape='pill' appearance='filled' label='expanded' size='expanded'></vwc-button>
<hr>
<vwc-button stacked icon='message-sent-line' appearance='filled' label='super-condensed' size='super-condensed'></vwc-button>
<vwc-button stacked icon='message-sent-line' appearance='filled' label='condensed' size='condensed'></vwc-button>
<vwc-button stacked icon='message-sent-line' appearance='filled' label='normal' size='normal'></vwc-button>
<vwc-button stacked icon='message-sent-line' appearance='filled' label='expanded' size='expanded'></vwc-button>
<hr>
<vwc-button stacked icon='message-sent-line' shape='pill' appearance='filled' label='super-condensed' size='super-condensed'></vwc-button>
<vwc-button stacked icon='message-sent-line' shape='pill' appearance='filled' label='condensed' size='condensed'></vwc-button>
<vwc-button stacked icon='message-sent-line' shape='pill' appearance='filled' label='normal' size='normal'></vwc-button>
<vwc-button stacked icon='message-sent-line' shape='pill' appearance='filled' label='expanded' size='expanded'></vwc-button>

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
The indicator will replace the icon if one is set, or the label text for text-only buttons.
The indicator is not displayed when using the `super-condensed` size.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-button appearance="ghost" label="ghost" pending></vwc-button>
<vwc-button appearance="filled" label="filled" pending></vwc-button>
<vwc-button appearance="outlined" label="outlined" pending></vwc-button>
<vwc-button appearance="ghost" icon="check-line" label="ghost with icon" pending></vwc-button>
<vwc-button appearance="filled" icon="check-line" label="filled with icon" pending></vwc-button>
<vwc-button appearance="outlined" icon="check-line" label="outlined with icon" pending></vwc-button>
```

## Slots

### Icon

Set the `icon` slot to show an icon before the button's label.
If set, the `icon` attribute is ignored.

```html preview
<style>
	.color-animation {
		animation: heightChange 1.5s infinite; 
	}
	@keyframes heightChange {
			0% {
				clip-path: inset(0% 0% 0% 0%);
			}
				25% {
				clip-path: inset(0% 0% 45% 0%);
			}
			  50% {
				clip-path: inset(0% 0% 80% 0%);
			}
				100% {
				clip-path: inset(0% 0% 0% 0%);
			}
	}
</style>
<vwc-button>
  <vwc-icon slot="icon">
  	<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  		<g>
        <path d="M5.5 9.6C5.5 13.1344 8.41037 16 12 16C15.5896 16 18.5 13.1344 18.5 9.6V6.4C18.5 2.8656 15.5896 0 12 0C8.41037 0 5.5 2.8656 5.5 6.4V9.6Z" fill="var(--vvd-color-success-400)" />
    		<path d="M5.5 9.6C5.5 13.1344 8.41037 16 12 16C15.5896 16 18.5 13.1344 18.5 9.6V6.4C18.5 2.8656 15.5896 0 12 0C8.41037 0 5.5 2.8656 5.5 6.4V9.6Z" fill="currentColor" id="animation" class="color-animation" />
    		<path d="M3 10.3333C3 9.59695 2.32843 9 1.5 9C0.671573 9 0 9.59695 0 10.3333C0 15.7728 4.58052 20.2613 10.5 20.9175V24H13.5V20.9175C19.4195 20.2613 24 15.7728 24 10.3333C24 9.59695 23.3284 9 22.5 9C21.6716 9 21 9.59695 21 10.3333C21 14.7516 16.9706 18.3333 12 18.3333C7.02943 18.3333 3 14.7516 3 10.3333Z" fill="currentColor" />
  		</g>
</svg>
  </vwc-icon>
</vwc-button>
```

## Accessibility 
When deciding between `aria-label` or `title`, keep in mind that `aria-label` is better for accessibility.  
The assistive technology will read the `aria-label` text rather than the `title` if both are set.

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
  document.getElementById('button').addEventListener('click', () => {
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
  icon='message-sent-line'
  shape='pill'
  appearance='filled'>
</vwc-button>
```
