# Combobox

Represents a combobox custom element.

```js
<script type="module">
  import '@vonage/vivid/combobox';
</script>
```

## Slots

### Option

Read more about [vwc-option](../../components/option).

```html preview
<style>
  :root { /* for demo purposes */
    block-size: 280px;
  }
</style>

<vwc-combobox>
 <vwc-option text="Christopher Eccleston"></vwc-option>
 <vwc-option text="David Tenant"></vwc-option>
 <vwc-option text="Matt Smith"></vwc-option>
 <vwc-option text="Peter Capaldi"></vwc-option>
</vwc-combobox>
```

## Members

### Label

Use the `label` member to set the combobox's label.

- Type: `string`
- Default: `undefined`

```html preview
<style>
  :root { /* for demo purposes */
    block-size: 280px;
  }
</style>

<vwc-combobox label="Search for something">
 <vwc-option text="Christopher Eccleston"></vwc-option>
 <vwc-option text="David Tenant"></vwc-option>
 <vwc-option text="Matt Smith"></vwc-option>
 <vwc-option text="Peter Capaldi"></vwc-option>
</vwc-combobox>
```

### Value

- Type: `string` | `undefined`
- Default: `undefined`

Set the `value` attribute to set the default value for the input field. Setting the property on the element will not change the default value, but will change the value shown in the view as well as the submitted value in a form (imitating the native behavior).

```html preview
<style>
  :root { /* for demo purposes */
    block-size: 280px;
  }
</style>

<vwc-combobox value="ewfrwefew">
 <vwc-option text="Christopher Eccleston"></vwc-option>
 <vwc-option text="David Tenant"></vwc-option>
 <vwc-option text="Matt Smith"></vwc-option>
 <vwc-option text="Peter Capaldi"></vwc-option>
</vwc-combobox>
```

### Placeholder

- Type: `string` | `undefined`
- Default: `undefined`

Add a `placeholder` attribute to add placeholder text to the input.

```html preview
<style>
  :root { /* for demo purposes */
    block-size: 280px;
  }
</style>

<vwc-combobox placeholder="ewfrwefew">
 <vwc-option text="Christopher Eccleston"></vwc-option>
 <vwc-option text="David Tenant"></vwc-option>
 <vwc-option text="Matt Smith"></vwc-option>
 <vwc-option text="Peter Capaldi"></vwc-option>
</vwc-combobox>
```
### Autocomplete

- Type: `'inline'` | `'list'` | `'both'` | `undefined`
- Default: `undefined`

See (https://www.w3.org/TR/wai-aria-1.2/#aria-autocomplete)[aria-autocomplete] for more information.

```html preview
<style>
  :root { /* for demo purposes */
    block-size: 280px;
  }
</style>

<vwc-combobox autocomplete="both">
 <vwc-option text="Christopher Eccleston"></vwc-option>
 <vwc-option text="David Tenant"></vwc-option>
 <vwc-option text="Matt Smith"></vwc-option>
 <vwc-option text="Peter Capaldi"></vwc-option>
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
    block-size: 280px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: start;
  }
</style>
<div class="combobox-wrapper">
  <vwc-combobox placement="top">
    <vwc-option text="Christopher Eccleston"></vwc-option>
    <vwc-option text="David Tenant"></vwc-option>
  </vwc-combobox>
</div>
```

### Disabled

Add the `disabled` attribute to disable the combobox.

- Type: `boolean`
- Default: `false`

```html preview
<style>
  :root { /* for demo purposes */
    block-size: 280px;
  }
</style>

<vwc-combobox disabled>
 <vwc-option text="Christopher Eccleston"></vwc-option>
 <vwc-option text="David Tenant"></vwc-option>
 <vwc-option text="Matt Smith"></vwc-option>
 <vwc-option text="Peter Capaldi"></vwc-option>
</vwc-combobox>
```