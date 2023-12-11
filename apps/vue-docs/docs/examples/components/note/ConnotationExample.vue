<template>
  <div>
    <VNote connotation="alert" icon="error-solid" headline="alert note" />
    <VNote connotation="success" icon="check-circle-solid" headline="success note" />
    <VNote connotation="warning" icon="warning-solid" headline="warning note" />
    <VNote connotation="information" icon="info-solid" headline="information note" />
    <VNote connotation="accent" icon="megaphone-solid" headline="accent note" />
  </div>
</template>

<script setup lang="ts">
import { VNote } from '@vonage/vivid-vue';
</script>
