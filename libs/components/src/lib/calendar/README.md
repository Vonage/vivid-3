## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```js
import { VCalendar } from '@vonage/vivid-vue';
```

```vue preview
<script setup lang="ts">
import { VCalendar } from '@vonage/vivid-vue';
</script>
<template>
	<VCalendar class="calendar" />
</template>

<style scoped>
.calendar {
	max-inline-size: 100%;
	max-block-size: 250px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerCalendar } from '@vonage/vivid';

registerCalendar('your-prefix');
```

```html preview
<script type="module">
	import { registerCalendar } from '@vonage/vivid';
	registerCalendar('your-prefix');
</script>

<your-prefix-calendar class="calendar"></your-prefix-calendar>

<style>
	.calendar {
		max-inline-size: 100%;
		max-block-size: 250px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## CSS Variables

### Calendar Column / Header Background Color

When using `sticky-mode` (`header`, `column`, or `both`), set the CSS variable `--calendar-column-background-color` to define the background color of sticky elements.

If not specified, it defaults to `--vvd-color-canvas`.

```html preview
<div class="wrapper">
	<vwc-calendar sticky-mode="all"></vwc-calendar>
</div>

<style>
	.wrapper {
		--calendar-header-background-color: var(--vvd-color-neutral-100);
		--calendar-column-background-color: var(--vvd-color-neutral-100);

		display: block;
		max-inline-size: 100%;
		max-block-size: 550px;
		background-color: var(--vvd-color-neutral-100);
		padding: 16px;
	}
</style>
```

## Slots

### Day[0-6] Slots

Each day in the Calendar has a slot assigned to it. Use the Calendar Event component in these slots to arrange events around the weekly view.

```html preview
<vwc-calendar class="calendar">
	<vwc-calendar-event
		slot="day-0"
		start="10"
		duration="1"
		heading="Backlog refinement"
	></vwc-calendar-event>
	<vwc-calendar-event
		slot="day-0"
		start="12"
		duration="1"
		heading="Gym Workout"
		connotation="cta"
	></vwc-calendar-event>
	<vwc-calendar-event
		slot="day-1"
		start="10"
		duration="0.5"
		heading="Daily stand up"
		appearance="subtle"
	></vwc-calendar-event>
	<vwc-calendar-event
		slot="day-2"
		start="10"
		duration="0.5"
		heading="Daily stand up"
		appearance="subtle"
	></vwc-calendar-event>
	<vwc-calendar-event
		slot="day-2"
		start="12"
		duration="1"
		heading="Swim"
		connotation="cta"
	></vwc-calendar-event>
	<vwc-calendar-event
		slot="day-3"
		start="10"
		duration="0.5"
		heading="Daily stand up"
		appearance="subtle"
	></vwc-calendar-event>
	<vwc-calendar-event
		slot="day-4"
		start="10"
		duration="0.5"
		heading="Daily stand up"
		appearance="subtle"
	></vwc-calendar-event>
	<vwc-calendar-event
		slot="day-4"
		start="14"
		duration="0.75"
		heading="Sprint demo"
	></vwc-calendar-event>
	<vwc-calendar-event
		slot="day-4"
		start="12"
		duration="1"
		heading="Gym Workout"
		connotation="cta"
	></vwc-calendar-event>
	<vwc-calendar-event
		slot="day-5"
		start="9"
		duration="1"
		heading="Park run"
		connotation="cta"
	></vwc-calendar-event>
</vwc-calendar>

<style>
	.calendar {
		max-inline-size: 100%;
		max-block-size: 550px;
	}
</style>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name            | Type                                                  | Description                               |
| --------------- | ----------------------------------------------------- | ----------------------------------------- |
| **datetime**    | `Date()` constructor acceptable parameter             | Sets the week to display                  |
| **hour12**      | `boolean`                                             | Displays a time in 12 hour format         |
| **locales**     | `string`, `String[]`                                  | Sets the locale to be displayed           |
| **start**       | `sunday`, `monday`                                    | Sets the first day of the week to display |
| **sticky-mode** | `'none'` , `'header'` , `'column'` , `'all'`(default) | Set the `sticky-mode` attribute           |

</div>

### Slots

<div class="table-wrapper">

| Name      | Description                                          |
| --------- | ---------------------------------------------------- |
| **day-0** | Adds a Calendar Event in the first day of the view   |
| **day-1** | Adds a Calendar Event in the second day of the view  |
| **day-2** | Adds a Calendar Event in the third day of the view   |
| **day-3** | Adds a Calendar Event in the fourth day of the view  |
| **day-4** | Adds a Calendar Event in the fifth day of the view   |
| **day-5** | Adds a Calendar Event in the sixth day of the view   |
| **day-6** | Adds a Calendar Event in the seventh day of the view |

</div>

### Methods

<div class="table-wrapper">

| Name              | Returns                                  | Description                                                                            |
| ----------------- | ---------------------------------------- | -------------------------------------------------------------------------------------- |
| `getEventContext` | `{ day: number, hour: number }` \ `null` | Accepts event reference and returns an object containing _day_ & _hour_ if applicable. |

</div>
