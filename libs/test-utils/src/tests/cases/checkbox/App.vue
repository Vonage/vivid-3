<script setup lang="ts">
import { ref } from 'vue';
import { VCheckbox } from '@vonage/vivid-vue';

const data = ref({
	checked: false,
});
</script>

<template>
	<main>
		<VCheckbox label="Checkbox" v-model="data.checked" />
		<VCheckbox label="Indeterminate Checkbox" indeterminate />
		<VCheckbox label="Indeterminate Checked Checkbox" indeterminate checked />
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
