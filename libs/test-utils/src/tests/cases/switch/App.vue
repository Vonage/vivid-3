<script setup lang="ts">
import { VSwitch } from '@vonage/vivid-vue';
import { ref } from 'vue';

const data = ref({
	checked: false,
});
</script>

<template>
	<main>
		<VSwitch label="Switch" v-model="data.checked" />
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
