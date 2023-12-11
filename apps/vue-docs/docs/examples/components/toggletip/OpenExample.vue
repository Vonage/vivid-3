<template>
  <div>
    <VButton id="button3" icon="help-solid" shape="pill" />
    <VToggletip anchor="button3" open>I'm open by default</VToggletip>
  </div>
</template>

<script setup lang="ts">
import { VButton, VToggletip } from '@vonage/vivid-vue';
</script>
