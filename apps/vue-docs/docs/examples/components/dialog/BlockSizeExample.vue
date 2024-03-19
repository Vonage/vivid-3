<template>
	<div style="height: 250px">
		<VDialog
			style="--dialog-max-block-size: 100px"
			icon="info"
			headline="Headline"
			subtitle="subtitle content"
			open
		/>
	</div>
</template>

<script setup lang="ts">
import { VDialog } from '@vonage/vivid-vue';
</script>
