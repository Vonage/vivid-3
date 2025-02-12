## In a form

```html preview 320px
<form method="post" enctype="multipart/form-data" class="form">
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

<style>
	.form {
		width: 400px;
	}
	.buttons {
		display: flex;
		gap: 12px;
	}
</style>
```
