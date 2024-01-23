<template>
  <div>
    <VButton label="Add item" appearance="outlined" @click="push" />
    <VButton label="Remove last item" appearance="outlined" @click="pop" />
    <VButton label="Remove first item" appearance="outlined" @click="shift" />
    <VButton label="Update items" appearance="outlined" @click="update" />
    <VDataGrid selection-mode="single-row" generate-header="sticky" :rows-data="data" />
  </div>
</template>
<script setup lang="ts">
  import { VDataGrid, VButton } from '@vonage/vivid-vue';

  let ORIGINAL_DATA = [{ data1: 'data01', data2: 'data02'}];
  let data = Array.from(ORIGINAL_DATA);
  let count = 1

	for (let i = 0; i < 3; i++) {
    push();
  }

  function push() {
    data.push(
      {
        data1: `data${count}1`,
        data2: `data${count}2`
      }
    );
    count++;
  }

  function pop() {
    data.pop();
  }

  function shift() {
    data.shift();
  }

  function update() {
    // implement update logic here
  }

</script>
