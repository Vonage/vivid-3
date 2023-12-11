<template>
  <VDataGrid>
    <VDataGridRow role="row" row-type="header">
      <VDataGridCell cell-type="columnheader" role="columnheader">Name</VDataGridCell>
      <VDataGridCell cell-type="columnheader" role="columnheader">Surname</VDataGridCell>
      <VDataGridCell cell-type="columnheader" role="columnheader">Age</VDataGridCell>
    </VDataGridRow>
    <VDataGridRow>
      <VDataGridCell>John</VDataGridCell>
      <VDataGridCell>Doe</VDataGridCell>
      <VDataGridCell>30</VDataGridCell>
    </VDataGridRow>
    <VDataGridRow>
      <VDataGridCell>Jane</VDataGridCell>
      <VDataGridCell>Doe</VDataGridCell>
      <VDataGridCell>25</VDataGridCell>
    </VDataGridRow>
  </VDataGrid>
</template>
<script setup lang="ts">
import { VDataGrid, VDataGridCell, VDataGridRow } from '@vonage/vivid-vue';
</script>
