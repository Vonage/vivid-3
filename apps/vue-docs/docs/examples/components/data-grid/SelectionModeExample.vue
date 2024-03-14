<template>
	<VSelect v-model="value" label="Selection Mode" class="select">
		<VOption value="none" text="none" />
		<VOption value="single-row" text="single-row" />
		<VOption value="multi-row" text="multi-row" />
		<VOption value="single-cell" text="single-cell" />
		<VOption value="multi-cell" text="multi-cell" />
	</VSelect>
	<VDataGrid id="grid" :selection-mode="value" :rows-data="data" />
</template>
<script setup lang="ts">
import { VDataGrid, VSelect, VOption } from '@vonage/vivid-vue';
import { ref } from 'vue';
import { DataGridSelectionMode } from '@vonage/vivid/lib/data-grid/data-grid';

const value = ref<DataGridSelectionMode>('none');
const data = ref([
	{ name: 'John', surname: 'Doe', age: 30 },
	{ name: 'Jane', surname: 'Doe', age: 25 },
	{ name: 'Bill', surname: 'Cave', age: 22 },
	{ name: 'Jill', surname: 'Jane', age: 23 },
]);
</script>
