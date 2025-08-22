<script setup lang="ts">
import { ref } from 'vue';
import { VFab } from '@vonage/vivid-vue';

const data = ref({
	clicked: false,
});
</script>

<template>
	<main>
		<VFab aria-label="Fab" @click="data.clicked = true" />
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
