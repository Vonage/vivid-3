<template>
	<div style="height: 230px">
		<VButton label="Toggle Dialog Open" @click="open = !open" />
		<VDialog
			headline="Headline"
			subtitle="subtitle"
			:open="open"
			@close="open = false"
		/>
	</div>
</template>

<script setup lang="ts">
import { VButton, VDialog } from '@vonage/vivid-vue';
import { ref } from 'vue';

const open = ref(false);
</script>
