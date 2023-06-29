# File uploader

The vwc-file-uploader component enables users to select files either by opening a file selection dialog or by using drag-and-drop functionality. It provides a seamless and intuitive file selection experience, enhancing application usability and productivity.

```js
<script type="module">
    import '@vonage/vivid/file-uploader';
</script>
```

## Members

### Url

The `url` attribute needs to be specified when the file uploader is not part of a form.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-file-uploader url='/'>Drag & Drop or click to upload</vwc-file-uploader>
```

### Label

Use the `label` member to set the file uploader's label.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-file-uploader label='Label'>Drag & Drop or click to upload</vwc-file-uploader>
```

### Helper text

Add the `helper-text` to add some helper text below the file uploader.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<vwc-file-uploader helper-text="helper-text">Drag & Drop or click to upload</vwc-file-uploader>
```

### Auto Process Queue

When the `auto-process-queue` attribute (or `autoProcessQueue` property) is used , the queue will be processed automatically. Using this feature can be useful if you need some additional user input before sending files (or if you want to send all files at once). Once you are ready to send the file, simply call [processQueue()](#processqueue).

- Type: `boolean`
- Default: `false`

```html preview
<vwc-file-uploader auto-process-queue>Drag & Drop or click to upload</vwc-file-uploader>
```

### Max File Size

Use the `max-file-size` attribute (or `maxFileSize` property) to define the maximum file size (in bytes) that is allowed to be uploaded.

- Type: `number` | `string`
- Default: `256`

```html preview
<vwc-file-uploader helper-text="Max file zise is 0.1MB" max-file-size=0.1 auto-process-queue>Drag & Drop or click to upload</vwc-file-uploader>
```

### Max Files

Use the `max-files` attribute (or `maxFiles` property) to define how many files this file uploader handles. 

- Type: `number` | `string`
- Default: `undefined`

```html preview
<vwc-file-uploader helper-text="Single file only" max-files=1 auto-process-queue>Drag & Drop or click to upload</vwc-file-uploader>
```
### Upload Multiple

Use the `upload-multiple` attribute (or `uploadMultiple` property) to define whether to send multiple files in one request. In addition, you must add the [`max-files`](#max-files) attribute.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-file-uploader helper-text="Upload multiple files" max-files="10" upload-multiple auto-process-queue>Drag & Drop or click to upload</vwc-file-uploader>
```

### Accepted Files

Use the `accepted-files` attribute (or `acceptedFiles` property) to define a comma separated list of accepted files types.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-file-uploader helper-text=".jpg, .jpeg, .png types only" accepted-files=".jpg, .jpeg, .png" auto-process-queue>Drag & Drop or click to upload</vwc-file-uploader>
```

### Method

Use the `method` attribute to change the method if necessary. 

- Type: `string`
- Default: `"post"`

```html preview
<vwc-file-uploader method="put">Drag & Drop or click to upload</vwc-file-uploader>
```

## Slots

### Default

Use the default slot to set the content of the file uploader.

```html preview
<vwc-file-uploader>Add custom content here</vwc-file-uploader>
```

## CSS Variables

### File-uploader-height

Control the height of the file uploader.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-file-uploader style="--file-uploader-height: 120px;"></vwc-file-uploader>
```

### File-uploader-width

Conrol the width of the file uploader.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-file-uploader style=" --file-uploader-width: 52px;"></vwc-file-uploader>
```

## Methods

### addFile(file)

- Type: `function`
- Returns: `void`
- Accepts: `File`

Adds file to the file uploader.

### removeFile(file)

- Type: `function`
- Returns: `void`
- Accepts: `File`

Removes file from the file uploader.

### processQueue()

- Type: `function`
- Returns: `void`

Sends the queued files when [autoProcessQueue](#auto-process-queue) is false.

### getAcceptedFiles()

- Type: `function`
- Returns: `File[]`

Recieve an array of accepted files.

### getQueuedFiles()

- Type: `function`
- Returns: `File[]`

Recieve an array of queued files when [autoProcessQueue](#auto-process-queue) is false.

### getFilesWithErrorStatus()

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
    <vwc-file-uploader id='fileUploader' label='Pick files' helper-text="multiple files of any type" max-files="50" upload-multiple>Drag & Drop or click to upload</vwc-file-uploader>
    <vwc-divider></vwc-divider>
    <vwc-button label='Submit' appearance='filled' shape='pill' type="submit"></vwc-button>
  </vwc-layout>
</form>

<script>
  form.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log(fileUploader.files);
        fileUploader.processQueue(); // upload files
    });
</script>
```

## Accessibility
If [label](#label) attribute is set, the aria-label will be updated automatically.
If no label is set - it is highly recommended that `aria-label` will be added.

```html
<vwc-file-uploader aria-label="Upload Files">Drag & Drop or click to upload</vwc-file-uploader>
```
