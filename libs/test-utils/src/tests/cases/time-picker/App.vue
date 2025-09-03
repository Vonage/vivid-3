<script setup lang="ts">
import { ref } from 'vue';
import { VTimePicker } from '@vonage/vivid-vue';

const data = ref({
	value: '',
});
</script>

<template>
	<main>
		<VTimePicker label="Time Picker" v-model="data.value" />
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
