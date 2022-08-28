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

### Text Secondary

Add the `text-secondary` attribute or `textSecondary` property to add secondary text to the listbox-option.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-listbox-option text="Listbox Option" text-secondary="Secondary text of the Listbox Option"></vwc-listbox-option>
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

## Slots

### Meta

Add the `meta` slot to add a metadata to the Listbox Option.

```html preview
<vwc-listbox-option text="Listbox Option">
  <vwc-button slot="meta" icon="info-line" appearance="ghost"></vwc-button>
</vwc-listbox-option>
```

## Use Cases
### Common Usage

```html preview
<vwc-listbox>
  <vwc-listbox-option text="1st Listbox Option" text-secondary="Secondary text of the 1st Listbox Option" icon="chat-line">
    <vwc-button slot="meta" icon="more-vertical-solid" appearance="ghost"></vwc-button>
  </vwc-listbox-option>
  <vwc-listbox-option text="2nd Listbox Option" text-secondary="Secondary text of the 2nd Listbox Option" icon="chat-line">
    <vwc-button slot="meta" icon="more-vertical-solid" appearance="ghost"></vwc-button>
  </vwc-listbox-option>
  <vwc-listbox-option text="3rd Listbox Option" text-secondary="Secondary text of the 3rd Listbox Option" icon="chat-line">
    <vwc-button slot="meta" icon="more-vertical-solid" appearance="ghost"></vwc-button>
  </vwc-listbox-option>
</vwc-listbox>
```