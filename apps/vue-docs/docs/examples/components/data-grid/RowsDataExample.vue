<template>
  <VDataGrid id="grid" :rows-data="data" />
</template>
<script setup lang="ts">
import { VDataGrid } from '@vonage/vivid-vue';
import { ref } from 'vue';

const data = ref([
  { name: 'John', surname: 'Doe', age: 30 },
  { name: 'Jane', surname: 'Doe', age: 25 },
  { name: 'Bill', surname: 'Cave', age: 22 },
  { name: 'Jill', surname: 'Jane', age: 23 },
]);
</script>
