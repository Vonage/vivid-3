# Listbox Option

```js
<script type='module'>
    import '@vonage/vivid/listbox-option';
</script>
```

## Members

### Text

Add the `text` attribute to add text to the Listbox Option.

- Type: `string`
- Default: `''`

```html preview
  <vwc-listbox-option text="Listbox Option"></vwc-listbox-option>
```

### Icon

Add the `icon` attribute to add an icon to the Listbox Option.
Check out the [vivid icons gallery](https://icons.vivid.vonage.com) to see what icons are available.

- Type: `string`
- Default: `''`

```html preview
<vwc-listbox-option text="Listbox Option" icon="chat-line"></vwc-listbox-option>
```

### Selected

Add the `selected` attribute to select the listbox-option.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-listbox-option text="Listbox Option" selected></vwc-listbox-option>
```

### Disabled

Add the `disabled` attribute to disable the listbox-option.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-listbox-option text="Listbox Option" disabled></vwc-listbox-option>
```

## Use Cases
### Common Usage

```html preview
<vwc-listbox>
  <vwc-listbox-option value="1" text="Listbox Option" role="option"></vwc-listbox-option>
  <vwc-listbox-option value="2" text="Listbox Option" role="option"></vwc-listbox-option>
  <vwc-listbox-option value="3" text="Listbox Option" role="option"></vwc-listbox-option>
</vwc-listbox>
```