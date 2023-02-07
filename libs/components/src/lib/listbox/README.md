# Listbox

Listbox displays a list of [vwc-option](../../components/option) and allows users to select from them.
There are two types of listboxes: single-select and multi-select.
Click [here](https://www.w3.org/WAI/ARIA/apg/patterns/listbox) to learn more about Listbox's Keyboard Interaction and Accessibility.

```js
<script type='module'>
    import '@vonage/vivid/listbox';
</script>
```

## Slots

### Default

Read more about [vwc-option](../../components/option).

```html preview
<vwc-listbox>
  <vwc-option value="1" text="Option" selected></vwc-option>
  <vwc-option value="2" text="Option"></vwc-option>
  <vwc-option value="3" text="Option"></vwc-option>
</vwc-listbox>
```

## Members

### Multiple

Add the `multiple` attribute to select multiple options.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-listbox multiple>
  <vwc-option value="1" text="Option" selected></vwc-option>
  <vwc-option value="2" text="Option" selected></vwc-option>
  <vwc-option value="3" text="Option"></vwc-option>
</vwc-listbox>
```

### Appearance

Set the `appearance` attribute to change the listbox's appearance.

- Type: `'ghost'` | `'outlined'`
- Default: `'outlined'`

```html preview
<vwc-listbox appearance="ghost">
  <vwc-option value="1" text="Option"></vwc-option>
  <vwc-option value="2" text="Option"></vwc-option>
  <vwc-option value="3" text="Option"></vwc-option>
</vwc-listbox>
```

### Direction

Set the `direction` property to change the listbox options' flow.

- Type: `'vertical'` | `'horizontal'`
- Default: `'vertical'`

```html preview
<vwc-listbox direction="horizontal">
  <vwc-option value="1" text="Option"></vwc-option>
  <vwc-option value="2" text="Option"></vwc-option>
  <vwc-option value="3" text="Option"></vwc-option>
</vwc-listbox>
```

### Shape

Use the `shape` attribute to set the listbox's (and its descendent options) edges.

note that `shape`'s `pill` value is **only supported** when the `direction` is set to `horizontal`.

- Type: `'rounded'` | `'pill'`
- Default: `'rounded'`

```html preview
<vwc-listbox shape="pill" direction="horizontal" >
  <vwc-option value="1" text="Option 1"></vwc-option>
  <vwc-option value="2" text="Option 2"></vwc-option>
  <vwc-option value="3" text="Option 3"></vwc-option>
</vwc-listbox>
```

### Disabled

Add the `disabled` attribute to disable the listbox.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-listbox disabled>
  <vwc-option value="1" text="Option"></vwc-option>
  <vwc-option value="2" text="Option"></vwc-option>
  <vwc-option value="3" text="Option"></vwc-option>
</vwc-listbox>
```
