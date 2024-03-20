<template>
	<VTextField v-model="value" label="With default value" />
</template>

<script setup lang="ts">
import { VTextField } from '@vonage/vivid-vue';
import { ref } from 'vue';

const value = ref('5');
</script>
