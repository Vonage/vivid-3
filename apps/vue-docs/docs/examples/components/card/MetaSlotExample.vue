<template>
  <VCard headline="Vivid Card Component" subtitle="extra text to the card headline">
    <template #meta>
      <VButton icon="more-vertical-solid" appearance="ghost" />
    </template>
  </VCard>
</template>

<script setup lang="ts">
import { VCard, VButton } from '@vonage/vivid-vue';
</script>
