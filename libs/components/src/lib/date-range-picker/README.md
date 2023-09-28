# Date range picker

The date range picker component is a text input with a calendar overlay. It allows the user to select a date range.

Place `vwc-value` child elements with a key of `start` end `end` inside to hold the start and end date values.

The date picker is localized to the current locale. See [Localization](/getting-started/localization) for more details.

```js
<script type="module">import '@vonage/vivid/date-range-picker';</script>
```

```html preview locale-switcher
<style>
	html {
		block-size: 460px; /* for demo purposes */
	}
</style>
<vwc-date-range-picker label="Date range">
	<vwc-value key="start"></vwc-value>
	<vwc-value key="end"></vwc-value>
</vwc-date-range-picker>
```

## Members

### Label

Add a `label` attribute to add label to the date range picker.

In case you choose not to add a label, it is strongly recommended to add an `aria-label` attribute to the element to make it accessible.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview locale-switcher
<style>
	html {
		block-size: 460px; /* for demo purposes */
	}
</style>
<vwc-date-range-picker label="Date range"></vwc-date-range-picker>
```

### Helper text

Add the `helper-text` to add some helper text below the date range picker.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview locale-switcher
<style>
	html {
		block-size: 460px; /* for demo purposes */
	}
</style>
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

```html preview locale-switcher
<style>
	html {
		block-size: 460px; /* for demo purposes */
	}
</style>
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

### Min

Set the `min` attribute to configure the earliest date to accept. The user will be prevented from choosing an earlier date, however it is still possible to manually enter one.

- Type: `string` | `undefined`
- Date format: `YYYY-MM-DD`
- Default: `undefined`

```html preview locale-switcher
<style>
	html {
		block-size: 460px; /* for demo purposes */
	}
</style>
<vwc-date-range-picker label="Start date" min="2023-06-10">
	<vwc-value key="start" value="2023-06-15"></vwc-value>
	<vwc-value key="end" value="2023-06-20"></vwc-value>
</vwc-date-range-picker>
```

### Max

Set the `max` attribute to configure the latest date to accept. The user will be prevented from choosing an later date, however it is still possible to manually enter one.

- Type: `string` | `undefined`
- Date format: `YYYY-MM-DD`
- Default: `undefined`

```html preview locale-switcher
<style>
	html {
		block-size: 460px; /* for demo purposes */
	}
</style>
<vwc-date-range-picker label="Start date" max="2023-06-20">
	<vwc-value key="start" value="2023-06-10"></vwc-value>
	<vwc-value key="end" value="2023-06-15"></vwc-value>
</vwc-date-range-picker>
```

## Slots

### Default

Place `vwc-value` elements inside the default slot to hold the start and end values. These elements must have a `key` attribute of `start` or `end` to indicate which value they hold.

```html preview locale-switcher
<style>
	html {
		block-size: 460px; /* for demo purposes */
	}
</style>
<vwc-date-range-picker>
	<vwc-value key="start" value="2020-02-02"></vwc-value>
	<vwc-value key="end" value="2020-02-03"></vwc-value>
</vwc-date-range-picker>
<script>
	document
		.querySelector('vwc-value[key="start"]')
		.addEventListener('input', (event) => {
			console.log('start value changed', event.target.value);
		});
	document
		.querySelector('vwc-value[key="end"]')
		.addEventListener('input', (event) => {
			console.log('end value changed', event.target.value);
		});
</script>
```

#### vwc-value properties

<div class="table-wrapper">

| Name  | Type                 | Description                                                |
| ----- | -------------------- | ---------------------------------------------------------- |
| key   | `'start'` or `'end'` | Indicates whether the element holds the start or end date. |
| value | `YYYY-MM-DD` or `''` | The selected start or end date.                            |

</div>

#### vwc-value events

<div class="table-wrapper">

| Name   | Description                     |
| ------ | ------------------------------- |
| input  | Emitted when the value changes. |
| change | Emitted when the value changes. |

</div>

## Events

<div class="table-wrapper">

| Name  | Description                                |
| ----- | ------------------------------------------ |
| focus | Emitted when the component receives focus. |
| blur  | Emitted when the component loses focus.    |

</div>

## Use Cases

### In a form

```html preview locale-switcher
<style>
	html {
		block-size: 460px; /* for demo purposes */
	}
	.buttons {
		display: flex;
		gap: 12px;
	}
</style>
<form>
	<vwc-layout column-spacing="small" column-basis="block">
		<div>
			<vwc-date-range-picker label="Date range picker" required>
				<vwc-value key="start" name="start-date"></vwc-value>
				<vwc-value key="end" name="end-date"></vwc-value>
			</vwc-date-range-picker>
		</div>
		<div class="buttons">
			<vwc-button label="Reset" type="reset"></vwc-button>
			<vwc-button label="Submit" appearance="filled" type="submit"></vwc-button>
		</div>
	</vwc-layout>
</form>
```
