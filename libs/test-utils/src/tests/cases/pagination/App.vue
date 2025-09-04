<script setup lang="ts">
import { ref } from 'vue';
import { VPagination } from '@vonage/vivid-vue';

const data = ref({
	selectedIndex: 5,
});
</script>

<template>
	<main>
		<VPagination
			data-testid="pagination"
			:total="10"
			v-model="data.selectedIndex"
		/>
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
