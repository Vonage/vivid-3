<template>
  <div style="text-align: center; height: 150px">
    <span id="anchor-menu" />
    <VMenu anchor="anchor-menu" open>
      <VMenuItem text="Menu item 1" />
      <VMenuItem text="Menu item 2" />
    </VMenu>
  </div>
</template>

<script setup lang="ts">
import { VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>
