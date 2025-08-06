<script setup lang="ts">
import { VButton, VMenu, VMenuItem } from '@vonage/vivid-vue';
import { ref } from 'vue';

const data = ref({
	triggered: false,
	checkboxChecked: false,
	radioChecked: false,
});
</script>

<template>
	<main>
		<VMenu aria-label="Menu">
			<template #anchor><VButton label="Menu Trigger" /></template>
			<VMenuItem text="Menu Item" @change="data.triggered = true" />
			<VMenuItem
				control-type="checkbox"
				text="Checkbox Item"
				v-model="data.checkboxChecked"
			/>
			<VMenuItem control-type="checkbox" text="Checked Checkbox Item" checked />
			<VMenuItem
				control-type="radio"
				text="Radio Item"
				v-model="data.radioChecked"
			/>
			<VMenuItem control-type="radio" text="Checked Radio Item" checked />
		</VMenu>
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
