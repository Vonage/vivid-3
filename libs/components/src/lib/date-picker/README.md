## Usage

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { registerDatePicker } from '@vonage/vivid';

registerDatePicker('your-prefix');
```

```html preview 460px
<script type="module">
	import { registerDatePicker } from '@vonage/vivid';
	registerDatePicker('your-prefix');
</script>

<your-prefix-date-picker label="Start date"></your-prefix-date-picker>
```

</vwc-tab-panel>
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDatePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDatePicker label="Start date" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Locales

Dates will be stored in the format `YYYY-MM-DD` and displayed in the configured locale. Use the locale switcher in the example below to see this in action.

See [Localization](/guides/localization/) for more details.

```html preview locale-switcher 460px
<vwc-date-picker label="Start date"></vwc-date-picker>
```

## Slots

### Helper Text Slot

The `helper-text` slot allows you to use rich content as the date picker's helper text.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDatePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDatePicker label="Start date">
		<template #helper-text>
			<span>Please see our <a href="#">opening times</a>.</span>
		</template>
	</VDatePicker>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-picker label="Start date">
	<span slot="helper-text">Please see our <a href="#">opening times</a>.</span>
</vwc-date-picker>
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
import { VDatePicker, VContextualHelp } from '@vonage/vivid-vue';
</script>

<template>
	<VDatePicker label="Start date">
		<template #contextual-help>
			<VContextualHelp>Pick the start date</VContextualHelp>
		</template>
	</VDatePicker>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-picker label="Start date">
	<vwc-contextual-help slot="contextual-help">Pick the start date</vwc-contextual-help>
</vwc-date-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Properties

<div class="table-wrapper">

| Name            | Type                               | Description                                |
| --------------- | ---------------------------------- | ------------------------------------------ |
| **disabled**    | `boolean`                          | Sets the disabled state                    |
| **error-text**  | `string`                           | Sets the error text                        |
| **helper-text** | `string`                           | Sets the helper text                       |
| **label**       | `string`                           | Sets the label text                        |
| **min**         | `string`, date format `YYYY-MM-DD` | Sets the minimum date that can be selected |
| **max**         | `string`, date format `YYYY-MM-DD` | Sets the maximum date that can be selected |
| **readonly**    | `boolean`                          | Sets the field to be readonly              |
| **required**    | `boolean`                          | Sets the field to be required              |
| **value**       | `string`, date format `YYYY-MM-DD` | Sets the current date value                |

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
| **input**       | `CustomEvent<undefined>`  | Yes     | Yes      | Emitted when the date is changed by the user.   |
| **change**      | `CustomEvent<undefined>`  | Yes     | Yes      | Emitted when the date is changed by the user.   |
| **clear-click** | `CustomEvent<undefined> ` | Yes     | Yes      | Event emitted when the clear button is clicked. |

</div>
