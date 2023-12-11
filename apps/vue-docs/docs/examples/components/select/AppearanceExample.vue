<template>
  <div class="container">
    <VSelect appearance="ghost">
      <VOption value="1" text="Option 1" selected />
      <VOption value="2" text="Option 2" />
    </VSelect>
  </div>
</template>

<script setup lang="ts">
import { VSelect, VOption } from '@vonage/vivid-vue';
</script>

<style scoped>
.container {
  block-size: 120px;
}
</style>
