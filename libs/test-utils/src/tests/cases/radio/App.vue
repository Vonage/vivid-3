<script setup lang="ts">
import { VRadio, VRadioGroup } from '@vonage/vivid-vue';
import { ref } from 'vue';

const data = ref({
	selected: 'apple',
});
</script>

<template>
	<main>
		<VRadioGroup v-model="data.selected">
			<VRadio label="Apple" value="apple" />
			<VRadio label="Banana" value="banana" />
		</VRadioGroup>
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
