<script setup lang="ts">
import { ref } from 'vue';
import { VNumberField } from '@vonage/vivid-vue';

const data = ref({
	value: 0,
});
</script>

<template>
	<main>
		<VNumberField
			label="Number Field"
			v-model:valueAsNumber="data.value"
			:min="0"
			:max="100"
		/>
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
