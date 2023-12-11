<template>
  <VEmptyState icon="phone-number-line" headline="No numbers">
    You do not have any numbers yet.
    <template #action-items>
      <VButton shape="pill" label="Buy numbers" appearance="filled" />
      <VButton shape="pill" label="Import numbers" appearance="outlined" />
    </template>
  </VEmptyState>
</template>

<script setup lang="ts">
import { VEmptyState, VButton } from '@vonage/vivid-vue';
</script>
