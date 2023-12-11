<template>
  <VSelect v-model="value" label="Header Type" class="select">
    <VOption value="none" text="none" />
    <VOption value="sticky" text="sticky" />
    <VOption value="default" text="default" />
  </VSelect>
  <VDataGrid id="grid" :generate-header="value" :rows-data="data" />
</template>
<script setup lang="ts">
import { VDataGrid, VSelect, VOption } from '@vonage/vivid-vue';
import { ref } from 'vue';

const value = ref('none');
const data = ref([
  { name: 'John', surname: 'Doe', age: 30 },
  { name: 'Jane', surname: 'Doe', age: 25 },
  { name: 'Bill', surname: 'Cave', age: 22 },
  { name: 'Jill', surname: 'Jane', age: 23 },
]);
</script>
<style lang="scss" scoped>
#grid {
  height: 150px;
  overflow: scroll;
}
</style>
