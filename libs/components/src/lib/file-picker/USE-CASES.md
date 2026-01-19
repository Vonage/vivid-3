## In a form

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 320px
<script setup lang="ts">
import { VFilePicker, VButton, VLayout } from '@vonage/vivid-vue';
</script>

<template>
	<form method="post" enctype="multipart/form-data" class="form">
		<VLayout column-basis="block">
			<VFilePicker name="files" label="Pick files" helper-text="multiple files of any type" max-files="50" required> Drag & Drop or click to upload </VFilePicker>
			<div class="buttons">
				<VButton label="Reset" appearance="outlined" type="reset"></VButton>
				<VButton label="Submit" appearance="filled" type="submit"></VButton>
			</div>
		</VLayout>
	</form>
</template>

<style scoped>
.form {
	width: 400px;
}
.buttons {
	display: flex;
	gap: 12px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 320px
<form method="post" enctype="multipart/form-data" class="form">
	<vwc-layout column-basis="block">
		<vwc-file-picker name="files" label="Pick files" helper-text="multiple files of any type" max-files="50" required> Drag & Drop or click to upload </vwc-file-picker>
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

</vwc-tab-panel>
</vwc-tabs>
