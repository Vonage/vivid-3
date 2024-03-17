<template>
	<div style="block-size: 460px">
		<VDateRangePicker
			label="Date range"
			min="2023-06-10"
			start="2023-06-15"
			end="2023-06-20"
		/>
	</div>
</template>

<script setup lang="ts">
import { VDateRangePicker } from '@vonage/vivid-vue';
</script>
