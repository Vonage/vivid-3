# Listbox

```js
<script type='module'>
    import '@vonage/vivid/listbox';
</script>
```

```html preview
<vwc-listbox>
  <vwc-listbox-option value="1" text="Listbox Option" role="option"></vwc-listbox-option>
  <vwc-listbox-option value="2" text="Listbox Option" role="option"></vwc-listbox-option>
  <vwc-listbox-option value="3" text="Listbox Option" role="option"></vwc-listbox-option>
</vwc-listbox>
```

## Members

### Multiple

Add the `multiple` attribute to select the listbox.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-listbox multiple>
  <vwc-listbox-option value="1" text="Listbox Option" role="option"></vwc-listbox-option>
  <vwc-listbox-option value="2" text="Listbox Option" role="option"></vwc-listbox-option>
  <vwc-listbox-option value="3" text="Listbox Option" role="option"></vwc-listbox-option>
</vwc-listbox>
```

### Disabled

Add the `disabled` attribute to disable the listbox.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-listbox disabled>
  <vwc-listbox-option value="1" text="Listbox Option" role="option"></vwc-listbox-option>
  <vwc-listbox-option value="2" text="Listbox Option" role="option"></vwc-listbox-option>
  <vwc-listbox-option value="3" text="Listbox Option" role="option"></vwc-listbox-option>
</vwc-listbox>
```
