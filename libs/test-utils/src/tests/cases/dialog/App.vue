<script setup lang="ts">
import { VButton, VDialog } from '@vonage/vivid-vue';
import { ref } from 'vue';

const state = ref({
	open: false,
});
</script>

<template>
	<main>
		<VButton label="Open Dialog" @click="state.open = true" />
		<VDialog
			aria-label="Dialog"
			headline="My Dialog"
			modal
			:open="state.open"
			@close="state.open = false"
		>
			<template #body>Dialog</template>
		</VDialog>
		<pre>{{ JSON.stringify(state) }}</pre>
	</main>
</template>
