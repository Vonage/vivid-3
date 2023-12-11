<template>
  <VPagination total="20" @pagination-change="onPaginationChange" />
  <div>{{ detail }}</div>
</template>

<script setup lang="ts">
import { VPagination } from '@vonage/vivid-vue';
import { ref } from 'vue';

const detail = ref('');
const onPaginationChange = e => {
  detail.value = JSON.stringify(e.detail);
};
</script>
