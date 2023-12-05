<template>
  <div class="example-container">
    <VAlert
      style="--alert-max-inline-size: 300px"
      text="This is helptful to prevent the alert from becoming too wide when displaying a long message"
      open
    />
  </div>
</template>

<script setup lang="ts">
import { VAlert } from '@vonage/vivid-vue';
</script>

<style lang="scss" scoped>
.example-container {
  height: 200px;
  transform: translateX(0px);
}
</style>
