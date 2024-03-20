<template>
	<VTextArea v-model="currentValue" readonly label="fieldset" />
</template>
<script setup lang="ts">
import { VTextArea } from '@vonage/vivid-vue';
import { ref } from 'vue';

const currentValue = ref('readonly text');
</script>
