# Combobox

Represents a combobox custom element.

```js
<script type="module">
  import '@vonage/vivid/combobox';
</script>
```

## Slots

### Default

Read more about [vwc-option](../../components/option).

```html preview
<vwc-combobox>
 <vwc-option text="First Option"></vwc-option>
 <vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

## Members

### Label

Use the `label` member to set the combobox's label.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-combobox label="Search for something">
 <vwc-option text="First Option"></vwc-option>
 <vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

### Value

- Type: `string` | `undefined`
- Default: `undefined`

Set the `value` attribute to set the default value for the input field. Setting the property on the element will not change the default value, but will change the value shown in the view as well as the submitted value in a form (imitating the native behavior).

```html preview
<vwc-combobox value="First Option">
 <vwc-option text="First Option"></vwc-option>
 <vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

### Placeholder

- Type: `string` | `undefined`
- Default: `undefined`

Add a `placeholder` attribute to add placeholder text to the input.

```html preview
<vwc-combobox placeholder="placeholder">
 <vwc-option text="First Option"></vwc-option>
 <vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```
### Autocomplete

- Type: `'inline'` | `'list'` | `'both'` | `'none'`
- Default: `undefined`

See [aria-autocomplete](https://www.w3.org/TR/wai-aria-1.2/#aria-autocomplete) for more information.

```html preview
<vwc-combobox autocomplete="both">
 <vwc-option text="First Option"></vwc-option>
 <vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

### Open

_Combobox_ internally uses _popup_ to display an element and its descendants above the rest of the document.

`open` property from _popup_ propagate through _combobox_ and sets its open state.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-combobox open>
  <vwc-option text="First Option"></vwc-option>
  <vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

### Placement

_Combobox_ internally uses _popup_ to display an element and its descendants above the rest of the document.

`placement` property from _popup_ propagate through _combobox_ and sets its position in accordance to its anchor.

- Type: `'top'` | `'bottom'`
- Default: `'bottom'`

```html preview
<style>
  .combobox-wrapper { /* for demo purposes */
    block-size: 140px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: start;
  }
</style>
<div class="combobox-wrapper">
  <vwc-combobox placement="top">
    <vwc-option text="First Option"></vwc-option>
    <vwc-option text="Second Option"></vwc-option>
  </vwc-combobox>
</div>
```

### Disabled

Add the `disabled` attribute to disable the combobox.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-combobox disabled>
 <vwc-option text="First Option"></vwc-option>
 <vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

## Properties

### options

A read-only list of options.

- Type: `Option[]`
- Default: `[]`

### selectedOptions

A read-only collection of the selected options.

- Type: `Option[]`
- Default: `[]`

### selectedIndex

The index of the selected option or -1 if no option is selected.

- Type: `number`
- Default: `undefined`

## Caveat

Document elements display precedence is formed by the imaginary z-axis [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context), commonly by order of which elements are rendered and special properties (e.g. _z-index_).
Combobox component is a low level element, unaware of its document context, but is, in most cases, required to overlay on top of all elements.