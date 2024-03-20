<template>
	<VCard>
		<template #main>
			<VLayout gutters="small">
				assign custom template using "main" slot
			</VLayout>
		</template>
	</VCard>
</template>

<script setup lang="ts">
import { VCard, VLayout } from '@vonage/vivid-vue';
</script>
