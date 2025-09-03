## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerFilePicker } from '@vonage/vivid';

registerFilePicker('your-prefix');
```

```html preview 270px
<script type="module">
	import { registerFilePicker } from '@vonage/vivid';
	registerFilePicker('your-prefix');
</script>

<your-prefix-file-picker label="Pick Files">
	Drag & Drop or click to upload only one file
</your-prefix-file-picker>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VFilePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VFilePicker label="Title">
		Drag & Drop or click to upload only one file
	</VFilePicker>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Single File

Use the `single-file` attribute to allow only a single file. Subsequent file uploads will replace the current file.

```html preview 230px
<vwc-file-picker single-file>
	Drag & Drop or click to upload only one file
</vwc-file-picker>
```

## Max Files

Use the `max-files` attribute to define how many files this file picker handles. By default, the file picker handles an unlimited number of files.

If the user tries to upload more files than the maximum number of files, the file picker displays the extra files with an error message.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>
	<p>Don't use this for single file uploads (with <code>max-files="1"</code>). Use the <a href="#single-file"><code>single-file</code> attribute</a> instead.</p>
</vwc-note>

```html preview 330px
<vwc-file-picker helper-text="Maximum of 2 files" max-files="2">
	Drag & Drop or click to upload
</vwc-file-picker>
```

### Max Files Exceeded Error

Use the `max-files-exceeded-error` attribute to provide a custom error message to override the default localized message.

Note: localisation will need to be handled at the application level.

- Type: `string`

```html preview 330px
<vwc-file-picker
	max-files-exceeded-error="Only 2 files allowed"
	helper-text="Maximum of 2 files"
	max-files="2"
>
	Drag & Drop or click to upload
</vwc-file-picker>
```

## Max File Size

Use the `max-file-size` attribute to define the maximum file size (in megabytes) for each file.  
The default max-file size is `256mb`

If the user tries to upload a file that exceeds the maximum file size, the file picker displays an error message.

```html preview 230px
<vwc-file-picker helper-text="Max file size is 0.1MB" max-file-size="0.1">
	Drag & Drop or click to upload
</vwc-file-picker>
```

### File Too Big Error

Use the `file-too-big-error` attribute provide a custom error message to override the default localized message. You can use the strings `{{filesize}}` and `{{maxFilesize}}` in the message to give more information.

Note: localisation will need to be handled at the application level.

{% raw %}

```html preview 230px
<vwc-file-picker
	file-too-big-error="File too large ({{filesize}} MiB). The maximum file size is {{maxFilesize}} MiB."
	helper-text="Max file size is 0.1MB"
	max-file-size="0.1"
>
	Drag & Drop or click to upload
</vwc-file-picker>
```

{% endraw %}

## Accept

Use the `accept` attribute to define a list of allowed file extensions or MIME types.

Some examples of valid values are:

- `"image/*"` - all image types
- `"image/png"` or `".png"`- only png images
- `"image/jpeg, image/png"` or `".jpg, .jpeg, .png"` - only jpg and png images

If the user tries to upload a file that does not match the accepted files, the File Picker displays an error message.

```html preview 230px
<vwc-file-picker helper-text=".jpg, .jpeg types only" accept=".jpg, .jpeg">
	Drag & Drop or click to upload
</vwc-file-picker>
```

#### Invalid File Type Error

Use the `invalid-file-type-error` attribute to provide a custom error message to override the default localized message.

Note: localisation will need to be handled at the application level.

```html preview 230px
<vwc-file-picker
	invalid-file-type-error="This file is not a .jpg or .jpeg"
	helper-text=".jpg, .jpeg types only"
	accept=".jpg, .jpeg"
>
	Drag & Drop or click to upload
</vwc-file-picker>
```

## Block-Size

When setting `block-size` or `max-block-size` on the file-picker the list of the added files will have auto scroll.

## Files & Rejected Files

**_Files_** `files` (Read-only)

**_Rejected Files_** `rejectedFiles` (Read-only)

Use `files` or `rejectedFiles` to access the list of files that have been added to the File Picker and passed or failed validation checks.

```html preview
<form method="post" enctype="multipart/form-data">
	<vwc-layout>
		<vwc-card>
			<vwc-layout slot="main" gutters="small">
				<vwc-file-picker
					name="files"
					label="Pick files"
					max-file-size="1"
					max-files-exceeded-error="Only 2 files allowed"
					helper-text="Maximum of 2 files"
					max-files="2"
					required
				>
					Drag & Drop or click to upload
				</vwc-file-picker>
				<div class="buttons">
					<vwc-button
						label="Reset"
						type="reset"
						appearance="outlined"
					></vwc-button>
					<vwc-button
						label="Submit"
						appearance="filled"
						type="submit"
					></vwc-button>
				</div>
			</vwc-layout>
		</vwc-card>
		<vwc-card>
			<vwc-layout slot="main" gutters="small">
				<vwc-note headline="..."></vwc-note>
			</vwc-layout>
		</vwc-card>
	</vwc-layout>
</form>
<script>
	window.addEventListener('load', function () {
		document
			.querySelector('vwc-file-picker')
			.addEventListener('change', (e) => {
				const note = document.querySelector('vwc-note');
				note.headline = `files: ${event.target.files.length}, rejectedfiles: ${event.target.rejectedFiles.length}`;
			});

		document.querySelector('form').addEventListener('submit', (e) => {
			e.preventDefault();
		});

		function generateFile(fileName, sizeMb, type = 'text/plain') {
			const sizeInBytes = sizeMb * 1024 * 1024;
			const content = 'x'.repeat(sizeInBytes);
			const blob = new Blob([content], { type });
			return new File([blob], fileName, { type });
		}

		function simulateDrop(file) {
			const dataTransfer = new DataTransfer();
			dataTransfer.items.add(file);

			const dropEvent = new DragEvent('drop', {
				dataTransfer,
				bubbles: true,
				cancelable: true,
			});

			const vwcFilePicker = document.querySelector('vwc-file-picker');
			const dropzoneEl = vwcFilePicker.shadowRoot.querySelector('.control');
			dropzoneEl.dispatchEvent(dropEvent);
		}

		const dummyFile1 = generateFile('dummy-image.jpg', 2, 'image/jpeg');
		const dummyFile2 = generateFile('dummy-txt.jpg', 1, 'text/plain');

		simulateDrop(dummyFile1);
		simulateDrop(dummyFile2);
	});
</script>
```

## Slots

### Default

Use the default slot to set the content of the file picker.

```html preview
<vwc-file-picker label="Label">
	Drag & Drop or <strong>Click</strong> to upload
</vwc-file-picker>
<style>
	span {
		white-space: pre-wrap;
	}
</style>
```

### Helper-Text

The `helper-text` slot allows you to use rich content as the File Picker's helper text.

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

Each added file in the preview list has a default background-color of `--vvd-color-canvas` (`#fff` in light theme, `#000` in dark).  
If needed, the background of the item can be changed using the `--file-picker-list-item-background-color` CSS variable.

## API Reference

### Properties

<div class="table-wrapper">

| Name              | Type                           | Description                                                                              |
| ----------------- | ------------------------------ | ---------------------------------------------------------------------------------------- |
| **accept**        | `string`                       | Defines a list of allowed file extensions or MIME types                                  |
| **error-text**    | `string`                       | Sets the element's error text                                                            |
| **error-text**    | `string`                       | Sets the element's helper text                                                           |
| **files**         | `File[]` (default `[]`)        | A read-only list of files that have been added to the file picker and passed validation. |
| **rejectedFiles** | `File[]` (default `[]`)        | A read-only list of files that have been added to the file picker, but failed validation |
| **max-file**      | `string`                       | Sets the file picker max files to upload                                                 |
| **label**         | `string`                       | Sets the element's label                                                                 |
| **max-file-size** | `string`                       | Sets the file picker max file size to upload                                             |
| **single-file**   | `string`                       | Sets the file picker as a single file uploaded                                           |
| **size**          | `normal` (default), `expanded` | Sets the display size of the input element                                               |

</div>

### Events

<div class="table-wrapper">

| Name     | Type                     | Bubbles | Composed | Description                              |
| -------- | ------------------------ | ------- | -------- | ---------------------------------------- |
| `change` | `CustomEvent<undefined>` | Yes     | Yes      | Emitted when a file is added or removed. |

</div>

### Methods

<div class="table-wrapper">

| Name                 | Returns | Description                             |
| -------------------- | ------- | --------------------------------------- |
| **removeAllFiles()** | `void`  | Removes all files from the File Picker. |

</div>
