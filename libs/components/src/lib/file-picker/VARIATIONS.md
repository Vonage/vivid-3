## Labelling

### Label Text

The `label` attribute provides a short description of the purpose of the File Picker.

<vwc-note connotation="information" headline="Accessibility note">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
	<p>If you can not use the visible <code>label</code>, provide it using the <code>aria-label</code> attribute.</p>
	<p>It will be announced by screen readers so that those users will know the purpose of the Select.</p>
</vwc-note>

```html preview
<vwc-file-picker label="Label"
	><span>Drag & Drop or click to upload</span></vwc-file-picker
>
```

### Helper text

The `helper-text` attribute provides additional information about the purpose of the File Picker.  
To add HTML to the helper text, use the [helper-text slot](/components/file-picker/code/#helper-text-slot).

```html preview
<vwc-file-picker helper-text="helper-text">
	<span>Drag & Drop or click to upload</span>
</vwc-file-picker>
```

## Validation Feedback

### Error Text

The `error-text` attribute provides a custom error message. Any current error state will be overridden by `error-text`.

```html preview
<vwc-file-picker error-text="Please provide a valid file.">
	<span>Drag & Drop or click to upload</span>
</vwc-file-picker>
```

## Size

Use the `size` attribute to set the file picker's block-size.

```html preview
<div class="wrapper">
	<vwc-file-picker size="normal" label="Normal">
		<span>File picker with Normal size (default)</span>
	</vwc-file-picker>
	<vwc-file-picker size="expanded" label="Expanded">
		<span>File picker with Expanded size (default)</span>
	</vwc-file-picker>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
```
