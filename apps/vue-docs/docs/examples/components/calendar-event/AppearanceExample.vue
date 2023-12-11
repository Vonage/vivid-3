<template>
  <VCalendar>
    <VCalendarEvent slot="day-0" appearance="filled" heading="filled" />
    <VCalendarEvent slot="day-1" appearance="subtle" heading="subtle" />
  </VCalendar>
</template>
<script setup lang="ts">
import { VCalendar, VCalendarEvent } from '@vonage/vivid-vue';
</script>
