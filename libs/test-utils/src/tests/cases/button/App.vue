<script setup lang="ts">
import { ref } from 'vue';
import { VButton } from '@vonage/vivid-vue';

const data = ref({
	clicked: false,
});
</script>

<template>
	<main>
		<VButton label="Button" @click="data.clicked = true" />
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
