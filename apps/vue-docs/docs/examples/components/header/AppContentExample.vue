<template>
	<VHeader>
		Header content
		<main slot="app-content">
			<VLayout gutters="small"> Application content </VLayout>
		</main>
	</VHeader>
</template>
<script setup lang="ts">
import { VHeader, VLayout } from '@vonage/vivid-vue';
</script>
