<template>
  <div style="text-align: center; height: 150px">
    <span id="anchor-min-inline-size" />
    <VMenu anchor="anchor-min-inline-size" open style="--menu-min-inline-size: 300px">
      <VMenuItem text="Menu Item" />
    </VMenu>
  </div>
</template>

<script setup lang="ts">
import { VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>
