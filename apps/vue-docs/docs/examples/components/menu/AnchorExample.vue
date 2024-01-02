<template>
  <div style="height: 150px">
    <VButton ref="button" label="Toggle Menu" appearance="outlined" @click="open = !open" />
    <VMenu :anchor="$refs.button?.$el" :open="open">
      <VMenuItem text="Menu item 1" />
      <VMenuItem text="Menu item 2" />
    </VMenu>
  </div>
</template>

<script setup lang="ts">
import { VButton, VMenu, VMenuItem } from '@vonage/vivid-vue';
import { ref } from 'vue';

const open = ref(false);
</script>
