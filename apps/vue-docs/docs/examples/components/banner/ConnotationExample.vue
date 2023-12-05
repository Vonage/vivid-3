<template>
  <div>
    <VBanner text="Here's some information that you may find useful!" connotation="information" />
    <VBanner text="Here's some information that you may find important!" connotation="announcement" />
    <VBanner text="Operation Successful!" connotation="success" />
    <VBanner text="Heads up - this is a warning" connotation="warning" />
    <VBanner text="ALERT! Something went wrong!" connotation="alert" />
  </div>
</template>

<script setup lang="ts">
import { VBanner } from '@vonage/vivid-vue';
</script>
