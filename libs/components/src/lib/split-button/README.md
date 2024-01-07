# Split Button

A split button is a button with two components: a label and an arrow; clicking on the label selects a default action, and clicking on the arrow opens up a list of other possible actions.

```js
<script type='module'>
  import '@vonage/vivid/split-button';
</script>
```

## Members

### Label

- Type: `string`
- Default: `undefined`

Add a `label` attribute to add text to the split button.

```html preview
<vwc-split-button appearance='filled' label='A default split button'></vwc-split-button>
```

### Appearance

Set the `appearance` attribute to change the split button's appearance.

- Type: `'ghost'` | `'filled'` | `'outlined'`
- Default: `'ghost'`

```html preview
<vwc-split-button label='ghost' appearance='ghost'></vwc-split-button>
<vwc-split-button label='filled' appearance='filled'></vwc-split-button>
<vwc-split-button label='outlined' appearance='outlined'></vwc-split-button>
```

### Icon

Use `icon` to set an icon to the split button.
View list of available icon at the [vivid icons gallery](../../icons/icons-gallery).

Note: Icon, by its own, doesn't make a discernible text. An `aria-label` must be provided to ensure that the user can understand the split button's purpose.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-split-button appearance="filled" icon='compose-line' aria-label="Send Message"></vwc-split-button>
```

### Split Indicator

Use `split-indicator` to set an indicator icon to the split button.
View list of available icon at the [vivid icons gallery](../../icons/icons-gallery).

See the [Accessibility notes](#accessibility) if you would like to customize the split indicator's default aria-label.

- Type: `string`
- Default: `chevron-down-line`

```html preview
<vwc-split-button appearance="filled" label='Split Indicator' split-indicator="more-vertical-solid"></vwc-split-button>
```

### Shape

Use the `shape` attribute to set the split button's edges.

- Type: `'rounded'` | `'pill'`
- Default: `'rounded'`

```html preview
<vwc-split-button appearance='filled' label='rounded' shape='rounded'></vwc-split-button>
<vwc-split-button appearance='filled' label='pill' shape='pill'></vwc-split-button>
```

### Size

Use the `size` attribute to set the split button's to one of the predefined block size extent.

- Type: `'super-condensed'` | `'condensed'` | `'normal'` | `'expanded'`
- Default: `'normal'`

```html preview
<vwc-split-button appearance='filled' label='super-condensed' size='super-condensed'></vwc-split-button>
<vwc-split-button appearance='filled' label='condensed' size='condensed'></vwc-split-button>
<vwc-split-button appearance='filled' label='normal' size='normal'></vwc-split-button>
<vwc-split-button appearance='filled' label='expanded' size='expanded'></vwc-split-button>
```

### Connotation

Set the `connotation` attribute to change the split button's connotation.
It accepts a subset of predefined values.

- Type: `'accent'` | `'cta'` | `'success'` | `'alert'`
- Default: `'accent'`

```html preview
<vwc-split-button appearance='filled' label='accent' connotation='accent'></vwc-split-button>
<vwc-split-button appearance='filled' label='cta' connotation='cta'></vwc-split-button>
<vwc-split-button appearance='filled' label='success' connotation='success'></vwc-split-button>
<vwc-split-button appearance='filled' label='alert' connotation='alert'></vwc-split-button>
```

### Disabled

Add the `disabled` attribute to disable the split button.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-split-button appearance='ghost' label='ghost' disabled></vwc-split-button>
<vwc-split-button appearance='filled' label='filled' disabled></vwc-split-button>
<vwc-split-button appearance='outlined' label='outlined' disabled></vwc-split-button>
```

## Properties

<div class="table-wrapper">

| Name     | Type        | Description                                                                              |
|----------| -------- |------------------------------------------------------------------------------------------|
| `action`  | `HTMLButtonElement` | A read-only HTML button element that represents the left button. |
| `indicator`  | `HTMLButtonElement` | A read-only HTML button element that represents the right button. |

</div>

## Use Cases

### Split Button with anchored Menu

```html preview
<style>
  html { /* for demo purposes */
    block-size: 200px;
  }
</style>

<vwc-split-button id="splitButton" appearance="filled" label="A default split button" aria-expanded="true">
  <vwc-menu id="menu" placement="bottom-end" open>
    <vwc-menu-item text="Menu item 1"></vwc-menu-item>
    <vwc-menu-item text="Menu item 2"></vwc-menu-item>
  </vwc-menu>
</vwc-split-button>

<script>
  window.onload = function(){ 
    menu.anchor = splitButton.indicator;
    splitButton.action.onclick  = () => {
      alert("clicked on action"); 
    };
    splitButton.indicator.onclick = () => { 
      menu.open = !menu.open; 
      splitButton.ariaExpanded = menu.open;
    };
  }
</script>
```

### Split Button with Tooltip

```html preview
<style>
  html { /* for demo purposes */
    block-size: 100px;
		text-align: center;
  }
</style>

<vwc-split-button id="splitButton" appearance="filled" icon="compose-line" aria-label="Write a new message">
	<vwc-tooltip id="tooltip" text="Write a new message"></vwc-tooltip>
</vwc-split-button>

<script>
  window.onload = function(){
		tooltip.anchor = splitButton.action;
  }
</script>
```

### Icon

Set the `icon` slot to show an icon.  
If set, the `icon` attribute is ignored.  
Note: Icon, by its own, doesn't make a discernible text. An `aria-label` must be provided to ensure that the user can understand the split button's purpose.


```html preview
<vwc-split-button appearance='outlined' label='submit'>
		<vwc-icon slot="icon" name="check-circle-solid" connotation="success"></vwc-icon>
</vwc-split-button>
```

## Accessibility

- `aria-expanded` - When the menu is open, [aria-expanded](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded) should be set to true, and when it is closed, it should be set to false.

- `aria-haspopup` - Split button's [aria-haspopup](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup) is always set to "true". The menu must be set to the indicator of a split button.

- `aria-label` - When icon-only button is used, an [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) should be provided to ensure that the user can understand the button's purpose.

- `indicator-aria-label` - The indicator has a default `aria-label`, which will be a localised version of "Show more actions". You can override this by setting the `indicator-aria-label` attribute.
