<template>
  <VDataGrid>
    <VDataGridRow role="row" row-type="header">
      <VDataGridCell cell-type="columnheader" role="columnheader">Name</VDataGridCell>
      <VDataGridCell cell-type="columnheader" role="columnheader">Surname</VDataGridCell>
      <VDataGridCell cell-type="columnheader" role="columnheader">Age</VDataGridCell>
      <VDataGridCell cell-type="columnheader" role="columnheader">Profession</VDataGridCell>
    </VDataGridRow>
    <VDataGridRow v-for="employee in data" :key="employee.id">
      <VDataGridCell>{{ employee.name }}</VDataGridCell>
      <VDataGridCell>{{ employee.surname }}</VDataGridCell>
      <VDataGridCell>{{ employee.age }}</VDataGridCell>
      <VDataGridCell>
        <VSelect v-model="employee.profession" fixed-dropdown>
          <VOption
            v-for="profession in professions"
            :key="profession.id"
            :value="profession.id.toString()"
            :text="profession.name"
          />
        </VSelect>
      </VDataGridCell>
    </VDataGridRow>
  </VDataGrid>
</template>
<script setup lang="ts">
import { VDataGrid, VDataGridCell, VDataGridRow, VSelect, VOption } from '@vonage/vivid-vue';
import { ref } from 'vue';

const professions = ref([
  { id: 1, name: 'Developer' },
  { id: 2, name: 'Designer' },
  { id: 3, name: 'Tester' },
  { id: 4, name: 'Manager' },
  { id: 5, name: 'Sales' },
  { id: 6, name: 'Marketing' },
  { id: 7, name: 'Support' },
  { id: 8, name: 'HR' },
  { id: 9, name: 'Finance' },
  { id: 10, name: 'Legal' },
  { id: 11, name: 'Other' },
]);

const data = ref([
  { id: 1, name: 'John', surname: 'Doe', age: 30, profession: 2 },
  { id: 2, name: 'Jane', surname: 'Doe', age: 25, profession: 5 },
  { id: 3, name: 'Bill', surname: 'Cave', age: 22, profession: 9 },
  { id: 4, name: 'Jill', surname: 'Jane', age: 23, profession: 1 },
]);
</script>
