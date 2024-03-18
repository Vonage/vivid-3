<template>
	<div class="container">
		<VSelect label="choose one option" class="select">
			<VOption value="1" text="Option 1" />
			<VOption value="2" text="Option 2" />
			<VOption value="3" text="Option 3" />
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
	width: 150px;
}
</style>
