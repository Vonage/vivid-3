<template>
  <div>
    <VButton id="button1" icon="help-solid" shape="pill" />
    <VToggletip anchor="button1">My anchor is an ID</VToggletip>

    <VButton ref="button" icon="help-solid" shape="pill" />
    <VToggletip :anchor="button?.$el">My anchor is a reference</VToggletip>
  </div>
</template>

<script setup lang="ts">
import { VButton, VToggletip } from '@vonage/vivid-vue';
import { ref } from 'vue';

const button = ref<typeof VButton | null>(null);
</script>
