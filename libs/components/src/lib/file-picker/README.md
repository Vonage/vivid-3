# File Picker

The file picker component enables users to select files either by opening a file selection dialog or by using drag-and-drop functionality.

Error messages and labels will be localized to the current locale. See [Localization](/guides/localization/) for more details.

```js
<script type="module">import '@vonage/vivid/file-picker';</script>
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

Add the `helper-text` to add some helper text below the file picker. If you need to add HTML to the helper text, use the `helper-text` slot.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<vwc-file-picker helper-text="helper-text">
	Drag & Drop or click to upload
</vwc-file-picker>
```

### Error text

It is possible to force the file picker's error state by setting the `error-text` attribute to a custom error message.
Note that any current error state will be overridden by `error-text` (and, if applicable, restored once it is removed).

- Type: `string`
- Default: `undefined`

```html preview
<vwc-file-picker error-text="Please provide a valid file.">
	Drag & Drop or click to upload
</vwc-file-picker>
```

### Max File Size

Use the `max-file-size` attribute to define the maximum file size (in megabytes) for each file.

If the user tries to upload a file that exceeds the maximum file size, the file picker displays an error message.

- Type: `number` | `string`
- Default: `256`

```html preview
<vwc-file-picker helper-text="Max file size is 0.1MB" max-file-size="0.1">
	Drag & Drop or click to upload
</vwc-file-picker>
```

### Max Files

Use the `max-files` attribute to define how many files this file picker handles. By default, the file picker handles an unlimited number of files.

If the user tries to upload more files than the maximum number of files, the file picker displays the extra files with an error message.

- Type: `number` | `string`
- Default: `undefined`

```html preview
<vwc-file-picker helper-text="Maximum of 2 files" max-files="2">
	Drag & Drop or click to upload
</vwc-file-picker>
```

<vwc-note connotation="information" icon="info-line">
	<p>Don't use this for single file uploads. Use the <a href=""><code>single-file</code> attribute</a> instead.</p>
</vwc-note>

### Accept

Use the `accept` attribute to define a comma separated list of allowed file extensions or MIME types.
Some examples of valid values are:

- `"image/*"` - all image types
- `"image/png"` or `".png"`- only png images
- `"image/jpeg, image/png"` or `".jpg, .jpeg, .png"` - only jpg and png images

* Type: `string`
* Default: `undefined`

If the user tries to upload a file that does not match the accepted files, the file picker displays an error message.

```html preview
<vwc-file-picker
	helper-text=".jpg, .jpeg, .png types only"
	accept=".jpg, .jpeg, .png"
>
	Drag & Drop or click to upload
</vwc-file-picker>
```

### Size

Use the `size` attribute to set the file picker's to one of the predefined block size extent.

- Type: `'normal'` | `'expanded'`
- Default: `'normal'`

```html preview
<vwc-file-picker size="expanded">
	Drag & Drop or click to upload
</vwc-file-picker>
```

## Slots

### Default

Use the default slot to set the content of the file picker.

```html preview
<vwc-file-picker>
	<vwc-icon name="file-csv-line" size="-5"></vwc-icon>
	Drag & Drop the .csv file here or click to upload
</vwc-file-picker>
```

### Helper-Text

The `helper-text` slot allows you to use rich content as the file picker's helper text.

```html preview
<vwc-file-picker>
	Drag & Drop the .csv file here or click to upload
	<span slot="helper-text"
		>Max file size is 0.1MB.
		<a href="#">Learn how export your data to .csv</a></span
	>
</vwc-file-picker>
```

## CSS Variables

### file-picker-list-item-background-color

Each added file in the preview list has a default background-color of `vvd-color-canvas` (`#fff` in light theme, `#000` in dark).  
If needed, the background of the item can be changed using the `--file-picker-list-item-background-color` CSS variable.

## Properties

<div class="table-wrapper">

| Name    | Type     | Default | Description                                                                              |
| ------- | -------- | ------- | ---------------------------------------------------------------------------------------- |
| `files` | `File[]` | `[]`    | A read-only list of files that have been added to the file picker and passed validation. |

</div>

## Events

<div class="table-wrapper">

| Name     | Type                     | Bubbles | Composed | Description                              |
| -------- | ------------------------ | ------- | -------- | ---------------------------------------- |
| `change` | `CustomEvent<undefined>` | Yes     | Yes      | Emitted when a file is added or removed. |

</div>

## Use Cases

### In a form

```html preview
<style>
	form {
		width: 400px;
	}
	.buttons {
		display: flex;
		gap: 12px;
	}
</style>

<form method="post" enctype="multipart/form-data">
	<vwc-layout column-basis="block">
		<vwc-file-picker
			name="files"
			label="Pick files"
			helper-text="multiple files of any type"
			max-files="50"
			required
		>
			Drag & Drop or click to upload
		</vwc-file-picker>
		<div class="buttons">
			<vwc-button label="Reset" appearance="outlined" type="reset"></vwc-button>
			<vwc-button label="Submit" appearance="filled" type="submit"></vwc-button>
		</div>
	</vwc-layout>
</form>
```

## Accessibility

If [label](#label) attribute is set, the aria-label will be updated automatically.
If no label is set - it is highly recommended that `aria-label` will be added.

```html
<vwc-file-picker aria-label="Upload Files">
	Drag & Drop or click to upload
</vwc-file-picker>
```
