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

### Accept

Use the `accept` attribute to define a comma separated list of files types to accept.
Read more on [accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept).

- Type: `string`
- Default: `undefined`

```html preview
<vwc-file-picker accept="image/png, image/jpeg">Drag & Drop or click to upload</vwc-file-picker>
```

### Capture

Use the `capture` attribute to specify which camera to use for capture image, video or audio data.
Read more on [capture](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#capture).

    If null, no capture type will be specified. If `camera`, mobile devices will skip the file selection and choose camera. If `microphone`, mobile devices will skip the file selection and choose the microphone. If `camcorder`, mobile devices will skip the file selection and choose the camera in video mode. On apple devices multiple must be set to false. [accept](#accept) may need to be set to an appropriate mime type (e.g. "image/*", "audio/*", or "video/*").

- Type: `string`
- Default: `undefined`

```html preview
<vwc-file-picker accept="camera/*" capture="video">Drag & Drop or click to upload</vwc-file-picker>
```

### Multiple

Use the `multiple` attribute to define whether to send multiple files in one request.
Read more on [multiple](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#multiple).

- Type: `boolean`
- Default: `false`

```html preview
<vwc-file-picker multiple>Drag & Drop or click to upload</vwc-file-picker>
```

### Max File Size

Use the `max-file-size` attribute (or `maxFileSize` property) to define the maximum file size (in bytes) that is allowed to be uploaded.

- Type: `number` | `string`
- Default: `256`

```html preview
<vwc-file-picker max-file-size=0.1>Drag & Drop or click to upload</vwc-file-picker>
```

### Max Files

Use the `max-files` attribute (or `maxFiles` property) to define how many files this file picker handles. 

- Type: `number` | `string`
- Default: `undefined`

```html preview
<vwc-file-picker max-files=1>Drag & Drop or click to upload</vwc-file-picker>
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

## Events

### Change

Fires a custom `change` event when file is selected.

## Methods

### addFile(file)

- Type: `function`
- Returns: `void`
- Accepts: `File`

Adds file to the file picker.

### removeFile(file)

- Type: `function`
- Returns: `void`
- Accepts: `File`

Removes file from the file picker.

### getAcceptedFiles()

- Type: `function`
- Returns: `File[]`

Recieve an array of accepted files.

### getFilesWithErrorStatus()

- Type: `function`
- Returns: `File[]`

Recieve an array of files with 'error' status.

## Properties

### Files

A read-only list of files.
Read more on [files](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#getting_information_on_selected_files).

- Type: `File[]`
- Default: `[]`

### Value

Read more on [value](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#value).

- Type: `string`
- Default: `""`

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

## Accessibility
If no label is set - it is highly recommended that `aria-label` will be added.

```html
<vwc-file-picker aria-label="Upload Files">Drag & Drop or click to upload</vwc-file-picker>
```
