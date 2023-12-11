<template>
  <VCard
    headline="Vivid Card Component with long headline to trim"
    subtitle="here is the card text"
    style="--headline-line-clamp: 1; max-inline-size: 42ch"
  />
</template>

<script setup lang="ts">
import { VCard } from '@vonage/vivid-vue';
</script>
