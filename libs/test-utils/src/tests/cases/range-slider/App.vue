<script setup lang="ts">
import { ref } from 'vue';
import { VRangeSlider } from '@vonage/vivid-vue';

const data = ref({
	start: 25,
	end: 75,
});
</script>

<template>
	<main>
		<VRangeSlider
			aria-label="Range Slider"
			v-model:startAsNumber="data.start"
			v-model:endAsNumber="data.end"
			:min="0"
			:max="100"
		/>
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
