<template>
  <div style="text-align: center; height: 340px">
    <span id="anchor-role" />
    <VMenu anchor="anchor-role" open>
      <VMenuItem role="menuitem" text="Menu item 1" />
      <VMenuItem role="menuitem" text="Menu item 2" />
      <VDivider />
      <VMenuItem role="menuitemcheckbox" text="Checkbox 1" />
      <VMenuItem role="menuitemcheckbox" text="Checkbox 2" />
      <VDivider />
      <VMenuItem role="menuitemradio" text="Radio 1.1" />
      <VMenuItem role="menuitemradio" text="Radio 1.2" />
      <VDivider />
      <VMenuItem role="menuitemradio" text="Radio 2.1" />
      <VMenuItem role="menuitemradio" text="Radio 2.2" />
    </VMenu>
  </div>
</template>

<script setup lang="ts">
import { VMenu, VMenuItem, VDivider } from '@vonage/vivid-vue';
</script>
