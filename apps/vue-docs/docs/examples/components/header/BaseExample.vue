<template>
	<VHeader class="v3header"> Header content </VHeader>
</template>
<script setup lang="ts">
import { VHeader } from '@vonage/vivid-vue';
</script>
<style scoped lang="scss">
.v3header::part(base) {
	background-color: var(--vvd-color-neutral-100);
}
</style>
