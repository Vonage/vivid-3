<template>
  <VBanner text="A banner with an action button">
    <template #action-items>
      <VButton appearance="filled" connotation="accent" label="Learn More" />
    </template>
  </VBanner>
</template>

<script setup lang="ts">
import { VBanner, VButton } from '@vonage/vivid-vue';
</script>
