# Combobox

A combobox is an input widget that has an associated popup. The popup enables users to choose suggested values for the input from a collection.

```js
<script type="module">
  import '@vonage/vivid/combobox';
</script>
```

## Members

### Label

Use the `label` member to set the combobox's label.

- Type: `string`
- Default: `undefined`

```html preview
<style>
	html {
		block-size: 200px; /* for demo purposes */
	}
</style>
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
<style>
	html {
		block-size: 200px; /* for demo purposes */
	}
</style>
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

Use the `open` member to set the combobox's open state.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-combobox open>
  <vwc-option text="First Option"></vwc-option>
  <vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

### Placement

Use the `placement` member to set the combobox's placement in accordance to its anchor.

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

<div class="table-wrapper">

| Name              | Type       | Default     | Description                                                      |
| ----------------- | ---------- | ----------- | ---------------------------------------------------------------- |
| `options`         | `Option[]` | `[]`        | A read-only list of options.                                     |
| `selectedOptions` | `Option[]` | `[]`        | A read-only collection of the selected options.                  |
| `selectedIndex`   | `number`   | `undefined` | The index of the selected option or -1 if no option is selected. |

</div>

## Slots

### Default

Place [vwc-option](../../components/option) elements inside the default slot to create the list of suggested options.

```html preview
<vwc-combobox>
 <vwc-option text="First Option"></vwc-option>
 <vwc-option text="Second Option"></vwc-option>
</vwc-combobox>
```

## Caveat

Document elements display precedence is formed by the imaginary z-axis [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context), commonly by order of which elements are rendered and special properties (e.g. _z-index_).
Combobox component is a low level element, unaware of its document context, but is, in most cases, required to overlay on top of all elements.

A common practice used in apps / frameworks to promote a popup component to top other elements z-axis, is to utilise a service that dynamically appends a popup component to the end of the body element, when called for.

This helps ensure elements don't render on top of a popup.
