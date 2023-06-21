# Listbox

Listbox displays list of [vwc-option](../../components/option) and allow users to select from them. 
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

## Properties

### options

List of options.

- Type: `Option[]`
- Default: `[]`

### selectedOptions

A collection of the selected options.

- Type: `Option[]`
- Default: `[]`

### selectedIndex

The index of the selected option or -1 if no option is selected.

- Type: `number`
- Default: `undefined`
