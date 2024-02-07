<template>
  <div style="block-size: 360px">
    <VTimePicker v-model="value" label="Start time" />
  </div>
</template>

<script setup lang="ts">
import { VTimePicker } from '@vonage/vivid-vue';
import { ref } from 'vue';

const value = ref('');
</script>
