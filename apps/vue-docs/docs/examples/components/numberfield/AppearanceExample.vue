<template>
	<div class="container">
		<VNumberField
			placeholder="appearance"
			label="fieldset"
			appearance="fieldset"
		/>
		<VNumberField placeholder="appearance" label="ghost" appearance="ghost" />
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
