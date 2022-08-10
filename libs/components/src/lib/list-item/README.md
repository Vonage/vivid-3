# List Item

```js
<script type='module'>
    import '@vonage/vivid/list-item';
</script>
```

## Members

### Text

Add the `text` attribute to add text to the list item.

- Type: `string`
- Default: `''`

```html preview
  <vwc-list-item text="List Item"></vwc-list-item>
```

### Icon

Add the `icon` attribute to add an icon to the list item.
Check out the [vivid icons gallery](https://icons.vivid.vonage.com) to see what icons are available.

- Type: `string`
- Default: `''`

```html preview
<vwc-list-item text="List item" icon="chat-line"></vwc-list-item>
```

### Subtext

Add the `subtext` attribute to add subtext to the list item.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-list-item text="List item" subtext="Subtext of the list item"></vwc-list-item>
```

## Slots

### Meta

Add the `meta` slot to add a metadata to the list item.

```html preview
<vwc-list-item text="List item">
  <vwc-button slot="meta" icon="info-line" appearance="ghost"></vwc-button>
</vwc-list-item>
```

## Use Cases
### Common Usage

```html preview
  <vwc-list-item text="1st list item" subtext="subtext of the 1st list item" icon="chat-line">
    <vwc-button slot="meta" icon="more-vertical-solid" appearance="ghost"></vwc-button>
  </vwc-list-item>
  <vwc-list-item text="2nd list item" subtext="subtext of the 2nd list item" icon="chat-line">
    <vwc-button slot="meta" icon="more-vertical-solid" appearance="ghost"></vwc-button>
  </vwc-list-item>
  <vwc-list-item text="3rd list item" subtext="subtext of the 3rd list item" icon="chat-line">
    <vwc-button slot="meta" icon="more-vertical-solid" appearance="ghost"></vwc-button>
  </vwc-list-item>
```