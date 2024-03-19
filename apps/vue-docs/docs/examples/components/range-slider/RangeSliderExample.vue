<template>
	<VRangeSlider
		:start="start"
		:end="end"
		@update:start="start = $event"
		@update:end="end = $event"
	/>
	<!-- In Vue 3 you can use v-model shorthand instead of @update:start and @update:end
		<VRangeSlider v-model:start="start" v-model:end="end" />
	-->
</template>

<script setup lang="ts">
import { VRangeSlider } from '@vonage/vivid-vue';
import { ref } from 'vue';

const start = ref('0');
const end = ref('10');
</script>
