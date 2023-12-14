<template>
  <VDataGrid id="grid" :rows-data="data" :grid-template-columns="gridTemplateColumns" />
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

const gridTemplateColumns = ref('50px 100px 1fr');
</script>

<style lang="scss">
[role='columnheader'],
[role='gridcell'] {
  min-inline-size: 50px; /* Needed to reduce the default min-inline-size of 80px */
}
</style>
