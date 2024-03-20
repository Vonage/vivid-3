<template>
	<VHeader>
		Header content

		<main slot="app-content">
			<VLayout column-basis="block" gutters="medium">
				<h1>Application content</h1>
			</VLayout>
		</main>
	</VHeader>
</template>
<script setup lang="ts">
import { VHeader, VLayout } from '@vonage/vivid-vue';
</script>
