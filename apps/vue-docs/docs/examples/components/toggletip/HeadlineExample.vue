<template>
	<div class="example-container">
		<VButton id="button4" icon="help-solid" shape="pill" />
		<VToggletip anchor="button4" headline="This is the headline">
			This is the content
		</VToggletip>
	</div>
</template>

<script setup lang="ts">
import { VButton, VToggletip } from '@vonage/vivid-vue';
</script>

<style lang="scss" scoped>
.example-container {
	height: 100px;
	display: flex;
	align-items: center;
}
</style>
