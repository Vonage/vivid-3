<template>
  <VTextArea v-model="currentValue" label="Label" rows="2" />
</template>
<script setup lang="ts">
import { VTextArea } from '@vonage/vivid-vue';
import { ref } from 'vue';

const currentValue = ref('This is the text we want to see!');
</script>
