<template>
	<div class="example-container">
		<VAlert text="An important information for you" open>
			<template #action-items>
				<VButton appearance="outlined" shape="pill" label="Action" />
			</template>
		</VAlert>
	</div>
</template>

<script setup lang="ts">
import { VAlert, VButton } from '@vonage/vivid-vue';
</script>

<style lang="scss" scoped>
.example-container {
	height: 200px;
	transform: translateX(0px);
}
</style>
