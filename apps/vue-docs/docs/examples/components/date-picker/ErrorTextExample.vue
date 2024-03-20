<template>
	<div style="block-size: 460px">
		<VDatePicker
			label="Start date"
			error-text="Please select a date for the event to start"
		/>
	</div>
</template>

<script setup lang="ts">
import { VDatePicker } from '@vonage/vivid-vue';
</script>
