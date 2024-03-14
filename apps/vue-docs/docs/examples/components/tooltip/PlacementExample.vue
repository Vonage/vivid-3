<template>
	<div class="example-container">
		<VButton
			id="placementButton"
			appearance="outlined"
			label="This is an anchor"
		/>
		<VTooltip anchor="placementButton" text="right" placement="right" />
		<VTooltip anchor="placementButton" text="left" placement="left" />
		<VTooltip anchor="placementButton" text="top" placement="top" />
		<VTooltip anchor="placementButton" text="bottom" placement="bottom" />
	</div>
</template>

<script setup lang="ts">
import { VTooltip, VButton } from '@vonage/vivid-vue';
</script>

<style lang="scss" scoped>
.example-container {
	height: 150px;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
