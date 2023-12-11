<template>
  <div class="container">
    <VSelect class="select">
      <VOption value="1" text="Option 1" />
      <VOption value="2" text="Option 2" />
      <VOption value="3" text="Option 3" />
      <VOption value="4" text="Option 4" />
      <VOption value="5" text="Option 5" />
      <VOption value="6" text="Option 6" />
      <VOption value="7" text="Option 7" />
    </VSelect>
  </div>
</template>

<script setup lang="ts">
import { VSelect, VOption } from '@vonage/vivid-vue';
</script>

<style scoped>
.container {
  block-size: 250px;
}
.select {
  width: 130px;
  --select-height: 200px;
}
</style>
