<template>
  <VTextArea v-model="rowOne" rows="1" />
  <VTextArea v-model="rowTwo" rows="2" />
  <VTextArea v-model="rowThree" rows="3" />
</template>
<script setup lang="ts">
import { VTextArea } from '@vonage/vivid-vue';
import { ref } from 'vue';

const rowOne = ref('1 row text area');

const rowTwo = ref('2 rows text area');

const rowThree = ref('3 rows text area');
</script>
