## Usage

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { registerDateTimePicker } from '@vonage/vivid';

registerDateTimePicker('your-prefix');
```

```html preview 460px
<script type="module">
	import { registerDateTimePicker } from '@vonage/vivid';
	registerDateTimePicker('your-prefix');
</script>

<your-prefix-date-time-picker
	label="Start date and time"
></your-prefix-date-time-picker>
```

</vwc-tab-panel>
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDateTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateTimePicker label="Start date and time" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Locales

Values will be stored in the format `YYYY-MM-DDTHH:MM:SS` and displayed in the configured locale. Use the locale switcher in the example below to see this in action.

See [Localization](/guides/localization/) for more details.

```html preview locale-switcher 460px
<vwc-date-time-picker label="Start date and time"></vwc-date-time-picker>
```

## Slots

### Helper Text Slot

The `helper-text` slot allows you to use rich content as the date picker's helper text.

```html preview 460px
<vwc-date-time-picker label="Start date and time">
	<span slot="helper-text">Please see our <a href="#">opening times</a>.</span>
</vwc-date-time-picker>
```

### Contextual Help

The `contextual-help` slot allows you to add the [Contextual Help](/components/contextual-help/) component next to the label.

```html preview 460px
<vwc-date-time-picker label="Start date and time">
	<vwc-contextual-help slot="contextual-help"
		>Please see our opening times</vwc-contextual-help
	>
</vwc-date-time-picker>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name             | Type                                        | Description                                                      |
| ---------------- | ------------------------------------------- | ---------------------------------------------------------------- |
| **clock**        | enum: `12h`, `24hr`                         | Sets time display format                                         |
| **disabled**     | `boolean`                                   | Sets the disabled state                                          |
| **error-text**   | `string`                                    | Sets the error text                                              |
| **helper-text**  | `string`                                    | Sets the helper text                                             |
| **label**        | `string`                                    | Sets the label text                                              |
| **min**          | `string`, date format `YYYY-MM-DDTHH:MM:SS` | Sets the minimum date and time that can be selected              |
| **min-date**     | `string`, date format `YYYY-MM-DD`          | Sets the minimum date that can be selected                       |
| **min-time**     | `string`, time format `HH:MM:SS`            | Sets the minimum time that can be selected                       |
| **minutes-step** | `number`                                    | Sets the step between minites                                    |
| **max**          | `string`, date format `YYYY-MM-DDTHH:MM:SS` | Sets the maximum date and time that can be selected              |
| **max-date**     | `string`, date format `YYYY-MM-DD`          | Sets the maximum date that can be selected                       |
| **max-time**     | `string`, time format `HH:MM:SS`            | Sets the maximum time that can be selected                       |
| **readonly**     | `boolean`                                   | Sets the field to be readonly                                    |
| **required**     | `boolean`                                   | Sets the field to be required                                    |
| **seconds-step** | `number`                                    | Sets the step between (and activates) seconds in the time picker |
| **value**        | `string`, date format `YYYY-MM-DDTHH:MM:SS` | Sets the current date and time value                             |

</div>

### Slots

<div class="table-wrapper">

| Name                | Description                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **helper-text**     | Add rich text for as field's helper text                                                                           |
| **contextual-help** | Allows you to add the [Contextual Help](/components/contextual-help/) component to be displayed next to the label. |

</div>

### Events

<div class="table-wrapper">

| Name            | Type                      | Bubbles | Composed | Description                                     |
| --------------- | ------------------------- | ------- | -------- | ----------------------------------------------- |
| **input**       | `CustomEvent<undefined>`  | Yes     | Yes      | Emitted when the value is changed by the user.  |
| **change**      | `CustomEvent<undefined>`  | Yes     | Yes      | Emitted when the value is changed by the user.  |
| **clear-click** | `CustomEvent<undefined> ` | Yes     | Yes      | Event emitted when the clear button is clicked. |

</div>
