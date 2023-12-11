<template>
  <VLayout style="--layout-grid-template-columns: 1fr auto 1fr">
    <VDivider role="presentation" class="flex-center-align" />
    More Info
    <VDivider role="presentation" class="flex-center-align" />
  </VLayout>
</template>

<script setup lang="ts">
import { VLayout, VDivider } from '@vonage/vivid-vue';
</script>
<style scoped lang="scss">
.flex-center-align {
  display: flex;
  align-items: center;
}
</style>
