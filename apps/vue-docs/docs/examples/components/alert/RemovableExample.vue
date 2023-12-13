<template>
  <div class="example-container">
    <VAlert text="An important information for you" removable :open="open" @close="open = false" />
    <VButton appearance="outlined" label="Show alert" @click="open = true" />
  </div>
</template>

<script setup lang="ts">
import { VAlert, VButton } from '@vonage/vivid-vue';
import { ref } from 'vue';

const open = ref(false);
</script>

<style lang="scss" scoped>
.example-container {
  height: 200px;
  transform: translateX(0px);
}
</style>
