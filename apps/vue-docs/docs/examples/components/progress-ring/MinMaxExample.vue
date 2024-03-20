<template>
	<div>
		<VProgressRing min="0" max="50" value="12.5" />
		<VProgressRing min="0" max="50" value="50" />
		<VProgressRing min="0" max="100" value="50" />
	</div>
</template>

<script setup lang="ts">
import { VProgressRing } from '@vonage/vivid-vue';
</script>
