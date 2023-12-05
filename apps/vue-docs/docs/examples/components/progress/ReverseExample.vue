<template>
  <VLayout>
    <VProgress :min="0" :max="50" :value="25" reverse />
    <VProgress :min="0" :max="50" value="indeterminate" reverse />
  </VLayout>
</template>

<script setup lang="ts">
import { VLayout, VProgress } from '@vonage/vivid-vue';
</script>
