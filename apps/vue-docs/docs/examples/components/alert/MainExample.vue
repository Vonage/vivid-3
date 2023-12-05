<template>
  <div class="example-container">
    <VAlert open>
      <template #main>
        <VSwitch label="Do not show more alerts" />
      </template>
    </VAlert>
  </div>
</template>

<script setup lang="ts">
import { VAlert, VSwitch } from '@vonage/vivid-vue';
</script>

<style lang="scss" scoped>
.example-container {
  height: 200px;
  transform: translateX(0px);
}
</style>
