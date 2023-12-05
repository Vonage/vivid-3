<template>
  <VDataGrid @sort="onSort">
    <VDataGridRow role="row" row-type="header">
      <VDataGridCell
        v-for="column in columns"
        :key="column.columnDataKey"
        cell-type="columnheader"
        role="columnheader"
        :aria-sort="column.sortDirection"
        >{{ column.title }}
      </VDataGridCell>
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

const ORIGINAL_DATA = [
  { id: 1, name: 'John', surname: 'Doe', age: 30, profession: 2 },
  { id: 2, name: 'Jane', surname: 'Doe', age: 25, profession: 5 },
  { id: 3, name: 'Bill', surname: 'Cave', age: 22, profession: 9 },
  { id: 4, name: 'Jill', surname: 'Jane', age: 23, profession: 1 },
];

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

const data = ref(Array.from(ORIGINAL_DATA));

const columns = ref([
  {
    title: 'Name',
    columnDataKey: 'name',
    sortable: true,
    sortDirection: 'none',
  },
  {
    title: 'Surname',
    columnDataKey: 'surname',
    sortable: true,
    sortDirection: 'none',
  },
  {
    title: 'Age',
    columnDataKey: 'age',
    sortable: true,
    sortDirection: 'none',
  },
  {
    title: 'Profession',
    columnDataKey: 'profession',
    sortable: true,
    sortDirection: 'none',
  },
]);

const sortDataByColumnKey = (columnDataKey: string, sortDirection: string) => {
  if (sortDirection === 'none') {
    data.value = Array.from(ORIGINAL_DATA);
    return;
  }

  data.value.sort((a, b) => {
    if (a[columnDataKey] < b[columnDataKey]) {
      return sortDirection === 'ascending' ? -1 : 1;
    }
    if (a[columnDataKey] > b[columnDataKey]) {
      return sortDirection === 'ascending' ? 1 : -1;
    }
    return 0;
  });
};

const onSort = ({ detail }) => {
  const column = columns.value.find(c => c.columnDataKey === detail.columnDataKey.toLowerCase());
  if (column.sortDirection === 'none') {
    column.sortDirection = 'ascending';
  } else {
    column.sortDirection = column.sortDirection === 'ascending' ? 'descending' : 'none';
  }
  columns.value.forEach(c => {
    if (c.columnDataKey !== column.columnDataKey) {
      c.sortDirection = 'none';
    }
  });
  sortDataByColumnKey(column.columnDataKey, column.sortDirection);
};
</script>
