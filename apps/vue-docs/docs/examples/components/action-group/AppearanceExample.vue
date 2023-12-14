<template>
  <div>
    <VActionGroup appearance="fieldset">
      <VButton label="edit" />
      <VButton label="copy" />
      <VButton label="paste" />
      <VButton label="submit" />
    </VActionGroup>
    <VActionGroup appearance="ghost">
      <VButton label="edit" appearance="filled" />
      <VButton label="copy" appearance="filled" />
      <VButton label="paste" appearance="filled" />
      <VButton label="submit" appearance="filled" />
    </VActionGroup>
  </div>
</template>

<script setup lang="ts">
import { VActionGroup, VButton } from '@vonage/vivid-vue';
</script>
