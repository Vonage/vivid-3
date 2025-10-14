## Heading and Description

Use the `heading` attribute to give the event a brief title.

Use the `description` attribute to give the event a brief description.

```html preview
<vwc-calendar class="calendar">
	<vwc-calendar-event
		heading="Enchantment under the sea dance"
		description="Rhythmic ceremonial ritual"
		slot="day-0"
		start="9"
		duration="2.5"
	></vwc-calendar-event>
</vwc-calendar>

<style>
	.calendar {
		max-inline-size: 100%;
		max-block-size: 300px;
	}
</style>
```

## Start Time and Duration

Use the `start` attribute to set the time the event starts. The time is expressed as a number. Eg. 12.5 is 12:30pm, 18.75 is 6:45pm.

Use the `duration` attribute to indicate how long the event will last. Eg. 2 is 2 hours, 0.75 is 45 munites.

```html preview
<vwc-calendar class="calendar">
	<vwc-calendar-event
		heading="Enchantment under the sea dance"
		slot="day-0"
		start="9.75"
		duration="2.5"
	></vwc-calendar-event>
</vwc-calendar>

<style>
	.calendar {
		max-inline-size: 100%;
		max-block-size: 300px;
	}
</style>
```

## Appearance and Connotation

Use the `appearance` attribute to choose between `filled` (default) and `subtle` appearances.

Use the `connotation` attribute to choose between: `information` (default), `accent`, `cta`, `success`, `alert` and `announcement` connotations.

```html preview
<vwc-calendar class="calendar">
	<vwc-calendar-event
		heading="Information"
		description="Filled"
		slot="day-0"
		start="9"
	></vwc-calendar-event>
	<vwc-calendar-event
		appearance="subtle"
		heading="Information"
		description="Subtle"
		slot="day-0"
		start="10"
	></vwc-calendar-event>
	<vwc-calendar-event
		connotation="accent"
		heading="Accent"
		description="Filled"
		slot="day-1"
		start="9"
	></vwc-calendar-event>
	<vwc-calendar-event
		connotation="accent"
		appearance="subtle"
		heading="Accent"
		description="Subtle"
		slot="day-1"
		start="10"
	></vwc-calendar-event>
	<vwc-calendar-event
		connotation="cta"
		heading="CTA"
		description="Filled"
		slot="day-2"
		start="9"
	></vwc-calendar-event>
	<vwc-calendar-event
		connotation="cta"
		appearance="subtle"
		heading="CTA"
		description="Subtle"
		slot="day-2"
		start="10"
	></vwc-calendar-event>
	<vwc-calendar-event
		connotation="success"
		heading="Success"
		description="Filled"
		slot="day-3"
		start="9"
	></vwc-calendar-event>
	<vwc-calendar-event
		connotation="success"
		appearance="subtle"
		heading="Success"
		description="Subtle"
		slot="day-3"
		start="10"
	></vwc-calendar-event>
	<vwc-calendar-event
		connotation="alert"
		heading="Alert"
		description="Filled"
		slot="day-4"
		start="9"
	></vwc-calendar-event>
	<vwc-calendar-event
		connotation="alert"
		appearance="subtle"
		heading="Alert"
		description="Subtle"
		slot="day-4"
		start="10"
	></vwc-calendar-event>
	<vwc-calendar-event
		connotation="announcement"
		heading="Announcement"
		description="Filled"
		slot="day-5"
		start="9"
	></vwc-calendar-event>
	<vwc-calendar-event
		connotation="announcement"
		appearance="subtle"
		heading="Announcement"
		description="Subtle"
		slot="day-5"
		start="10"
	></vwc-calendar-event>
</vwc-calendar>

<style>
	.calendar {
		max-inline-size: 100%;
		max-block-size: 300px;
	}
</style>
```

## Overlapping Events

Use the `overlap-count` when events overlap each other.

The number you provide sets the stacking context of the event. The event you need to be at the bottom (usually the longest event) should have a `overlap-count` of `0`.

```html preview
<vwc-calendar class="calendar">
	<vwc-calendar-event
		overlap-count="0"
		heading="Enchantment under the sea dance"
		slot="day-0"
		start="8"
		duration="4"
	></vwc-calendar-event>
	<vwc-calendar-event
		overlap-count="1"
		heading="Marty plays with the Marvyn Berry band"
		connotation="accent"
		appearance="subtle"
		slot="day-0"
		start="9.15"
		duration="2.75"
	></vwc-calendar-event>
	<vwc-calendar-event
		overlap-count="2"
		description="George kisses Lorainne"
		connotation="success"
		slot="day-0"
		start="10.5"
		duration="1.25"
	></vwc-calendar-event>
</vwc-calendar>

<style>
	.calendar {
		max-inline-size: 100%;
		max-block-size: 300px;
	}
</style>
```
