<template>
  <div>
    <VLayout style="--layout-grid-template-columns: repeat(auto-fit, minmax(100px, 1fr))">
      <VCard :elevation="2" />
      <VCard :elevation="2" />
      <VCard :elevation="2" />
      <VCard :elevation="2" />
    </VLayout>
    <VLayout style="--layout-grid-template-columns: repeat(auto-fill, minmax(100px, 1fr))">
      <VCard :elevation="2" />
      <VCard :elevation="2" />
      <VCard :elevation="2" />
      <VCard :elevation="2" />
    </VLayout>
    <VLayout style="--layout-grid-template-columns: 280px repeat(auto-fill, minmax(100px, 1fr))">
      <VCard :elevation="2" />
      <VCard :elevation="2" />
      <VCard :elevation="2" />
      <VCard :elevation="2" />
    </VLayout>
  </div>
</template>

<script setup lang="ts">
import { VLayout, VCard } from '@vonage/vivid-vue';
</script>
