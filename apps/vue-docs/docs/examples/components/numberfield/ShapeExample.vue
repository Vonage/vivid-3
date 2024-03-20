<template>
	<div class="container">
		<VNumberField label="Pill" shape="pill" />
		<VNumberField label="Rounded" shape="rounded" />
	</div>
</template>

<script setup lang="ts">
import { VNumberField } from '@vonage/vivid-vue';
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	gap: 20px;
}
</style>
