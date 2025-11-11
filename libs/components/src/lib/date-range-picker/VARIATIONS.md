## Labelling

### Label Text

The `label` attribute provides a short description of the purpose of the Date Picker.

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
<p>If a visible label can't be used, provide one using the <nobr><code>aria-label</code></nobr> attribute. This ensures screen readers announce the purpose of the element, making it accessible to all users.</p>
</vwc-note>

```html preview 600px
<vwc-date-range-picker label="Event duration"></vwc-date-range-picker>
```

### Helper Text

The `helper-text` attribute provides additional information to help the user enter the correct information.

To add HTML to the helper text, use the [helper-text slot](/components/date-range-picker/code/#helper-text-slot).

```html preview 460px
<vwc-date-range-picker helper-text="Select a date for the event to start" label="Event duration"></vwc-date-range-picker>
```

### Contextual Help

You can add the [Contextual Help](/components/contextual-help/) component using the `contextual-help` slot. It will be displayed next to the label, providing users additional information.

```html preview 460px
<vwc-date-range-picker label="Event duration">
	<vwc-contextual-help slot="contextual-help">Select a date for the event to start</vwc-contextual-help>
</vwc-date-range-picker>
```

## Validation Feedback

### Error Text

The `error-text` attribute provides a custom error message. Any current error state will be overridden by `error-text`.

```html preview 460px
<vwc-date-range-picker error-text="Please select dates for the event to start and end" label="Event duration"></vwc-date-range-picker>
```

## Start and End Values

Use the `start` and `end` attributes to define the date range. If either attribute is set to an empty string or `undefined`, no date is selected.

When a date is chosen, these attributes always contain a valid date in the `YYYY-MM-DD` format. If the user enters an invalid date, an error message is displayed.

```html preview 460px
<vwc-date-range-picker start="2023-06-15" end="2023-06-30" label="Event duration"></vwc-date-range-picker>
```

## Min

Set the `min` attribute to configure the earliest date to accept. The user will be prevented from choosing an earlier date, however it is still possible to manually enter one.

```html preview 460px
<vwc-date-range-picker min="2023-06-10" label="Date range" start="2023-06-15" end="2023-06-20"></vwc-date-range-picker>
```

## Max

Set the `max` attribute to configure the latest date to accept. The user will be prevented from choosing an later date, however it is still possible to manually enter one.

```html preview 460px
<vwc-date-range-picker max="2023-06-20" label="Date range" start="2023-06-10" end="2023-06-15"></vwc-date-range-picker>
```

## Disabled

Add the `disabled` attribute to disable the Date Range Picker.

```html preview
<vwc-date-range-picker disabled label="Date range"></vwc-date-range-picker>
```

## Readonly

Add the `readonly` attribute to make the Date Range Picker readonly.

```html preview
<vwc-date-range-picker readonly label="Date range"></vwc-date-range-picker>
```
