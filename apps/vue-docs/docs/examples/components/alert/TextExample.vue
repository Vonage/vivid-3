<template>
	<div class="example-container">
		<VAlert text="An important information for you" open />
	</div>
</template>

<script setup lang="ts">
import { VAlert } from '@vonage/vivid-vue';
</script>

<style lang="scss" scoped>
.example-container {
	height: 200px;
	transform: translateX(0px);
}
</style>
