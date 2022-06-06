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

### Color

Sets the color of the event.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-calendar>
  <vwc-calendar-event slot="day-0" color="var(--vvd-color-cta-80)">
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
