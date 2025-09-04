<script setup lang="ts">
import { ref } from 'vue';
import { VSlider } from '@vonage/vivid-vue';

const data = ref({
	value: 25,
});
</script>

<template>
	<main>
		<VSlider
			aria-label="Slider"
			v-model:valueAsNumber="data.value"
			:min="0"
			:max="100"
		/>
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
