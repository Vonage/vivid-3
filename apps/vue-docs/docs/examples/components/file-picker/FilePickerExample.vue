<template>
	<VFilePicker
		label="File Picker"
		helper-text="helper-text"
		max-file-size="0.1"
	>
		Drag & Drop or click to upload
	</VFilePicker>
</template>

<script setup lang="ts">
import { VFilePicker } from '@vonage/vivid-vue';
</script>
