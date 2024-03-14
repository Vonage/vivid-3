<template>
	<div>
		<VButton label="Add item" appearance="outlined" @click="push" />
		<VButton label="Remove last item" appearance="outlined" @click="pop" />
		<VButton label="Remove first item" appearance="outlined" @click="shift" />
		<VButton label="Update items" appearance="outlined" @click="update" />
		<VButton label="Replace items" appearance="outlined" @click="replace" />
		<VDataGrid selection-mode="single-row" style="max-block-size: 500px">
			<VDataGridRow row-type="header">
				<VDataGridCell cell-type="columnheader"> Column 1 </VDataGridCell>
				<VDataGridCell cell-type="columnheader"> Column 2 </VDataGridCell>
			</VDataGridRow>
			<VDataGridRow v-for="row in data" :key="row.id">
				<VDataGridCell>{{ row.data1 }}</VDataGridCell>
				<VDataGridCell>{{ row.data2 }}</VDataGridCell>
			</VDataGridRow>
		</VDataGrid>
	</div>
</template>
<script setup lang="ts">
import {
	VDataGrid,
	VDataGridRow,
	VDataGridCell,
	VButton,
} from '@vonage/vivid-vue';
import { ref } from 'vue';

let data = ref<{ id: number; data1: string; data2: string }[]>([]);

let count = 1;
function push() {
	data.value.push({
		id: count,
		data1: `data${count}1`,
		data2: `data${count}2`,
	});
	count++;
}

for (let i = 0; i < 1000; i++) {
	push();
}

function pop() {
	data.value.pop();
}

function shift() {
	data.value.shift();
}

function update() {
	for (const row of data.value) {
		row.data1 = `${row.data1} changed`;
	}
}

function replace() {
	data.value = data.value.map((row) => ({
		...row,
		data2: `${row.data2} replaced`,
	}));
}
</script>
