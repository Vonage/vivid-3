# Date picker

The date picker component is used to select a date from a calendar.

```js
<script type="module">import '@vonage/vivid/date-picker';</script>
```

```html preview
<style>
	html {
		block-size: 460px; /* for demo purposes */
	}
</style>
<vwc-date-picker></vwc-date-picker>
```

## Members

### Label

Add a `label` attribute to add label to the text field.

In case you choose not to add a label, it is strongly recommended to add an `aria-label` attribute to the element to make it accessible.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<style>
	html {
		block-size: 460px; /* for demo purposes */
	}
</style>
<vwc-date-picker label="Start date"></vwc-date-picker>
```

### Helper text

Add the `helper-text` to add some helper text below the text field.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview
<style>
	html {
		block-size: 460px; /* for demo purposes */
	}
</style>
<vwc-date-picker
	label="Start date"
	helper-text="Select a date for the event to start"
></vwc-date-picker>
```

### Error text

It is possible to force the text field's error state by setting the `error-text` attribute to a custom error message.
Note that any current error state will be overridden by `error-text` (and, if applicable, restored once it is removed).

- Type: `string`
- Default: `undefined`

```html preview
<style>
	html {
		block-size: 460px; /* for demo purposes */
	}
</style>
<vwc-date-picker
	label="Start date"
	error-text="Please select a date for the event to start"
></vwc-date-picker>
```

### Disabled

Add the `disabled` attribute to disable the date-picker.

```html preview
<vwc-date-picker label="Start date" disabled></vwc-date-picker>
```

### Readonly

Add the `readonly` attribute to make the date-picker readonly.

```html preview
<vwc-date-picker label="Start date" readonly></vwc-date-picker>
```

### Value

The `value` attribute contains the currently selected date.

Empty string or `undefined` represent no date being selected.

It will always contain a valid date in the format `YYYY-MM-DD` when a date is selected. If the user enters an invalid date, the value will be empty string.

- Type: `string` | `undefined`
- Date format: `YYYY-MM-DD`
- Default: `undefined`

```html preview
<style>
	html {
		block-size: 460px; /* for demo purposes */
	}
</style>
<vwc-date-picker label="Start date" value="2023-01-01"></vwc-date-picker>
```

## Events

<div class="table-wrapper">

| Name   | Description                                                                                      |
| ------ | ------------------------------------------------------------------------------------------------ |
| input  | Emitted when a date is selected in the calendar or when a user is typing in the text field.      |
| change | Emitted when a date is selected in the calendar or after a user is finished typing a valid date. |

</div>
