<script setup lang="ts">
import { VAlert, VButton } from '@vonage/vivid-vue';
import { ref } from 'vue';

const data = ref({
	open: false,
});
</script>

<template>
	<main>
		<VButton label="Toggle alert" @click="data.open = !data.open" />
		<VAlert headline="Alert" text="Alert text" :open="data.open" />
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
