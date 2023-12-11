<template>
  <VCard
    headline="Vivid Card Component"
    subtitle="extra text to the card headline that is set to be trimmed after 2 lines so the card will not be too long"
    style="--subtitle-line-clamp: 2; max-inline-size: 42ch"
  />
</template>

<script setup lang="ts">
import { VCard } from '@vonage/vivid-vue';
</script>
