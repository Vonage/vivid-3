<script setup lang="ts">
import { ref } from 'vue';
import { VDatePicker } from '@vonage/vivid-vue';

const data = ref({
	value: '',
});
</script>

<template>
	<main>
		<VDatePicker label="Date Picker" v-model="data.value" />
		<VDatePicker label="With Error" error-text="Error message" />
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
