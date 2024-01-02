<template>
  <VTextField v-model="value" readonly icon="chat-line" label="fieldset" appearance="fieldset" />
</template>

<script setup lang="ts">
import { VTextField } from '@vonage/vivid-vue';
import { ref } from 'vue';

const value = ref('readonly text');
</script>
