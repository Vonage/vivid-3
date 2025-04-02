## Labelling

### Label Text

The `label` attribute provides a short description of the purpose of the Date Picker.

```html preview 460px
<vwc-date-picker label="Start date"></vwc-date-picker>
```

<vwc-note connotation="information" icon="info-line" headline="Accessibility note">
	<p>If you can not use the visible <code>label</code>, provide it using the <code>aria-label</code> attribute.</p>
	<p>It will be announced by screen readers so that those users will know the purpose of the Date Picker.</p>
</vwc-note>

### Helper Text

The `helper-text` attribute provides additional information to help the user enter the correct information.

To add HTML to the helper text, use the [helper-text slot](/components/date-picker/code/#helper-text-slot).

```html preview 460px
<vwc-date-picker
	helper-text="Select a date for the event to start"
	label="Start date"
></vwc-date-picker>
```

## Validation Feedback

### Error Text

The `error-text` attribute provides a custom error message. Any current error state will be overridden by `error-text`.

```html preview 460px
<vwc-date-picker
	error-text="Please select a date for the event to start"
	label="Start date"
></vwc-date-picker>
```

## Value

The `value` attribute contains the currently selected date.

Empty string or `undefined` represent no date being selected.

It will always contain a valid date in the format `YYYY-MM-DD` when a date is selected. If the user types an invalid date, `value` will be empty.

```html preview 460px
<vwc-date-picker value="2023-01-01" label="Start date"></vwc-date-picker>
```

## Min

Set the `min` attribute to configure the earliest date to accept. The user will be prevented from choosing an earlier date, however it is still possible to manually enter one.

```html preview 460px
<vwc-date-picker
	min="2023-06-10"
	label="Start date"
	value="2023-06-15"
></vwc-date-picker>
```

## Max

Set the `max` attribute to configure the latest date to accept. The user will be prevented from choosing an later date, however it is still possible to manually enter one.

```html preview 460px
<vwc-date-picker
	max="2023-06-20"
	label="Start date"
	value="2023-06-15"
></vwc-date-picker>
```

## Disabled

Add the `disabled` attribute to disable the date picker.

```html preview
<vwc-date-picker disabled label="Start date"></vwc-date-picker>
```

## Readonly

Add the `readonly` attribute to make the date picker readonly.

```html preview
<vwc-date-picker readonly label="Start date"></vwc-date-picker>
```
