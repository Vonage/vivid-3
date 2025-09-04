<script setup lang="ts">
import { ref } from 'vue';
import { VTextArea } from '@vonage/vivid-vue';

const data = ref({
	value: '',
});
</script>

<template>
	<main>
		<VTextArea label="Text Area" v-model="data.value" />
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
