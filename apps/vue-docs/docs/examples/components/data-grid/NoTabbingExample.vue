<template>
	<VButton
		label="Tabbing"
		:appearance="!value ? 'filled' : 'outlined'"
		@click="value = false"
	/>
	<VButton
		label="No Tabbing"
		:appearance="value ? 'filled' : 'outlined'"
		@click="value = true"
	/>
	<VDataGrid id="grid" :no-tabbing="value" :rows-data="data" />
</template>
<script setup lang="ts">
import { VDataGrid, VButton } from '@vonage/vivid-vue';
import { ref } from 'vue';

const value = ref(true);
const data = ref([
	{ name: 'John', surname: 'Doe', age: 30 },
	{ name: 'Jane', surname: 'Doe', age: 25 },
	{ name: 'Bill', surname: 'Cave', age: 22 },
	{ name: 'Jill', surname: 'Jane', age: 23 },
]);
</script>
