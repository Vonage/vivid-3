# Listbox

```js
<script type='module'>
    import '@vonage/vivid/listbox';
</script>
```

## Slots

### Option

Read more about [vwc-option](../../components/option).

```html preview
<vwc-listbox>
  <vwc-option value="1" text="Option" role="option"></vwc-option>
  <vwc-option value="2" text="Option" role="option"></vwc-option>
  <vwc-option value="3" text="Option" role="option"></vwc-option>
</vwc-listbox>
```

## Members

### Multiple

Add the `multiple` attribute to select multiple options.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-listbox multiple>
  <vwc-option value="1" text="Option" role="option"></vwc-option>
  <vwc-option value="2" text="Option" role="option"></vwc-option>
  <vwc-option value="3" text="Option" role="option"></vwc-option>
</vwc-listbox>
```

### Appearance

Set the `appearance` attribute to change the listbox's appearance.

- Type: `'ghost'` | `'outlined'`
- Default: `'outlined'`

```html preview
<vwc-listbox appearance="ghost">
  <vwc-option value="1" text="Option" role="option"></vwc-option>
  <vwc-option value="2" text="Option" role="option"></vwc-option>
  <vwc-option value="3" text="Option" role="option"></vwc-option>
</vwc-listbox>
```

### Disabled

Add the `disabled` attribute to disable the listbox.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-listbox disabled>
  <vwc-option value="1" text="Option" role="option"></vwc-option>
  <vwc-option value="2" text="Option" role="option"></vwc-option>
  <vwc-option value="3" text="Option" role="option"></vwc-option>
</vwc-listbox>
```
