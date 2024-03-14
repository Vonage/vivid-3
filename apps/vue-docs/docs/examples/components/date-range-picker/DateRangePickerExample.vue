<template>
	<div style="block-size: 460px">
		<VDateRangePicker
			:start="start"
			:end="end"
			label="Date range"
			@update:start="start = $event"
			@update:end="end = $event"
		/>
		<!-- In Vue 3 you can use v-model shorthand instead of @update:start and @update:end
      <VDateRangePicker v-model:start="start" v-model:end="end" label="Date range" />
    -->
	</div>
</template>

<script setup lang="ts">
import { VDateRangePicker } from '@vonage/vivid-vue';
import { ref } from 'vue';

const start = ref('');
const end = ref('');
</script>
