## Labelling

### Label Text

The `label` attribute provides a short description of the purpose of the Date Picker.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDateRangePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateRangePicker label="Event duration" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-range-picker label="Event duration"></vwc-date-range-picker>
```

</vwc-tab-panel>
</vwc-tabs>

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
<p>If a visible label can't be used, provide one using the <nobr><code>aria-label</code></nobr> attribute. This ensures screen readers announce the purpose of the element, making it accessible to all users.</p>
</vwc-note>

### Helper Text

The `helper-text` attribute provides additional information to help the user enter the correct information.

To add HTML to the helper text, use the [helper-text slot](/components/date-range-picker/code/#helper-text-slot).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDateRangePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateRangePicker helper-text="Select a date for the event to start" label="Event duration" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-range-picker helper-text="Select a date for the event to start" label="Event duration"></vwc-date-range-picker>
```

</vwc-tab-panel>
</vwc-tabs>

### Contextual Help

You can add the [Contextual Help](/components/contextual-help/) component using the `contextual-help` slot. It will be displayed next to the label, providing users additional information.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDateRangePicker, VContextualHelp } from '@vonage/vivid-vue';
</script>

<template>
	<VDateRangePicker helper-text="Select a date for the event to start" label="Event duration">
		<template #contextual-help>
			<VContextualHelp>Select a date for the event to start</VContextualHelp>
		</template>
	</VDateRangePicker>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-range-picker label="Event duration">
	<vwc-contextual-help slot="contextual-help">Select a date for the event to start</vwc-contextual-help>
</vwc-date-range-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Validation Feedback

### Error Text

The `error-text` attribute provides a custom error message. Any current error state will be overridden by `error-text`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDateRangePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateRangePicker error-text="Please select dates for the event to start and end" label="Event duration" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-range-picker error-text="Please select dates for the event to start and end" label="Event duration"></vwc-date-range-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Start and End Values

Use the `start` and `end` attributes to define the date range. If either attribute is set to an empty string or `undefined`, no date is selected.

When a date is chosen, these attributes always contain a valid date in the `YYYY-MM-DD` format. If the user enters an invalid date, an error message is displayed.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDateRangePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateRangePicker start="2023-06-15" end="2023-06-30" label="Event duration" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-range-picker start="2023-06-15" end="2023-06-30" label="Event duration"></vwc-date-range-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Min

Set the `min` attribute to configure the earliest date to accept. The user will be prevented from choosing an earlier date, however it is still possible to manually enter one.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDateRangePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateRangePicker min="2023-06-10" label="Date range" start="2023-06-15" end="2023-06-20" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-range-picker min="2023-06-10" label="Date range" start="2023-06-15" end="2023-06-20"></vwc-date-range-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Max

Set the `max` attribute to configure the latest date to accept. The user will be prevented from choosing an later date, however it is still possible to manually enter one.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDateRangePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateRangePicker max="2023-06-20" label="Date range" start="2023-06-10" end="2023-06-15" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-range-picker max="2023-06-20" label="Date range" start="2023-06-10" end="2023-06-15"></vwc-date-range-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Disabled

Add the `disabled` attribute to disable the Date Range Picker.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDateRangePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateRangePicker disabled label="Date range" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-date-range-picker disabled label="Date range"></vwc-date-range-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Readonly

Add the `readonly` attribute to make the Date Range Picker readonly.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDateRangePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateRangePicker readonly label="Date range" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-date-range-picker readonly label="Date range"></vwc-date-range-picker>
```

</vwc-tab-panel>
</vwc-tabs>
