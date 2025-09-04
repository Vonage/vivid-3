<script setup lang="ts">
import { VCombobox, VOption } from '@vonage/vivid-vue';
import { ref } from 'vue';

const state = ref({
	value: '',
});
</script>

<template>
	<main>
		<VCombobox label="Combobox" v-model="state.value">
			<VOption value="1" label="Option 1" text="Text 1" />
			<VOption value="2" label="Option 2" text="Text 2" />
			<VOption value="3" label="Option 3" text="Text 3" />
		</VCombobox>
		<pre>{{ JSON.stringify(state) }}</pre>
	</main>
</template>
