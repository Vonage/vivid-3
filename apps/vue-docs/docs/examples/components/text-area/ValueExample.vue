<template>
	<VTextArea v-model="currentValue" />
</template>
<script setup lang="ts">
import { VTextArea } from '@vonage/vivid-vue';
import { ref } from 'vue';

const currentValue = ref('Value Example');
</script>
