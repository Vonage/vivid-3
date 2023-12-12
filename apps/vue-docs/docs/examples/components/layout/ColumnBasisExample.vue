<template>
  <div>
    <VLayout gutters="small" column-basis="small">
      <VCard :elevation="2" text="small" />
      <VCard :elevation="2" text="small" />
      <VCard :elevation="2" text="small" />
      <VCard :elevation="2" text="small" />
    </VLayout>
    <VLayout gutters="small" column-basis="medium">
      <VCard :elevation="2" text="medium" />
      <VCard :elevation="2" text="medium" />
      <VCard :elevation="2" text="medium" />
      <VCard :elevation="2" text="medium" />
    </VLayout>
    <VLayout gutters="small" column-basis="large">
      <VCard :elevation="2" text="large" />
      <VCard :elevation="2" text="large" />
      <VCard :elevation="2" text="large" />
      <VCard :elevation="2" text="large" />
    </VLayout>
    <VLayout gutters="small" column-basis="block">
      <VCard :elevation="2" text="block" />
      <VCard :elevation="2" text="block" />
      <VCard :elevation="2" text="block" />
      <VCard :elevation="2" text="block" />
    </VLayout>
  </div>
</template>

<script setup lang="ts">
import { VLayout, VCard } from '@vonage/vivid-vue';
</script>
