<template>
  <div class="container">
    <VSelect
      label="country code"
      :icon="value"
      class="select"
      @change="value = $event.target._selectedOptions[0]._icon"
    >
      <VOption value="1" text="+1" icon="flag-united-states" />
      <VOption value="+49" text="+49" icon="flag-germany" />
      <VOption value="+355" text="+355" icon="flag-albania" />
    </VSelect>
  </div>
</template>

<script setup lang="ts">
import { VSelect, VOption } from '@vonage/vivid-vue';
import { ref } from 'vue';

const value = ref('flag-united-states');
</script>

<style scoped>
.container {
  block-size: 230px;
}
.select {
  width: 120px;
}
</style>
