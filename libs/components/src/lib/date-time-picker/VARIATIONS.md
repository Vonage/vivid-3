## Labelling

### Label Text

The `label` attribute provides a short description of the purpose of the Date Picker.

<vwc-note connotation="information" icon="accessibility-line" headline="Accessibility Tip">

If a visible label can't be used, provide one using the <nobr><code>aria-label</code></nobr> attribute. This ensures screen readers announce the purpose of the element, making it accessible to all users.
</vwc-note>

```html preview 460px
<vwc-date-time-picker label="Start date and time"></vwc-date-time-picker>
```

### Helper Text

The `helper-text` attribute provides additional information to help the user enter the correct information.

To add HTML to the helper text, use the [helper-text slot](/components/date-time-picker/code/#helper-text-slot).

```html preview 460px
<vwc-date-time-picker
	helper-text="Select a date and time for the event to start"
	label="Start date and time"
></vwc-date-time-picker>
```

## Validation Feedback

### Error Text

The `error-text` attribute provides a custom error message. Any current error state will be overridden by `error-text`.

```html preview 460px
<vwc-date-time-picker
	error-text="Please select a date and time for the event to start"
	label="Start date and time"
></vwc-date-time-picker>
```

## Value

The `value` attribute contains the currently selected date and time.

Empty string or `undefined` represent no value being selected.

It will always contain a valid value in the format `YYYY-MM-DDTHH:MM:SS` when a value is selected. If the user enters an invalid value, value will be empty.

The Date Time Picker is time zone agnostic. You need to ensure that `value` is interpreted correctly in your application.

```html preview 460px
<vwc-date-time-picker
	value="2023-01-01T12:00:00"
	label="Select date and time"
></vwc-date-time-picker>
```

## Min

Set the `min` attribute to configure the earliest value to accept. The user will be prevented from choosing an earlier value, however it is still possible to manually enter one.

```html preview 460px
<vwc-date-time-picker
	min="2023-06-10T09:00:00"
	label="Select date and time"
	value="2023-06-10T09:00:00"
	clock="24h"
></vwc-date-time-picker>
```

## Min Date

Set the `min-date` attribute to configure the earliest date to accept. The user will be prevented from choosing an earlier date, however it is still possible to manually enter one.

The `min-date` attribute will take precedence over the `min` attribute.

```html preview 460px
<vwc-date-time-picker
	min-date="2023-06-10"
	label="Select date and time"
	value="2023-06-15T12:00:00"
	clock="24h"
></vwc-date-time-picker>
```

## Min Time

Set the `min-time` attribute to configure the earliest time to accept. The user will be prevented from choosing an earlier time, however it is still possible to manually enter one.

The `min-time` attribute will take precedence over the min attribute.

```html preview 460px
<vwc-date-time-picker
	min-time="09:00:00"
	label="Select date and time"
	clock="24h"
></vwc-date-time-picker>
```

## Max

Set the `max` attribute to configure the latest date to accept. The user will be prevented from choosing an later date, however it is still possible to manually enter one.

```html preview 460px
<vwc-date-time-picker
	max="2023-06-10T17:00:00"
	label="Select date and time"
	value="2023-06-10T12:00:00"
	clock="24h"
></vwc-date-time-picker>
```

## Max Date

Set the `max-date` attribute to configure the latest date to accept. The user will be prevented from choosing a later date, however it is still possible to manually enter one.

The `max-date` attribute will take precedence over the `max` attribute.

```html preview 460px
<vwc-date-time-picker
	max-date="2023-06-20"
	label="Select date and time"
	value="2023-06-15T12:00:00"
	clock="24h"
></vwc-date-time-picker>
```

## Max Time

Set the `max-time` attribute to configure the latest time to accept. The user will be prevented from choosing a later time, however it is still possible to manually enter one.

The `max-time` attribute will take precedence over the `max` attribute.

```html preview 460px
<vwc-date-time-picker
	max-time="17:00:00"
	label="Select date and time"
	clock="24h"
></vwc-date-time-picker>
```

## Clock

The Date Time Picker will display the time in 12h or 24h format depending on the [configured locale](/components/date-time-picker/code/#locales).

Use the `clock` attribute to override this behavior.

```html preview 460px
<vwc-date-time-picker
	clock="24h"
	label="Select date and time"
></vwc-date-time-picker>
```

## Minutes Step

Use the `minutes-step` attribute to configure the step between minutes in the Date Time Picker.

```html preview 460px
<vwc-date-time-picker
	minutes-step="15"
	label="Select date and time"
></vwc-date-time-picker>
```

## Seconds Step

Use the `seconds-step` attribute to configure the step between seconds in the Date Time Picker.

<vwc-note icon="info-line" connotation="information">

If not set, the Date Time Picker will not display seconds.

</vwc-note>

```html preview 460px
<vwc-date-time-picker
	seconds-step="15"
	label="Select date and time"
></vwc-date-time-picker>
```

## Disabled

Add the `disabled` attribute to disable the Date Time Picker.

```html preview
<vwc-date-time-picker
	disabled
	label="Start date and time"
></vwc-date-time-picker>
```

## Readonly

Add the `readonly` attribute to make the Date Time Picker readonly.

```html preview
<vwc-date-time-picker
	readonly
	label="Start date and time"
></vwc-date-time-picker>
```
