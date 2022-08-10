# List Item

```js
<script type='module'>
    import '@vonage/vivid/list-item';
</script>
```

```html preview
<vwc-list-item text="List Item"></vwc-list-item>
```

## Members

### Icon

Add the `icon` attribute to add an icon to the list-item.
Check out the [vivid icons gallery](https://icons.vivid.vonage.com) to see what icons are available.

- Type: `string`
- Default: `''`

```html preview
<vwc-list-item text="List item" icon="chat-line"></vwc-list-item>
```

### Meta

Add the `meta` attribute to add a meta-icon to the list-item.
Check out the [vivid icons gallery](https://icons.vivid.vonage.com) to see what icons are available.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-list-item text="List item" meta="more-vertical-solid"></vwc-list-item>
```

### Subtext

Add the `subtext` attribute to add subtext to the list-item.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-list-item text="List item" subtext="Subtext of the list item"></vwc-list-item>
```
