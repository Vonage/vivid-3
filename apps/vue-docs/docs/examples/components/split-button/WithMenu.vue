<template>
  <div style="height: 150px">
    <VSplitButton ref="splitButton" appearance="filled" label="A default split button" @indicator-click="open = !open">
      <VMenu :anchor="splitButton?.$el.indicator" placement="bottom-end" :open="open">
        <VMenuItem text="Menu item 1" />
        <VMenuItem text="Menu item 2" />
      </VMenu>
    </VSplitButton>
  </div>
</template>

<script setup lang="ts">
import { VSplitButton, VMenu, VMenuItem } from '@vonage/vivid-vue';
import { ref } from 'vue';

const splitButton = ref(null);
const open = ref(true);
</script>

