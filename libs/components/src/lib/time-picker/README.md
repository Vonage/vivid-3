# Time Picker

The time picker is used to select a time.

Time will be stored in the format `HH:MM:SS` and displayed depending on the configured locale. See [Localization](/getting-started/localization) for more details.

```js
<script type="module">import '@vonage/vivid/time-picker';</script>
```

```html preview locale-switcher
<style>
	html {
		height: 360px;
	}
</style>
<vwc-time-picker minutes-step="15" label="Choose a time"></vwc-time-picker>
```

## Members

### Label

Add a `label` attribute to add label to the time picker.

In case you choose not to add a label, it is strongly recommended to add an `aria-label` attribute to the element to make it accessible.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview locale-switcher
<style>
	html {
		block-size: 360px; /* for demo purposes */
	}
</style>
<vwc-time-picker label="Start time"></vwc-time-picker>
```

### Helper text

Add the `helper-text` to add some helper text below the time picker.

- Type: `string` | `undefined`
- Default: `undefined`

```html preview locale-switcher
<style>
	html {
		block-size: 360px; /* for demo purposes */
	}
</style>
<vwc-time-picker
	label="Start time"
	helper-text="Select a time for the event to start"
></vwc-time-picker>
```

### Error text

It is possible to force the time picker's error state by setting the `error-text` attribute to a custom error message.
Note that any current error state will be overridden by `error-text` (and, if applicable, restored once it is removed).

- Type: `string`
- Default: `undefined`

```html preview locale-switcher
<style>
	html {
		block-size: 360px; /* for demo purposes */
	}
</style>
<vwc-time-picker
	label="Start time"
	error-text="Please select a time for the event to start"
></vwc-time-picker>
```

### Disabled

Add the `disabled` attribute to disable the time picker.

```html preview locale-switcher
<vwc-time-picker label="Start time" disabled></vwc-time-picker>
```

### Readonly

Add the `readonly` attribute to make the time picker readonly.

```html preview locale-switcher
<vwc-time-picker label="Start time" readonly></vwc-time-picker>
```

### Value

The `value` attribute contains the currently selected time.

Empty string or `undefined` represent no time being selected.

It will always contain a valid time in the format `HH:MM:SS` when a time is selected. If the user types an invalid time, `value` will be empty.

- Type: `string` | `undefined`
- Time format: `HH:MM:SS`
- Default: `undefined`

```html preview locale-switcher
<style>
	html {
		block-size: 360px; /* for demo purposes */
	}
</style>
<vwc-time-picker label="Start time" value="12:30:00"></vwc-time-picker>
```

### Min

Set the `min` attribute to configure the earliest time to accept. The user will be prevented from choosing an earlier time, however it is still possible to manually enter one.

- Type: `string` | `undefined`
- Time format: `HH:MM:SS`
- Default: `undefined`

```html preview locale-switcher
<style>
	html {
		block-size: 360px; /* for demo purposes */
	}
</style>
<vwc-time-picker
	label="Start time"
	min="10:00:00"
></vwc-time-picker>
```

### Max

Set the `max` attribute to configure the latest time to accept. The user will be prevented from choosing a later time, however it is still possible to manually enter one.

- Type: `string` | `undefined`
- Time format: `HH:MM:SS`
- Default: `undefined`

```html preview locale-switcher
<style>
	html {
		block-size: 360px; /* for demo purposes */
	}
</style>
<vwc-time-picker
	label="Start time"
	max="10:00:00"
></vwc-time-picker>
```

### Clock

The time picker will display the time in 12h or 24h format depending on the configured locale.

Use the `clock` attribute to override this behavior.

- Type: `'12h'` | `'24h'` | `undefined`
- Default: locale dependent

```html preview locale-switcher
<style>
	html {
		block-size: 360px; /* for demo purposes */
	}
</style>
<vwc-time-picker
	label="Start time"
	clock="24h"
></vwc-time-picker>
```

### Minutes step

Use the `minutes-step` attribute to configure the step between minutes in the time picker.

- Type: `number`
- Default: `1`

```html preview locale-switcher
<style>
	html {
		block-size: 360px; /* for demo purposes */
	}
</style>
<vwc-time-picker
	label="Start time"
	minutes-step="15"
></vwc-time-picker>
```

### Seconds step

Use the `seconds-step` attribute to configure the step between seconds in the time picker.

If not set, the time picker will not display seconds.

- Type: `number` | `undefined`
- Default: `undefined`

```html preview locale-switcher
<style>
	html {
		block-size: 360px; /* for demo purposes */
	}
</style>
<vwc-time-picker
	label="Start time"
	seconds-step="5"
></vwc-time-picker>
```

## Events

<div class="table-wrapper">

| Name   | Description                                   |
|--------|-----------------------------------------------|
| input  | Emitted when the time is changed by the user. |
| change | Emitted when the time is changed by the user. |
| focus  | Emitted when the component receives focus.    |
| blur   | Emitted when the component loses focus.       |

</div>

## Use Cases

### In a form

```html preview locale-switcher
<style>
	html {
		block-size: 360px; /* for demo purposes */
	}
	.buttons {
		display: flex;
		gap: 12px;
	}
</style>
<form>
	<vwc-layout column-spacing="small" column-basis="block">
		<div>
			<vwc-time-picker name="time" label="Start time" required></vwc-time-picker>
		</div>
		<div class="buttons">
			<vwc-button label="Reset" type="reset"></vwc-button>
			<vwc-button label="Submit" appearance="filled" type="submit"></vwc-button>
		</div>
	</vwc-layout>
</form>
```