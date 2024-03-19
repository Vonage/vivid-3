<template>
	<div class="container">
		<VSelect open class="select">
			<VOption label="Custom Label 1" value="1" text="Option 1" />
			<VOption label="Custom Label 2" value="2" text="Option 2" />
			<VOption label="Custom Label 3" value="3" text="Option 3" />
		</VSelect>
	</div>
</template>

<script setup lang="ts">
import { VSelect, VOption } from '@vonage/vivid-vue';
</script>

<style scoped>
.container {
	block-size: 230px;
}
.select {
	width: 160px;
}
</style>
