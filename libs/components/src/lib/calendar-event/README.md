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
  <vwc-calendar-event heading="Summer pool party" slot="day-0"></vwc-calendar-event>
</vwc-calendar>
```

### Description

Sets the description of the event.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-calendar>
  <vwc-calendar-event description="A party in which guests swim in a swimming pool" slot="day-0"></vwc-calendar-event>
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

### Appearance

Set the `appearance` attribute to change the calendar event's appearance.

- Type: `'filled'` | `'subtle'`
- Default: `'filled'`

```html preview
<vwc-calendar>
  <vwc-calendar-event appearance="filled" heading="filled" slot="day-0"></vwc-calendar-event>
  <vwc-calendar-event appearance="subtle" heading="subtle" slot="day-1"></vwc-calendar-event>
</vwc-calendar>
```

### Connotation

Set the `connotation` attribute to change the calendar event's connotation.
It accepts a subset of predefined values.

- Type: `'accent'` | `'cta'` | `'success'` | `'alert'` | `'warning'` | `'info'` | `'announcement'`
- Default: `'info'`

#### Filled calendar event with connotation

```html preview
<vwc-calendar>
  <vwc-calendar-event connotation="accent" appearance="filled" heading="accent" slot="day-0"></vwc-calendar-event>
  <vwc-calendar-event connotation="cta" appearance="filled" heading="cta" slot="day-1"></vwc-calendar-event>
  <vwc-calendar-event connotation="success" appearance="filled" heading="success" slot="day-2"></vwc-calendar-event>
  <vwc-calendar-event connotation="alert" appearance="filled" heading="alert" slot="day-3"></vwc-calendar-event>
  <vwc-calendar-event connotation="warning" appearance="filled" heading="warning" slot="day-4"></vwc-calendar-event>
  <vwc-calendar-event connotation="info" appearance="filled" heading="info" slot="day-5"></vwc-calendar-event>
  <vwc-calendar-event connotation="announcement" appearance="filled" heading="announcement" slot="day-6"></vwc-calendar-event>
</vwc-calendar>
```

#### Subtle calendar event with connotation

```html preview
<vwc-calendar>
  <vwc-calendar-event connotation="accent" appearance="subtle" heading="accent" slot="day-0"></vwc-calendar-event>
  <vwc-calendar-event connotation="cta" appearance="subtle" heading="cta" slot="day-1"></vwc-calendar-event>
  <vwc-calendar-event connotation="success" appearance="subtle" heading="success" slot="day-2"></vwc-calendar-event>
  <vwc-calendar-event connotation="alert" appearance="subtle" heading="alert" slot="day-3"></vwc-calendar-event>
  <vwc-calendar-event connotation="warning" appearance="subtle" heading="warning" slot="day-4"></vwc-calendar-event>
  <vwc-calendar-event connotation="info" appearance="subtle" heading="info" slot="day-5"></vwc-calendar-event>
  <vwc-calendar-event connotation="announcement" appearance="subtle" heading="announcement" slot="day-6"></vwc-calendar-event>
</vwc-calendar>
```
