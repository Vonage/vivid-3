<template>
  <VLayout column-spacing="small" column-basis="small">
    <VButton appearance="filled" label="accent" connotation="accent" />
    <VButton appearance="filled" label="cta" connotation="cta" />
    <VButton appearance="filled" label="success" connotation="success" />
    <VButton appearance="filled" label="alert" connotation="alert" />
  </VLayout>
</template>
<script setup lang="ts">
import { VLayout, VButton } from '@vonage/vivid-vue';
</script>
