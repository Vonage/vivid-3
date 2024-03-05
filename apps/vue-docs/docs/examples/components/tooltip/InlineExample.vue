<template>
	<div class="example-container">
		<VButton id="buttonInlineExample" icon="info-line" shape="pill" />
		<VTooltip
			anchor="buttonInlineExample"
			text="My inline size is 200px"
			style="--tooltip-inline-size: 200px"
		/>
	</div>
</template>

<script setup lang="ts">
import { VTooltip, VButton } from '@vonage/vivid-vue';
</script>

<style lang="scss" scoped>
.example-container {
	text-align: center;
	height: 100px;
}
</style>
