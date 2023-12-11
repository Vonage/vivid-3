<template>
  <VAccordion>
    <VAccordionItem heading="normal accordion item" meta="meta-data" icon="chat-solid">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </VAccordionItem>
  </VAccordion>
  <hr />
  <VAccordion>
    <VAccordionItem heading="condensed accordion item" size="condensed" meta="meta-data" icon="chat-solid">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </VAccordionItem>
  </VAccordion>
</template>
<script setup lang="ts">
import { VAccordion, VAccordionItem } from '@vonage/vivid-vue';
</script>
