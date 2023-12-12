<template>
  <VCard headline="Vivid Card Component" subtitle="extra text to the card headline">
    <template #graphic>
      <VIcon name="android-mono" style="font-size: 44px; color: var(--vvd-color-sucess)" />
    </template>
  </VCard>
</template>

<script setup lang="ts">
import { VCard, VIcon } from '@vonage/vivid-vue';
</script>
