# Date Picker

The date picker component is used to select a date from a calendar.

Dates will be stored in the format `YYYY-MM-DD` and displayed in the configured locale. See [Localization](/guides/localization/) for more details.

```js
<script type="module">import '@vonage/vivid/date-picker';</script>
```

```html preview locale-switcher 460px
<vwc-date-picker></vwc-date-picker>
```

## Members

### Label

Add a `label` attribute to add label to the date picker.

In case you choose not to add a label, it is strongly recommended to add an `aria-label` attribute to the element to make it accessible.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview locale-switcher 460px
<vwc-date-picker label="Start date"></vwc-date-picker>
```

### Helper text

Add the `helper-text` to add some helper text below the date picker. If you need to add HTML to the helper text, use the `helper-text` slot.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview locale-switcher 460px
<vwc-date-picker
	label="Start date"
	helper-text="Select a date for the event to start"
></vwc-date-picker>
```

### Error text

It is possible to force the date picker's error state by setting the `error-text` attribute to a custom error message.
Note that any current error state will be overridden by `error-text` (and, if applicable, restored once it is removed).

- Type: `string`
- Default: `undefined`

```html preview locale-switcher 460px
<vwc-date-picker
	label="Start date"
	error-text="Please select a date for the event to start"
></vwc-date-picker>
```

### Disabled

Add the `disabled` attribute to disable the date picker.

```html preview locale-switcher
<vwc-date-picker label="Start date" disabled></vwc-date-picker>
```

### Readonly

Add the `readonly` attribute to make the date picker readonly.

```html preview locale-switcher
<vwc-date-picker label="Start date" readonly></vwc-date-picker>
```

### Value

The `value` attribute contains the currently selected date.

Empty string or `undefined` represent no date being selected.

It will always contain a valid date in the format `YYYY-MM-DD` when a date is selected. If the user types an invalid date, `value` will be empty.

- Type: `string` | `undefined`
- Date format: `YYYY-MM-DD`
- Default: `undefined`

```html preview locale-switcher 460px
<vwc-date-picker label="Start date" value="2023-01-01"></vwc-date-picker>
```

### Min

Set the `min` attribute to configure the earliest date to accept. The user will be prevented from choosing an earlier date, however it is still possible to manually enter one.

- Type: `string` | `undefined`
- Date format: `YYYY-MM-DD`
- Default: `undefined`

```html preview locale-switcher 460px
<vwc-date-picker
	label="Start date"
	min="2023-06-10"
	value="2023-06-15"
></vwc-date-picker>
```

### Max

Set the `max` attribute to configure the latest date to accept. The user will be prevented from choosing an later date, however it is still possible to manually enter one.

- Type: `string` | `undefined`
- Date format: `YYYY-MM-DD`
- Default: `undefined`

```html preview locale-switcher 460px
<vwc-date-picker
	label="Start date"
	max="2023-06-20"
	value="2023-06-15"
></vwc-date-picker>
```

## Slots

### Helper-Text

The `helper-text` slot allows you to use rich content as the date picker's helper text.

```html preview locale-switcher 460px
<vwc-date-picker label="Start date">
	<span slot="helper-text">Please see our <a href="#">opening times</a>.</span>
</vwc-date-picker>
```

## Events

<div class="table-wrapper">

| Name          | Type                      | Bubbles | Composed | Description                                     |
| ------------- | ------------------------- | ------- | -------- | ----------------------------------------------- |
| `input`       | `CustomEvent<undefined>`  | Yes     | Yes      | Emitted when the date is changed by the user.   |
| `change`      | `CustomEvent<undefined>`  | Yes     | Yes      | Emitted when the date is changed by the user.   |
| `clear-click` | `CustomEvent<undefined> ` | Yes     | Yes      | Event emitted when the clear button is clicked. |

</div>

## Use cases

### In a form

```html preview locale-switcher 460px
<style>
	.buttons {
		display: flex;
		gap: 12px;
	}
</style>
<form>
	<vwc-layout column-spacing="small" column-basis="block">
		<div>
			<vwc-date-picker
				name="date"
				label="Start date"
				required
			></vwc-date-picker>
		</div>
		<div class="buttons">
			<vwc-button label="Reset" type="reset"></vwc-button>
			<vwc-button label="Submit" appearance="filled" type="submit"></vwc-button>
		</div>
	</vwc-layout>
</form>
```
