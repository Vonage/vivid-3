<script setup lang="ts">
import { VBanner } from '@vonage/vivid-vue';
import { ref } from 'vue';

const data = ref({
	removing: false,
});
</script>

<template>
	<main>
		<VBanner text="Banner text" removable @removing="data.removing = true" />
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
