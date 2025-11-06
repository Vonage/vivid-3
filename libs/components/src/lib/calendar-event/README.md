## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```js
import { VCalendar, VCalendarEvent } from '@vonage/vivid-vue';
```

```vue preview
<script setup lang="ts">
import { VCalendar, VCalendarEvent } from '@vonage/vivid-vue';
</script>
<template>
	<VCalendar class="calendar">
		<template #day-0>
			<VCalendarEvent heading="Enchantment under the sea dance" start="9" duration="2" />
		</template>
	</VCalendar>
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
import { registerCalendar, registerCalendarEvent } from '@vonage/vivid';

registerCalendar('your-prefix');
registerCalendarEvent('your-prefix');
```

```html preview
<script type="module">
	import { registerCalendar, registerCalendarEvent } from '@vonage/vivid';
	registerCalendar('your-prefix');
	registerCalendarEvent('your-prefix');
</script>

<your-prefix-calendar class="calendar">
	<your-prefix-calendar-event heading="Enchantment under the sea dance" slot="day-0" start="9" duration="2"></your-prefix-calendar-event>
</your-prefix-calendar>

<style>
	.calendar {
		max-inline-size: 100%;
		max-block-size: 250px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Properties

<div class="table-wrapper">

| Name              | Type                                                                         | Description                                                          |
| ----------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **appearance**    | `filled` (default), `subtle`                                                 | Sets the event's appearance                                          |
| **connotation**   | `information` (default), `accent`, `cta`, `success`, `alert`, `announcement` | Sets the first day of the week to display                            |
| **description**   | `string`                                                                     | Sets the event description                                           |
| **duration**      | `string`                                                                     | Sets the event duration ("2" = 2 hours)                              |
| **heading**       | `string`                                                                     | Sets the event heading                                               |
| **overlap-count** | `string` (number)                                                            | Sets the stacking context of the event when it overlaps with another |
| **start-time**    | `string`                                                                     | Sets the event start time (14 = 2pm)                                 |

</div>
