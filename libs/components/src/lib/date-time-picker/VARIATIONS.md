## Labelling

### Label Text

The `label` attribute provides a short description of the purpose of the Date Picker.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDateTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateTimePicker label="Start date and time" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-time-picker label="Start date and time"></vwc-date-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
<p>If a visible label can't be used, provide one using the <nobr><code>aria-label</code></nobr> attribute. This ensures screen readers announce the purpose of the element, making it accessible to all users.</p>
</vwc-note>

### Helper Text

The `helper-text` attribute provides additional information to help the user enter the correct information.

To add HTML to the helper text, use the [helper-text slot](/components/date-time-picker/code/#helper-text-slot).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDateTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateTimePicker helper-text="Select a date and time for the event to start" label="Start date and time" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-time-picker helper-text="Select a date and time for the event to start" label="Start date and time"></vwc-date-time-picker>
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
import { VDateTimePicker, VContextualHelp } from '@vonage/vivid-vue';
</script>

<template>
	<VDateTimePicker label="Start date and time">
		<template #contextual-help>
			<VContextualHelp>Select a date and time for the event to start</VContextualHelp>
		</template>
	</VDateTimePicker>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-time-picker label="Start date and time">
	<vwc-contextual-help slot="contextual-help">Select a date and time for the event to start</vwc-contextual-help>
</vwc-date-time-picker>
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
import { VDateTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateTimePicker error-text="Please select a date and time for the event to start" label="Start date and time" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-time-picker error-text="Please select a date and time for the event to start" label="Start date and time"></vwc-date-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Value

The `value` attribute contains the currently selected date and time.

Empty string or `undefined` represent no value being selected.

It will always contain a valid value in the format `YYYY-MM-DDTHH:MM:SS` when a value is selected. If the user enters an invalid value, value will be empty.

The Date Time Picker is time zone agnostic. You need to ensure that `value` is interpreted correctly in your application.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDateTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateTimePicker value="2023-01-01T12:00:00" label="Select date and time" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-time-picker value="2023-01-01T12:00:00" label="Select date and time"></vwc-date-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Min

Set the `min` attribute to configure the earliest value to accept. The user will be prevented from choosing an earlier value, however it is still possible to manually enter one.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDateTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateTimePicker min="2023-06-10T09:00:00" label="Select date and time" value="2023-06-10T09:00:00" clock="24h" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-time-picker min="2023-06-10T09:00:00" label="Select date and time" value="2023-06-10T09:00:00" clock="24h"></vwc-date-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Min Date

Set the `min-date` attribute to configure the earliest date to accept. The user will be prevented from choosing an earlier date, however it is still possible to manually enter one.

The `min-date` attribute will take precedence over the `min` attribute.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDateTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateTimePicker min-date="2023-06-10" label="Select date and time" value="2023-06-15T12:00:00" clock="24h" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-time-picker min-date="2023-06-10" label="Select date and time" value="2023-06-15T12:00:00" clock="24h"></vwc-date-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Min Time

Set the `min-time` attribute to configure the earliest time to accept. The user will be prevented from choosing an earlier time, however it is still possible to manually enter one.

The `min-time` attribute will take precedence over the min attribute.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDateTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateTimePicker min-time="09:00:00" label="Select date and time" clock="24h" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-time-picker min-time="09:00:00" label="Select date and time" clock="24h"></vwc-date-time-picker>
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
import { VDateTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateTimePicker max="2023-06-10T17:00:00" label="Select date and time" value="2023-06-10T12:00:00" clock="24h" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-time-picker max="2023-06-10T17:00:00" label="Select date and time" value="2023-06-10T12:00:00" clock="24h"></vwc-date-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Max Date

Set the `max-date` attribute to configure the latest date to accept. The user will be prevented from choosing a later date, however it is still possible to manually enter one.

The `max-date` attribute will take precedence over the `max` attribute.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDateTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateTimePicker max-date="2023-06-20" label="Select date and time" value="2023-06-15T12:00:00" clock="24h" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-time-picker max-date="2023-06-20" label="Select date and time" value="2023-06-15T12:00:00" clock="24h"></vwc-date-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Max Time

Set the `max-time` attribute to configure the latest time to accept. The user will be prevented from choosing a later time, however it is still possible to manually enter one.

The `max-time` attribute will take precedence over the `max` attribute.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDateTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateTimePicker max-time="17:00:00" label="Select date and time" clock="24h" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-time-picker max-time="17:00:00" label="Select date and time" clock="24h"></vwc-date-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Clock

The Date Time Picker will display the time in 12h or 24h format depending on the [configured locale](/components/date-time-picker/code/#locales).

Use the `clock` attribute to override this behavior.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDateTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateTimePicker clock="24h" label="Select date and time" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-time-picker clock="24h" label="Select date and time"></vwc-date-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Minutes Step

Use the `minutes-step` attribute to configure the step between minutes in the Date Time Picker.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDateTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateTimePicker minutes-step="15" label="Select date and time" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-time-picker minutes-step="15" label="Select date and time"></vwc-date-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Seconds Step

Use the `seconds-step` attribute to configure the step between seconds in the Date Time Picker.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDateTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateTimePicker seconds-step="15" label="Select date and time" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-time-picker seconds-step="15" label="Select date and time"></vwc-date-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line"></vwc-icon>

    If not set, the Date Time Picker will not display seconds.

</vwc-note>

## Disabled

Add the `disabled` attribute to disable the Date Time Picker.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDateTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateTimePicker disabled label="Start date and time" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-date-time-picker disabled label="Start date and time"></vwc-date-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Readonly

Add the `readonly` attribute to make the Date Time Picker readonly.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VDateTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateTimePicker readonly label="Start date and time" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-date-time-picker readonly label="Start date and time"></vwc-date-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>
