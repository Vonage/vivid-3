<template>
  <VProgress :min="0" :max="50" value="indeterminate" paused />
</template>

<script setup lang="ts">
import { VProgress } from '@vonage/vivid-vue';
</script>
