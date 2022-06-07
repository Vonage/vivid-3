# Calendar Event

Represents a calendar event custom element.

```js
<script type="module">
  import '@vonage/vivid/calendar-event';
</script>
```

## Members

### Heading

Set the heading of the event.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-calendar>
  <vwc-calendar-event slot="day-0" heading="Summer pool party">
  </vwc-calendar-event>
</vwc-calendar>
```

### Description

Sets the description of the event.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-calendar>
  <vwc-calendar-event slot="day-0" description="A party in which guests swim in a swimming pool">
  </vwc-calendar-event>
</vwc-calendar>
```

### Overlap Count

Sets an event display stacking context precendence and indentation where multiple events overlap.

- Type: `string`
- Default: `undefined`

### Start

Sets the time of day in which the event starts.

- Type: `string`
- Default: `undefined`

### Duration

Set the duration of the event in hours.

- Type: `string`
- Default: `undefined`

## Connotation

Set the `connotation` attribute to change the calendar event's connotation.
It accepts a subset of predefined values.

- Type: `'accent'` | `'cta'` | `'success'` | `'alert'` | `'warning'` | `'info'` | `'announcement'`
- Default: `'accent'`

```html preview
<vwc-calendar>
  <vwc-calendar-event slot="day-0" heading="accent" connotation="accent"> </vwc-calendar-event>
  <vwc-calendar-event slot="day-1" heading="cta" connotation="cta"> </vwc-calendar-event>
  <vwc-calendar-event slot="day-2" heading="success" connotation="success"> </vwc-calendar-event>
  <vwc-calendar-event slot="day-3" heading="alert" connotation="alert"> </vwc-calendar-event>
  <vwc-calendar-event slot="day-4" heading="warning" connotation="warning"> </vwc-calendar-event>
  <vwc-calendar-event slot="day-5" heading="info" connotation="info"> </vwc-calendar-event>
  <vwc-calendar-event slot="day-6" heading="announcement" connotation="announcement"> </vwc-calendar-event>
</vwc-calendar>
```
