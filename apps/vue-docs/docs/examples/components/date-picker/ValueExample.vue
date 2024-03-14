<template>
	<div style="block-size: 460px">
		<VDatePicker v-model="value" label="Start date" />
	</div>
</template>

<script setup lang="ts">
import { VDatePicker } from '@vonage/vivid-vue';
import { ref } from 'vue';

const value = ref('2023-01-01');
</script>
