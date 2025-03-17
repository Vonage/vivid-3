# Date Time Picker

The date time picker component is used to select both date and a time.

Values will be stored in the format `YYYY-MM-DDTHH:MM:SS` and displayed in the configured locale. See [Localization](/guides/localization/) for more details.

The date time picker is a combination of the [Date Picker](/components/date-picker/) and [Time Picker](/components/time-picker/). It supports all the same attributes and slots as the date and time pickers.

```js
<script type="module">import '@vonage/vivid/date-time-picker';</script>
```

```html preview locale-switcher 460px
<vwc-date-time-picker></vwc-date-time-picker>
```

## Members

### Value

The `value` attribute contains the currently selected date and time.

Empty string or `undefined` represent no value being selected.

It will always contain a valid value in the format `YYYY-MM-DDTHH:MM:SS` when a value is selected. If the user enters an invalid value, `value` will be empty.

The date time picker is time zone agnostic. You need to ensure that `value` is interpreted correctly in your application.

- Type: `string` | `undefined`
- Date format: `YYYY-MM-DDTHH:MM:SS`
- Default: `undefined`

```html preview locale-switcher 460px
<vwc-date-time-picker
	label="Select date and time"
	value="2023-01-01T12:00:00"
></vwc-date-time-picker>
```

### Min

Set the `min` attribute to configure the earliest value to accept. The user will be prevented from choosing an earlier value, however it is still possible to manually enter one.

- Type: `string` | `undefined`
- Date format: `YYYY-MM-DDTHH:MM:SS`
- Default: `undefined`

```html preview locale-switcher 460px
<vwc-date-time-picker
	label="Select date and time"
	min="2023-06-10T09:00:00"
	value="2023-06-10T09:00:00"
	clock="24h"
></vwc-date-time-picker>
```

### Min Date

Set the `min-date` attribute to configure the earliest date to accept. The user will be prevented from choosing an earlier date, however it is still possible to manually enter one.

The `min-date` attribute will take precedence over the `min` attribute.

- Type: `string` | `undefined`
- Date format: `YYYY-MM-DD`
- Default: `undefined`

```html preview locale-switcher 460px
<vwc-date-time-picker
	label="Select date and time"
	min-date="2023-06-10"
	value="2023-06-15T12:00:00"
	clock="24h"
></vwc-date-time-picker>
```

### Min Time

Set the `min-time` attribute to configure the earliest time to accept. The user will be prevented from choosing an earlier time, however it is still possible to manually enter one.

The `min-time` attribute will take precedence over the `min` attribute.

- Type: `string` | `undefined`
- Date format: `HH:MM:SS`
- Default: `undefined`

```html preview locale-switcher 460px
<vwc-date-time-picker
	label="Select date and time"
	min-time="09:00:00"
	clock="24h"
></vwc-date-time-picker>
```

### Max

Set the `max` attribute to configure the latest value to accept. The user will be prevented from choosing a later value, however it is still possible to manually enter one.

- Type: `string` | `undefined`
- Date format: `YYYY-MM-DDTHH:MM:SS`
- Default: `undefined`

```html preview locale-switcher 460px
<vwc-date-time-picker
	label="Select date and time"
	max="2023-06-10T17:00:00"
	value="2023-06-10T12:00:00"
	clock="24h"
></vwc-date-time-picker>
```

### Max Date

Set the `max-date` attribute to configure the latest date to accept. The user will be prevented from choosing a later date, however it is still possible to manually enter one.

The `max-date` attribute will take precedence over the `max` attribute.

- Type: `string` | `undefined`
- Date format: `YYYY-MM-DD`
- Default: `undefined`

```html preview locale-switcher 460px
<vwc-date-time-picker
	label="Select date and time"
	max-date="2023-06-20"
	value="2023-06-15T12:00:00"
	clock="24h"
></vwc-date-time-picker>
```

### Max Time

Set the `max-time` attribute to configure the latest time to accept. The user will be prevented from choosing a later time, however it is still possible to manually enter one.

The `max-time` attribute will take precedence over the `max` attribute.

- Type: `string` | `undefined`
- Date format: `HH:MM:SS`
- Default: `undefined`

```html preview locale-switcher 460px
<vwc-date-time-picker
	label="Select date and time"
	max-time="17:00:00"
	clock="24h"
></vwc-date-time-picker>
```

## Events

<div class="table-wrapper">

| Name          | Type                      | Bubbles | Composed | Description                                     |
| ------------- | ------------------------- | ------- | -------- | ----------------------------------------------- |
| `input`       | `CustomEvent<undefined>`  | Yes     | Yes      | Emitted when the value is changed by the user.  |
| `change`      | `CustomEvent<undefined>`  | Yes     | Yes      | Emitted when the value is changed by the user.  |
| `clear-click` | `CustomEvent<undefined> ` | Yes     | Yes      | Event emitted when the clear button is clicked. |

</div>
