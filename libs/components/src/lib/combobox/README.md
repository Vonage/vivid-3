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

## CSS Variables

## Events

## Methods

## Accessibility

## Use Cases
