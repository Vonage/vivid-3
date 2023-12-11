<template>
  <VTagGroup>
    <VTag label="first tag" selectable selected />
    <VTag label="second tag" selectable />
    <VTag label="third tag" selectable selected />
  </VTagGroup>
</template>
<script setup lang="ts">
import { VTag, VTagGroup } from '@vonage/vivid-vue';
</script>
