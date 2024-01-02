<template>
  <VLayout column-spacing="small" column-basis="small">
    <VButton appearance="outlined" label="accent" connotation="accent" />
    <VButton appearance="outlined" label="cta" connotation="cta" />
    <VButton appearance="outlined" label="success" connotation="success" />
    <VButton appearance="outlined" label="alert" connotation="alert" />
  </VLayout>
</template>
<script setup lang="ts">
import { VLayout, VButton } from '@vonage/vivid-vue';
</script>
