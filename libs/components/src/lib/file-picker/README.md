# File picker

Represents a file picker custom element.

```js
<script type="module">
    import '@vonage/vivid/file-picker';
</script>
```

## Members

### Text

Add a `text` attribute to add text to the file picker.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-file-picker text="Drag & Drop files here"></vwc-file-picker>
```

### Label

Use the `label` member to set the file picker's label.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-file-picker label='Pick up your image'></vwc-file-picker>
```

### Helper text

Add the `helper-text` to add some helper text below the file picker.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<vwc-file-picker helper-text="Drag and drop your files onto the surface"></vwc-file-picker>
```

### Icon

Add the `icon` attribute to add an icon to the file picker text.

- Type: `string`
- Default: `''`

```html preview full
<vwc-file-picker text="Drag & Drop files here" icon="upload-line"></vwc-file-picker>
```