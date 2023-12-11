<template>
  <VLayout gutters="small-inline">
    <VCard :elevation="2" text="small-inline" />
  </VLayout>
  <VDivider />
  <VLayout gutters="medium-inline">
    <VCard :elevation="2" text="medium-inline" />
  </VLayout>
  <VDivider />
  <VLayout gutters="large-inline">
    <VCard :elevation="2" text="large-inline" />
  </VLayout>
</template>

<script setup lang="ts">
import { VLayout, VCard, VDivider } from '@vonage/vivid-vue';
</script>
