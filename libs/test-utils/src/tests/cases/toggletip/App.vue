<script setup lang="ts">
import { VButton, VToggletip } from '@vonage/vivid-vue';
import { ref } from 'vue';

const data = ref({
	triggered: false,
});
</script>

<template>
	<main>
		<VToggletip headline="Toggletip">
			<template #anchor><VButton label="Click me" /></template>
			<template #action-items
				><VButton label="OK" @click="data.triggered = true"
			/></template>
		</VToggletip>
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
