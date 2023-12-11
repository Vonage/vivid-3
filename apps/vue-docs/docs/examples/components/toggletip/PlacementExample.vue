<template>
  <div class="example-container">
    <VButton id="button6" icon="help-solid" shape="pill" />

    <VToggletip anchor="button6" placement="top">top</VToggletip>
    <VToggletip anchor="button6" placement="right">right</VToggletip>
    <VToggletip anchor="button6" placement="bottom">bottom</VToggletip>
    <VToggletip anchor="button6" placement="left">left</VToggletip>
  </div>
</template>

<script setup lang="ts">
import { VButton, VToggletip } from '@vonage/vivid-vue';
</script>

<style lang="scss" scoped>
.example-container {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
