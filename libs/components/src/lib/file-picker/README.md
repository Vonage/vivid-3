# File picker

The vwc-file-picker component enables users to select files either by opening a file selection dialog or by using drag-and-drop functionality. It provides a seamless and intuitive file selection experience, enhancing application usability and productivity.

```js
<script type="module">
    import '@vonage/vivid/file-picker';
</script>
```

```html preview
<vwc-file-picker>Drag & Drop or click to upload</vwc-file-picker>
```

## Members

### Label

Use the `label` member to set the file picker's label.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-file-picker label='Label'>Drag & Drop or click to upload</vwc-file-picker>
```

### Helper text

Add the `helper-text` to add some helper text below the file picker.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<vwc-file-picker helper-text="helper-text">Drag & Drop or click to upload</vwc-file-picker>
```

### Max File Size

Use the `max-file-size` attribute (or `maxFileSize` property) to define the maximum file size (in bytes) that is allowed to be uploaded.

- Type: `number` | `string`
- Default: `256`

```html preview
<vwc-file-picker helper-text="Max file zise is 0.1MB" max-file-size=0.1>Drag & Drop or click to upload</vwc-file-picker>
```

### Max Files

Use the `max-files` attribute (or `maxFiles` property) to define how many files this file picker handles. 

- Type: `number` | `string`
- Default: `undefined`

```html preview
<vwc-file-picker helper-text="Single file only" max-files=1>Drag & Drop or click to upload</vwc-file-picker>
```
### Upload Multiple

Use the `upload-multiple` attribute (or `uploadMultiple` property) to define whether to send multiple files in one request. In addition, you must add the [`max-files`](#max-files) attribute.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-file-picker helper-text="Upload multiple files" max-files="10" upload-multiple>Drag & Drop or click to upload</vwc-file-picker>
```

### Accepted Files

Use the `accepted-files` attribute (or `acceptedFiles` property) to define a comma separated list of accepted files types.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-file-picker helper-text=".jpg, .jpeg, .png types only" accepted-files=".jpg, .jpeg, .png">Drag & Drop or click to upload</vwc-file-picker>
```

## Slots

### Default

Use the default slot to set the content of the file picker.

```html preview
<vwc-file-picker>Add custom content here</vwc-file-picker>
```

## CSS Variables

### File-picker-height

Control the height of the file picker.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-file-picker style="--file-picker-height: 120px;"></vwc-file-picker>
```

### File-picker-width

Conrol the width of the file picker.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-file-picker style=" --file-picker-width: 52px;"></vwc-file-picker>
```


## Methods

### addFile(file)

- Type: `function`
- Returns: `void`
- Accepts: `File`

Adds file to the file picker.

### cancelUpload(file)

- Type: `function`
- Returns: `void`
- Accepts: `File`

Cancels upload of the file.

### removeFile(file)

- Type: `function`
- Returns: `void`
- Accepts: `File`

Removes file from the file picker.

### removeAllFiles()

- Type: `function`
- Returns: `void`

Removes all files from the file picker.

### getAcceptedFiles()

- Type: `function`
- Returns: `File[]`

### getFilesWithStatus()

- Type: `function`
- Returns: `File[]`

## Properties

### files

A read-only list of files.

- Type: `File[]`
- Default: `[]`

### options

A read-only object.

- Type: `Object`
- Default: `null`

## Use Cases

### In a from

```html preview
<style>
  form {
   width: 250px;
  }
  vwc-button {
    justify-self: flex-start;
  }
</style>

<form id='form'>
  <vwc-layout column-basis="block">
    <vwc-file-picker id='filePicker' label='Pick files' helper-text="multiple files of any type" max-files="50" upload-multiple>Drag & Drop or click to upload</vwc-file-picker>
    <vwc-divider></vwc-divider>
    <vwc-button label='Submit' appearance='filled' shape='pill' type="submit"></vwc-button>
  </vwc-layout>
</form>

<script>
  form.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log(filePicker.files);
    });
</script>
```