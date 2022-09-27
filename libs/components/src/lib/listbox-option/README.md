# Listbox Option

```js
<script type='module'>
    import '@vonage/vivid/option';
</script>
```

## Members

### Text

Add the `text` attribute to add text to the Listbox Option.

- Type: `string`
- Default: `''`

```html preview
  <vwc-option text="Listbox Option"></vwc-option>
```

### Icon

Add the `icon` attribute to add an icon to the Listbox Option.
Check out the [vivid icons gallery](https://icons.vivid.vonage.com) to see what icons are available.

- Type: `string`
- Default: `''`

```html preview
<vwc-option text="Listbox Option" icon="chat-line"></vwc-option>
```

### Selected

Add the `selected` attribute to select the option.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-option text="Listbox Option" selected></vwc-option>
```

### Disabled

Add the `disabled` attribute to disable the option.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-option text="Listbox Option" disabled></vwc-option>
```

## Use Cases

### Common Usage

```html preview
<vwc-listbox>
  <vwc-option value="1" text="Listbox Option" role="option"></vwc-option>
  <vwc-option value="2" text="Listbox Option" role="option"></vwc-option>
  <vwc-option value="3" text="Listbox Option" role="option"></vwc-option>
</vwc-listbox>
```
