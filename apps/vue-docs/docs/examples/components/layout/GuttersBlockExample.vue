<template>
  <VLayout gutters="small-block">
    <VCard :elevation="2" text="small-block" />
  </VLayout>
  <VDivider />
  <VLayout gutters="medium-block">
    <VCard :elevation="2" text="medium-block" />
  </VLayout>
  <VDivider />
  <VLayout gutters="large-block">
    <VCard :elevation="2" text="large-block" />
  </VLayout>
</template>

<script setup lang="ts">
import { VLayout, VCard, VDivider } from '@vonage/vivid-vue';
</script>
