<template>
  <div>
    <VBadge text="accent" connotation="accent" appearance="filled" />
    <VBadge text="cta" connotation="cta" appearance="filled" />
    <VBadge text="information" connotation="information" appearance="filled" />
    <VBadge text="success" connotation="success" />
    <VBadge text="warning" connotation="warning" />
    <VBadge text="alert" connotation="alert" />
  </div>
</template>

<script setup lang="ts">
import { VBadge } from '@vonage/vivid-vue';
</script>
