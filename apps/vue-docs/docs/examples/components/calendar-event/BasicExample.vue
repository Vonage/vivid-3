<template>
	<VCalendar datetime="2021-01-01">
		<VCalendarEvent
			slot="day-0"
			start="0"
			duration="1"
			connotation="information"
			heading="Pool party"
			description="2pm"
		/>
		<VCalendarEvent
			slot="day-0"
			start="14"
			duration="2.25"
			connotation="accent"
			appearance="subtle"
			heading="Summer time"
			description="All Day"
		/>
		<VCalendarEvent
			slot="day-2"
			start="4"
			duration="4"
			connotation="announcement"
			heading="Team meeting"
			description="11am - 13pm"
		/>
		<VCalendarEvent
			slot="day-3"
			start="16"
			duration="8"
			connotation="success"
			heading="Main event"
			description="12:30pm"
			overlap-count="2"
		/>
		<VCalendarEvent
			slot="day-3"
			start="17"
			duration="7"
			connotation="information"
			heading="Roadmap discussion"
			description="All Day"
		/>
		<VCalendarEvent
			slot="day-3"
			start="18.5"
			duration="7.5"
			connotation="accent"
			appearance="subtle"
			heading="Summer time"
			description="15:30pm"
			overlap-count="1"
		/>
		<VCalendarEvent
			slot="day-6"
			start="12"
			duration="4"
			connotation="cta"
			heading="Team social"
			description="14pm"
		/>
		<VCalendarEvent
			slot="day-6"
			start="20"
			duration="5"
			connotation="success"
			heading="Summer time"
			description="18pm"
		/>
	</VCalendar>
</template>
<script setup lang="ts">
import { VCalendar, VCalendarEvent } from '@vonage/vivid-vue';
</script>
