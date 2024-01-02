<template>
  <VCard headline="Card with Media" text="here is the card text" style="max-inline-size: 300px">
    <template #media>
      <img
        src="https://doodleipsum.com/300x150/flat?bg=EB765D&amp;i=7d5ed3bc0c215d1359b2a63d03cf1540"
        alt="Sitting on Floor"
        style="width: 100%; height: 150px; object-fit: cover"
      />
    </template>
  </VCard>
</template>

<script setup lang="ts">
import { VCard } from '@vonage/vivid-vue';
</script>
