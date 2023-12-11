<template>
  <div style="text-align: center; height: 60px">
    <span id="anchor-submenu" />
    <VMenu anchor="anchor-submenu" open>
      <VMenuItem text="Menu item with Submenu">
        <template #submenu>
          <VMenu>
            <VMenuItem text="Submenu item" />
          </VMenu>
        </template>
      </VMenuItem>
    </VMenu>
  </div>
</template>

<script setup lang="ts">
import { VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>
