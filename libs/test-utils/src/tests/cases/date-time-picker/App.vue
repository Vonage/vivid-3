<script setup lang="ts">
import { ref } from 'vue';
import { VDateTimePicker } from '@vonage/vivid-vue';

const data = ref({
	value: '',
});
</script>

<template>
	<main>
		<VDateTimePicker label="Date Time Picker" v-model="data.value" />
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
