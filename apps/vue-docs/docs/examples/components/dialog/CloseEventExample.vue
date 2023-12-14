<template>
  <div style="height: 230px">
    <VDialog ref="dialog" open headline="Returning Dialog" @close="handleClose" />
    <VButton label="Close Dialog" @click="closeDialog" />
  </div>
</template>

<script setup lang="ts">
import { VButton, VDialog } from '@vonage/vivid-vue';
import { ref } from 'vue';

const dialog = ref<VDialog>(null);

function handleClose(e) {
  console.log(e.detail);
}

function closeDialog() {
  dialog.value.$el.returnValue = 'Value';
  dialog.value.close();
}
</script>
