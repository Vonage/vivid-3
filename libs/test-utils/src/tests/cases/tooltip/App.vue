<script setup lang="ts">
import { VButton, VTooltip } from '@vonage/vivid-vue';
import { ref } from 'vue';

const data = ref({});
</script>

<template>
	<main>
		<VTooltip text="Tooltip text">
			<template #anchor><VButton label="Hover me" /></template>
		</VTooltip>
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
