## Labelling

### Label Text

The `label` attribute provides a short description of the purpose of the Time Picker.

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
<p>If a visible label can't be used, provide one using the <nobr><code>aria-label</code></nobr> attribute. This ensures screen readers announce the purpose of the element, making it accessible to all users.</p>
</vwc-note>

```html preview 360px
<vwc-time-picker label="Start time"></vwc-time-picker>
```

### Helper Text

The `helper-text` attribute provides additional information to help the user enter the correct information.

To add HTML to the helper text, use the [helper-text slot](/components/time-picker/code/#helper-text-slot).

```html preview 360px
<vwc-time-picker label="Start time" helper-text="Select a time for the event to start"></vwc-time-picker>
```

### Contextual Help

You can add the [Contextual Help](/components/contextual-help/) component using the `contextual-help` slot. It will be displayed next to the label, providing users additional information.

```html preview 360px
<vwc-time-picker label="Start time">
	<vwc-contextual-help slot="contextual-help">Select a time for the event to start</vwc-contextual-help>
</vwc-time-picker>
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
<vwc-time-picker error-text="Please select a time for the event to start" label="Start time"></vwc-time-picker>
```

## Clock

The Time Picker will display the time in 12h or 24h format depending on the [configured locale](/components/time-picker/code/#locales).

Use the `clock` attribute to override this behavior.

```html preview 360px
<vwc-time-picker label="Start time" clock="24h"></vwc-time-picker>
```

## Minutes Step

Use the `minutes-step` attribute to configure the step between minutes in the Time Picker.

```html preview 360px
<vwc-time-picker minutes-step="15" label="Start time"></vwc-time-picker>
```

## Seconds Step

Use the `seconds-step` attribute to configure the step between seconds in the Time Picker.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>

If not set, the Time Picker will not display seconds.

</vwc-note>

```html preview 360px
<vwc-time-picker seconds-step="5" label="Start time"></vwc-time-picker>
```

## Min

Set the `min` attribute to configure the earliest time to accept. The user will be prevented from choosing an earlier time, however it is still possible to manually enter one.

```html preview 360px
<vwc-time-picker label="Start time" min="10:00:00"></vwc-time-picker>
```

## Max

Set the `max` attribute to configure the latest time to accept. The user will be prevented from choosing a later time, however it is still possible to manually enter one.

```html preview 360px
<vwc-time-picker label="Start time" max="10:00:00"></vwc-time-picker>
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
