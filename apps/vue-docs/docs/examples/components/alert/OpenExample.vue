<template>
	<div class="example-container">
		<VAlert text="An important information for you" :open="open" />
		<VButton
			appearance="outlined"
			label="Show/Hide alert"
			@click="open = !open"
		/>
	</div>
</template>

<script setup lang="ts">
import { VAlert, VButton } from '@vonage/vivid-vue';
import { ref } from 'vue';

const open = ref(false);
</script>

<style lang="scss" scoped>
.example-container {
	height: 200px;
	transform: translateX(0px);
}
</style>
