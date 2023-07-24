# File picker

The vwc-file-picker component enables users to select files either by opening a file selection dialog or by using drag-and-drop functionality.

```js
<script type="module">
    import '@vonage/vivid/file-picker';
</script>
```

## Members

### Label

Use the `label` member to set the file picker's label.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-file-picker label="Label">Drag & Drop or click to upload</vwc-file-picker>
```

### Helper text

Add the `helper-text` to add some helper text below the file picker.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<vwc-file-picker helper-text="helper-text">Drag & Drop or click to upload</vwc-file-picker>
```


### Max File Size

Use the `max-file-size` attribute to define the maximum file size (in megabytes) for each file.

If the user tries to upload a file that exceeds the maximum file size, the file picker displays an error message.

- Type: `number` | `string`
- Default: `256`

```html preview
<vwc-file-picker helper-text="Max file size is 0.1MB" max-file-size="0.1">Drag & Drop or click to upload</vwc-file-picker>
```

### Max Files

Use the `max-files` attribute to define how many files this file picker handles. By default, the file picker handles an unlimited number of files.

If the user tries to upload more files than the maximum number of files, the file picker displays an error message.

- Type: `number` | `string`
- Default: `undefined`

```html preview
<vwc-file-picker helper-text="Single file only" max-files="1">Drag & Drop or click to upload</vwc-file-picker>
```

### Accept

Use the `accept` attribute to define a comma separated list of allowed file extensions or MIME types.
Some examples of valid values are:
* `"image/*"` - all image types
* `"image/png"` or `".png"`- only png images
* `"image/jpeg, image/png"` or `".jpg, .jpeg, .png"` - only jpg and png images

- Type: `string`
- Default: `undefined`

If the user tries to upload a file that does not match the accepted files, the file picker displays an error message.

```html preview
<vwc-file-picker helper-text=".jpg, .jpeg, .png types only" accept=".jpg, .jpeg, .png">Drag & Drop or click to upload</vwc-file-picker>
```

### Size

Use the `size` attribute to set the file picker's to one of the predefined block size extent.

- Type: `'normal'` | `'expanded'`
- Default: `'normal'`

```html preview
<vwc-file-picker size="expanded">Drag & Drop or click to upload</vwc-file-picker>
```

## Slots

### Default

Use the default slot to set the content of the file picker.

```html preview
<vwc-file-picker>
	<vwc-icon name="file-csv-line" size="-5"></vwc-icon> Drag & Drop the .csv file here or click to upload
</vwc-file-picker>
```

## Properties

### Files

A read-only list of files that have been added to the file picker and passed validation.

- Type: `File[]`
- Default: `[]`

## Use Cases

### In a from

```html preview
<style>
	form {
		width: 400px;
	}
	vwc-button {
		justify-self: flex-start;
	}
</style>

<form id='form'>
	<vwc-layout column-basis="block">
		<vwc-text-field name="username" label='Username'></vwc-text-field>
		<vwc-file-picker id="filePicker" label="Pick files" helper-text="multiple files of any type" max-files="50">Drag & Drop or click to upload</vwc-file-picker>
		<vwc-button label="Submit" appearance="filled" type="submit"></vwc-button>
	</vwc-layout>
</form>

<script>
	form.addEventListener("submit", (event) => {
		event.preventDefault();

		const formData = new FormData(form);

		for (const [index, file] of filePicker.files.entries()) {
			formData.append(`file[${index}]`, file);
		}
    
		const request = new XMLHttpRequest();
		request.open("POST", "/upload");
		request.send(formData);
	});
</script>
```

## Accessibility
If [label](#label) attribute is set, the aria-label will be updated automatically.
If no label is set - it is highly recommended that `aria-label` will be added.

```html
<vwc-file-picker aria-label="Upload Files">Drag & Drop or click to upload</vwc-file-picker>
```
