## Usage

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { registerDateRangePicker } from '@vonage/vivid';

registerDateRangePicker('your-prefix');
```

```html preview 460px
<script type="module">
	import { registerDateRangePicker } from '@vonage/vivid';
	registerDateRangePicker('your-prefix');
</script>

<your-prefix-date-range-picker label="Event duration" class="date-range-picker"></your-prefix-date-range-picker>

<script>
	document.querySelector('.date-range-picker').addEventListener('input:start', (e) => {
		console.log('start changed:', e.target.start);
	});

	document.querySelector('.date-range-picker').addEventListener('input:end', (e) => {
		console.log('end changed:', e.target.end);
	});
</script>
```

</vwc-tab-panel>
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDateRangePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateRangePicker label="Event duration" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Locales

Dates will be stored in the format `YYYY-MM-DD` and displayed in the configured locale. Use the locale switcher in the example below to see this in action.

See [Localization](/guides/localization/) for more details.

```html preview locale-switcher 460px
<vwc-date-range-picker label="Event duration"></vwc-date-range-picker>
```

## Slots

### Helper Text Slot

The `helper-text` slot allows you to use rich content as the date picker's helper text.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDateRangePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateRangePicker label="Event duration">
		<template #helper-text>
			<span>Please see our <a href="#">opening times</a>.</span>
		</template>
	</VDateRangePicker>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-range-picker label="Event duration">
	<span slot="helper-text">Please see our <a href="#">opening times</a>.</span>
</vwc-date-range-picker>
```

</vwc-tab-panel>
</vwc-tabs>

### Contextual Help

The `contextual-help` slot allows you to add the [Contextual Help](/components/contextual-help/) component next to the label.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDateRangePicker, VContextualHelp } from '@vonage/vivid-vue';
</script>

<template>
	<VDateRangePicker label="Event duration">
		<template #contextual-help>
			<VContextualHelp>Please see our opening times</VContextualHelp>
		</template>
	</VDateRangePicker>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-range-picker label="Event duration">
	<vwc-contextual-help slot="contextual-help">Please see our opening times</vwc-contextual-help>
</vwc-date-range-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Properties

<div class="table-wrapper">

| Name            | Type                               | Description                                |
| --------------- | ---------------------------------- | ------------------------------------------ |
| **disabled**    | `boolean`                          | Sets the disabled state                    |
| **end**         | `string`, date format `YYYY-MM-DD` | Sets the end date value                    |
| **error-text**  | `string`                           | Sets the error text                        |
| **helper-text** | `string`                           | Sets the helper text                       |
| **label**       | `string`                           | Sets the label text                        |
| **min**         | `string`, date format `YYYY-MM-DD` | Sets the minimum date that can be selected |
| **max**         | `string`, date format `YYYY-MM-DD` | Sets the maximum date that can be selected |
| **readonly**    | `boolean`                          | Sets the field to be readonly              |
| **required**    | `boolean`                          | Sets the field to be required              |
| **start**       | `string`, date format `YYYY-MM-DD` | Sets the start date value                  |

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

| Name            | Type                      | Bubbles | Composed | Description                                        |
| --------------- | ------------------------- | ------- | -------- | -------------------------------------------------- |
| **input:start** | `CustomEvent<undefined>`  | Yes     | Yes      | Event emitted when the start value changes         |
| **input:end**   | `CustomEvent<undefined>`  | Yes     | Yes      | Event emitted when the end value changes           |
| **clear-click** | `CustomEvent<undefined> ` | Yes     | Yes      | Event emitted when the clear button is clicked.    |
| **input**       | `CustomEvent<undefined> ` | Yes     | Yes      | Emitted when either the start or end value changes |
| **change**      | `CustomEvent<undefined> ` | Yes     | Yes      | Emitted when either the start or end value changes |

</div>
