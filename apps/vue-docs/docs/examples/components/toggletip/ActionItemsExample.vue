<template>
	<div class="example-container">
		<VButton id="button7" icon="help-solid" shape="pill" />
		<VToggletip anchor="button7">
			This is a toggletip with action items
			<template #action-items>
				<VButton appearance="outlined" label="Action" shape="pill" />
				<VButton appearance="filled" label="Action" shape="pill" />
			</template>
		</VToggletip>
	</div>
</template>

<script setup lang="ts">
import { VButton, VToggletip } from '@vonage/vivid-vue';
</script>

<style lang="scss" scoped>
.example-container {
	height: 200px;
	display: flex;
	align-items: center;
}
</style>
