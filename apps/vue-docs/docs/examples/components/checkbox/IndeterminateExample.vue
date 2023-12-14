<template>
  <VCheckbox ref="checkbox" />
</template>

<script setup lang="ts">
import { VCheckbox } from '@vonage/vivid-vue';
import { ref, watchEffect } from 'vue';

const checkbox = ref<VCheckbox>(null);
watchEffect(() => {
  if (checkbox.value) {
    checkbox.value.$el.indeterminate = true;
  }
});
</script>
