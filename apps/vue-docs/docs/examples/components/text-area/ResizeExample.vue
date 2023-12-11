<template>
  <VTextArea v-model="defaultTextArea" />
  <VTextArea v-model="verticalTextArea" resize="vertical" />
  <VTextArea v-model="horizontalTextArea" resize="horizontal" />
  <VTextArea v-model="bothDirectionTextArea" resize="both" />
</template>
<script setup lang="ts">
import { VTextArea } from '@vonage/vivid-vue';
import { ref } from 'vue';

const defaultTextArea = ref('You cannot resize me by default');

const verticalTextArea = ref('You can resize me vertically');

const horizontalTextArea = ref('You can resize me horizontally');

const bothDirectionTextArea = ref('You can resize me in both directions');
</script>
