# File picker

The vwc-file-picker component enables users to select files either by opening a file selection dialog or by using drag-and-drop functionality. It provides a seamless and intuitive file selection experience, enhancing application usability and productivity.

```js
<script type="module">
    import '@vonage/vivid/file-picker';
</script>
```

```html preview
<vwc-file-picker></vwc-file-picker>
```

## Members

### Label

Use the `label` member to set the file picker's label.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-file-picker label='Label'></vwc-file-picker>
```

### Helper text

Add the `helper-text` to add some helper text below the file picker.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<vwc-file-picker helper-text="helper-text"></vwc-file-picker>
```

### Max File Size

Use the `max-file-size` attribute (or `maxFileSize` property) to define the maximum file size (in bytes) that is allowed to be uploaded.

- Type: `number` | `string`
- Default: `256`

```html preview
<vwc-file-picker helper-text="Max file zise is 0.1MB" max-file-size=0.1></vwc-file-picker>
```

### Max Files

Use the `max-files` attribute (or `maxFiles` property) to define how many files this file picker handles. 

- Type: `number` | `string`
- Default: `undefined`

```html preview
<vwc-file-picker helper-text="Single file only" max-files=1></vwc-file-picker>
```
### Upload Multiple

Use the `upload-multiple` attribute (or `uploadMultiple` property) to define whether to send multiple files in one request. In addition, you must add the [`max-files`](#max-files) attribute.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-file-picker helper-text="Upload multiple files" max-files="10" upload-multiple></vwc-file-picker>
```

### Accepted Files

Use the `accepted-files` attribute (or `acceptedFiles` property) to define a comma separated list of accepted files types.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-file-picker helper-text=".jpg, .jpeg, .png types only" accepted-files=".jpg, .jpeg, .png"></vwc-file-picker>
```

## Slots

### Default

Use the default slot to set the content of the file picker.

```html preview
<vwc-file-picker>Drag & Drop or click to upload</vwc-file-picker>
```

## CSS Variables

### File-picker-min-height

Control the height of the file picker.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-file-picker style="--file-picker-min-height: 120px;"></vwc-file-picker>
```

### File-picker-min-width

Conrol the width of the file picker.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-file-picker style=" --file-picker-min-width: 52px;"></vwc-file-picker>
```

## Use Cases

### In a from

```html preview
<style>
  form {
   width: 250px;
  }
</style>

<form>
  <vwc-layout column-basis="block">
    <vwc-file-picker label='Pick files' helper-text="multiple files of any type" max-files="50" upload-multiple></vwc-file-picker>
    <vwc-divider></vwc-divider>
    <vwc-button label='Submit' appearance='filled' shape='pill' type="submit"></vwc-button>
  </vwc-layout>
</form>
```