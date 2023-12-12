<template>
  <div style="height: 230px">
    <VDialog open>
      <template #main>
        <div style="padding: 8px">Use main slot for your own layout and content</div>
      </template>
    </VDialog>
  </div>
</template>

<script setup lang="ts">
import { VDialog } from '@vonage/vivid-vue';
</script>
