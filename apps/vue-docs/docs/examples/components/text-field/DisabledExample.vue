<template>
  <VTextField v-model="value" disabled icon="chat-line" label="fieldset" appearance="fieldset" />
</template>

<script setup lang="ts">
import { VTextField } from '@vonage/vivid-vue';
import { ref } from 'vue';

const value = ref('disabled');
</script>
