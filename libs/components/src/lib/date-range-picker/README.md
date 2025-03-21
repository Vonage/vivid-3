# Date Range Picker

The date range picker component is a text input with a calendar overlay. It allows the user to select a date range.

The date picker is localized to the current locale. See [Localization](/guides/localization/) for more details.

```js
<script type="module">import '@vonage/vivid/date-range-picker';</script>
```

```html preview locale-switcher 460px
<vwc-date-range-picker
	label="Date range"
	start="2023-06-10"
	end="2023-06-15"
></vwc-date-range-picker>
<script>
	document
		.querySelector('vwc-date-range-picker')
		.addEventListener('input:start', (e) => {
			console.log('start changed:', e.currentTarget.start);
		});

	document
		.querySelector('vwc-date-range-picker')
		.addEventListener('input:end', (e) => {
			console.log('end changed:', e.currentTarget.end);
		});
</script>
```

## Members

### Label

Add a `label` attribute to add label to the date range picker.

In case you choose not to add a label, it is strongly recommended to add an `aria-label` attribute to the element to make it accessible.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview locale-switcher 460px
<vwc-date-range-picker label="Date range"></vwc-date-range-picker>
```

### Helper text

Add the `helper-text` to add some helper text below the date range picker. If you need to add HTML to the helper text, use the `helper-text` slot.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview locale-switcher 460px
<vwc-date-range-picker
	label="Date range"
	helper-text="Select a date range for the event"
></vwc-date-range-picker>
```

### Error text

It is possible to force the date range picker's error state by setting the `error-text` attribute to a custom error message.
Note that any current error state will be overridden by `error-text` (and, if applicable, restored once it is removed).

- Type: `string`
- Default: `undefined`

```html preview locale-switcher 460px
<vwc-date-range-picker
	label="Date range"
	error-text="Please select a valid date range"
></vwc-date-range-picker>
```

### Disabled

Add the `disabled` attribute to disable the date range picker.

```html preview locale-switcher
<vwc-date-range-picker label="Date range" disabled></vwc-date-range-picker>
```

### Readonly

Add the `readonly` attribute to make the date range picker readonly.

```html preview locale-switcher
<vwc-date-range-picker label="Date range" readonly></vwc-date-range-picker>
```

### Start

The `start` member will hold the start date of the date range. An empty string or `undefined` represent no date being selected.

- Type: `string` | `undefined`
- Date format: `YYYY-MM-DD`
- Default: `undefined`

```html preview locale-switcher 460px
<vwc-date-range-picker
	label="Date range"
	start="2023-06-15"
></vwc-date-range-picker>
```

### End

The `end` member will hold the end date of the date range. An empty string or `undefined` represent no date being selected.

- Type: `string` | `undefined`
- Date format: `YYYY-MM-DD`
- Default: `undefined`

```html preview locale-switcher 460px
<vwc-date-range-picker
	label="Date range"
	end="2023-06-15"
></vwc-date-range-picker>
```

### Min

Set the `min` attribute to configure the earliest date to accept. The user will be prevented from choosing an earlier date, however it is still possible to manually enter one.

- Type: `string` | `undefined`
- Date format: `YYYY-MM-DD`
- Default: `undefined`

```html preview locale-switcher 460px
<vwc-date-range-picker
	label="Date range"
	min="2023-06-10"
	start="2023-06-15"
	end="2023-06-20"
></vwc-date-range-picker>
```

### Max

Set the `max` attribute to configure the latest date to accept. The user will be prevented from choosing an later date, however it is still possible to manually enter one.

- Type: `string` | `undefined`
- Date format: `YYYY-MM-DD`
- Default: `undefined`

```html preview locale-switcher 460px
<vwc-date-range-picker
	label="Date range"
	max="2023-06-20"
	start="2023-06-10"
	end="2023-06-15"
></vwc-date-range-picker>
```

## Slots

### Helper-Text

The `helper-text` slot allows you to use rich content as the date range picker's helper text.

```html preview locale-switcher 460px
<vwc-date-range-picker label="Date range">
	<span slot="helper-text">Please see our <a href="#">opening times</a>.</span>
</vwc-date-range-picker>
```

## Events

<div class="table-wrapper">

| Name          | Type                      | Bubbles | Composed | Description                                        |
| ------------- | ------------------------- | ------- | -------- | -------------------------------------------------- |
| `input:start` | `CustomEvent<undefined>`  | Yes     | Yes      | Event emitted when the start value changes         |
| `input:end`   | `CustomEvent<undefined>`  | Yes     | Yes      | Event emitted when the end value changes           |
| `clear-click` | `CustomEvent<undefined> ` | Yes     | Yes      | Event emitted when the clear button is clicked.    |
| `input`       | `CustomEvent<undefined> ` | Yes     | Yes      | Emitted when either the start or end value changes |
| `change`      | `CustomEvent<undefined> ` | Yes     | Yes      | Emitted when either the start or end value changes |

</div>

## Use Cases

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
			<vwc-date-range-picker
				name="date"
				label="Date range"
				required
			></vwc-date-range-picker>
		</div>
		<div class="buttons">
			<vwc-button label="Reset" type="reset"></vwc-button>
			<vwc-button label="Submit" appearance="filled" type="submit"></vwc-button>
		</div>
	</vwc-layout>
</form>
```
