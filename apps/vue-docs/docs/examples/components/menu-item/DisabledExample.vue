<template>
  <div style="text-align: center; height: 60px">
    <span id="anchor-disabled" />
    <VMenu anchor="anchor-disabled" open>
      <VMenuItem disabled text="Disabled Menu item" />
    </VMenu>
  </div>
</template>

<script setup lang="ts">
import { VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>
