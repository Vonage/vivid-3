<template>
  <VProgress :min="0" :max="50" :value="25" paused />
</template>

<script setup lang="ts">
import { VProgress } from '@vonage/vivid-vue';
</script>
