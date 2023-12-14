<template>
  <VLayout>
    <VCard :elevation="2" text="none" />
  </VLayout>
  <VDivider />
  <VLayout gutters="small">
    <VCard :elevation="2" text="small" />
  </VLayout>
  <VDivider />
  <VLayout gutters="medium">
    <VCard :elevation="2" text="medium" />
  </VLayout>
  <VDivider />
  <VLayout gutters="large">
    <VCard :elevation="2" text="large" />
  </VLayout>
</template>

<script setup lang="ts">
import { VLayout, VCard, VDivider } from '@vonage/vivid-vue';
</script>
