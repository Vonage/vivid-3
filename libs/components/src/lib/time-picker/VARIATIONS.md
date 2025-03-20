## Labelling

### Label Text

The `label` attribute provides a short description of the purpose of the Time Picker.

```html preview 360px
<vwc-time-picker label="Start time"></vwc-time-picker>
```

<vwc-note connotation="information" icon="info-line" headline="Accessibility note">
	<p>If you can not use the visible <code>label</code>, provide it using the <code>aria-label</code> attribute.</p>
	<p>It will be announced by screen readers so that those users will know the purpose of the Time Picker.</p>
</vwc-note>

### Helper Text

The `helper-text` attribute provides additional information to help the user enter the correct information.

To add HTML to the helper text, use the [helper-text slot](/components/time-picker/code/#helper-text-slot).

```html preview 360px
<vwc-time-picker
	label="Start time"
	helper-text="Select a time for the event to start"
></vwc-time-picker>
```

## Value

The `value` attribute contains the currently selected time.

Empty string or `undefined` represent no time being selected.

It will always contain a valid time in the format `HH:MM:SS` when a time is selected. If the user types an invalid time, `value` will be empty.

```html preview 360px
<vwc-time-picker label="Start time" value="12:30:00"></vwc-time-picker>
```

## Validation Feedback

### Error Text

The `error-text` attribute provides a custom error message. Any current error state will be overridden by `error-text`.

```html preview 360px
<vwc-time-picker
	error-text="Please select a time for the event to start"
	label="Start time"
></vwc-time-picker>
```

## Clock

The Time Picker will display the time in 12h or 24h format depending on the configured locale.

Use the `clock` attribute to override this behavior.

```html preview 360px
<vwc-time-picker label="Start time" clock="24h"></vwc-time-picker>
```

## Disabled

The `disabled` attribute disables the Time Picker input element.

```html preview
<vwc-time-picker label="Start time" disabled></vwc-time-picker>
```

## Read Only

The `readonly` attribute prevents the user from changing the Time Picker input element value.

```html preview 
<vwc-time-picker label="Start time" readonly></vwc-time-picker>
```
