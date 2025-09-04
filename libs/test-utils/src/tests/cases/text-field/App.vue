<script setup lang="ts">
import { ref } from 'vue';
import { VButton, VTextField } from '@vonage/vivid-vue';

const data = ref({
	value: '',
	focused: false,
	changed: false,
});
</script>

<template>
	<main>
		<VTextField
			label="Text Field"
			v-model="data.value"
			@focus="data.focused = true"
			@blur="data.focused = false"
			@change="data.changed = true"
		/>
		<VButton label="Button" />
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
