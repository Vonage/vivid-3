<template>
  <VCard headline="All Options on Deck" subtitle="subtitle" icon="chat-line" text="here is the card text">
    <template #media>
      <div style="height: 150px; width: 100%; background-color: rebeccapurple" />
    </template>
    <template #meta>
      <VButton icon="more-vertical-solid" appearance="ghost" />
    </template>
    <template #footer>
      <VButton icon="arrow-bold-right-line" shape="pill" label="Action" appearance="outlined" />
    </template>
  </VCard>
</template>

<script setup lang="ts">
import { VCard, VButton } from '@vonage/vivid-vue';
</script>
