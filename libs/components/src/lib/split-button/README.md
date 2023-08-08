# Split Button

A split button is a button with two components: a label and an arrow; clicking on the label selects a default action, and clicking on the arrow opens up a list of other possible actions.

```js
<script type='module'>
  import '@vonage/vivid/split-button';
</script>
```

```html preview
<style>
  html { /* for demo purposes */
    block-size: 200px;
  }
</style>

<vwc-split-button id="splitButton" appearance="filled" label="A default split button" aria-expanded="true"></vwc-split-button>
<vwc-menu id="menu" placement="bottom-end" open>
  <vwc-menu-item text="Menu item 1"></vwc-menu-item>
  <vwc-menu-item text="Menu item 2"></vwc-menu-item>
</vwc-menu>

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

Note: Icon, by its own, doesn't make a discernible text. An `aria-label`, `aria-labelledby` or `title` must be provided to ensure that the user can understand the split button's purpose.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-split-button appearance="filled" icon='compose-line' aria-label="Send Message"></vwc-split-button>
```

### Split Indicator

Use `split-indicator` to set an indicator icon to the split button.
View list of available icon at the [vivid icons gallery](../../icons/icons-gallery).

Note: Icon, by its own, doesn't make a discernible text. An `aria-label`, `aria-labelledby` or `title` must be provided to ensure that the user can understand the indicator's purpose.

- Type: `string`
- Default: `chevron-down-line`

```html preview
<vwc-split-button appearance="filled" label='Split Indicator' split-indicator="more-vertical-solid" aria-label="Show more options"></vwc-split-button>
```

### Icon with Label

Button text can be affixed by a decorative icon.

```html preview
<vwc-split-button appearance="filled" label='icon' icon='compose-line'></vwc-split-button>
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

- Type: `'accent'` | `'cta'`
- Default: `'accent'`

```html preview
<vwc-split-button appearance='filled' label='accent' connotation='accent'></vwc-split-button>
<vwc-split-button appearance='filled' label='cta' connotation='cta'></vwc-split-button>
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

## Accessibility

`aria expanded` - When the anchor is open, [aria-expanded](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded) should be set to true, and when it is closed, it should be set to false.