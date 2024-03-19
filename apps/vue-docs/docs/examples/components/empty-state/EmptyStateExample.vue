<template>
	<VEmptyState icon="search-line" headline="No results found">
		No results match your search criteria.
		<template #action-items>
			<VButton shape="pill" label="Reset filters" appearance="outlined" />
		</template>
	</VEmptyState>
</template>

<script setup lang="ts">
import { VEmptyState, VButton } from '@vonage/vivid-vue';
</script>
