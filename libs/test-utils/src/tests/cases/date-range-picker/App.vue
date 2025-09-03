<script setup lang="ts">
import { ref } from 'vue';
import { VDateRangePicker } from '@vonage/vivid-vue';

const data = ref({
	start: '',
	end: '',
});
</script>

<template>
	<main>
		<VDateRangePicker
			label="Date Range Picker"
			v-model:start="data.start"
			v-model:end="data.end"
		/>
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
