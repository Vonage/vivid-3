<template>
	<div>
		<div>
			<VNumberField
				v-model:value-as-number="value"
				label="Using valueAsNumber"
			/>
		</div>
		<div>valueAsNumber: {{ value }}</div>
	</div>
</template>

<script setup lang="ts">
import { VNumberField } from '@vonage/vivid-vue';
import { ref } from 'vue';

const value = ref(123);
</script>
