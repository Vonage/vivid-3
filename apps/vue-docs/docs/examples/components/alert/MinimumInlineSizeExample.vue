<template>
	<div class="example-container">
		<VAlert style="--alert-min-inline-size: auto" text="Very fitting!" open />
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
