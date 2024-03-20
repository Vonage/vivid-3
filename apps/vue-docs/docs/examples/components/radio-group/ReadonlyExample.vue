<template>
	<VRadioGroup label="Pick a number" name="number" readonly>
		<VRadio label="1" value="1" checked />
		<VRadio label="2" value="2" />
		<VRadio label="3" value="3" />
	</VRadioGroup>
</template>

<script setup lang="ts">
import { VRadioGroup, VRadio } from '@vonage/vivid-vue';
</script>
