## Labelling

### Label Text

The `label` attribute provides a short description of the purpose of the Time Picker.

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
<p>If a visible label can't be used, provide one using the <nobr><code>aria-label</code></nobr> attribute. This ensures screen readers announce the purpose of the element, making it accessible to all users.</p>
</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 360px
<script setup lang="ts">
import { VTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VTimePicker label="Start time" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 360px
<vwc-time-picker label="Start time"></vwc-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

### Helper Text

The `helper-text` attribute provides additional information to help the user enter the correct information.

To add HTML to the helper text, use the [helper-text slot](/components/time-picker/code/#helper-text-slot).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 360px
<script setup lang="ts">
import { VTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VTimePicker label="Start time" helper-text="Select a time for the event to start" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 360px
<vwc-time-picker label="Start time" helper-text="Select a time for the event to start"></vwc-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

### Contextual Help

You can add the [Contextual Help](/components/contextual-help/) component using the `contextual-help` slot. It will be displayed next to the label, providing users additional information.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 360px
<script setup lang="ts">
import { VContextualHelp, VTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VTimePicker label="Start time">
		<template #contextual-help>
			<VContextualHelp>Select a time for the event to start</VContextualHelp>
		</template>
	</VTimePicker>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 360px
<vwc-time-picker label="Start time">
	<vwc-contextual-help slot="contextual-help">Select a time for the event to start</vwc-contextual-help>
</vwc-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Value

The `value` attribute contains the currently selected time.

Empty string or `undefined` represent no time being selected.

It will always contain a valid time in the format `HH:MM:SS` when a time is selected. If the user types an invalid time, `value` will be empty.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 360px
<script setup lang="ts">
import { VTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VTimePicker label="Start time" initial-value="12:30:00" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 360px
<vwc-time-picker label="Start time" value="12:30:00"></vwc-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Validation Feedback

### Error Text

The `error-text` attribute provides a custom error message. Any current error state will be overridden by `error-text`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 360px
<script setup lang="ts">
import { VTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VTimePicker error-text="Please select a time for the event to start" label="Start time" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 360px
<vwc-time-picker error-text="Please select a time for the event to start" label="Start time"></vwc-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Clock

The Time Picker will display the time in 12h or 24h format depending on the [configured locale](/components/time-picker/code/#locales).

Use the `clock` attribute to override this behavior.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 360px
<script setup lang="ts">
import { VTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VTimePicker label="Start time" clock="24h" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 360px
<vwc-time-picker label="Start time" clock="24h"></vwc-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Minutes Step

Use the `minutes-step` attribute to configure the step between minutes in the Time Picker.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 360px
<script setup lang="ts">
import { VTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VTimePicker :minutes-step="15" label="Start time" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 360px
<vwc-time-picker minutes-step="15" label="Start time"></vwc-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Seconds Step

Use the `seconds-step` attribute to configure the step between seconds in the Time Picker.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>

If not set, the Time Picker will not display seconds.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 360px
<script setup lang="ts">
import { VTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VTimePicker :seconds-step="5" label="Start time" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 360px
<vwc-time-picker seconds-step="5" label="Start time"></vwc-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Min

Set the `min` attribute to configure the earliest time to accept. The user will be prevented from choosing an earlier time, however it is still possible to manually enter one.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 360px
<script setup lang="ts">
import { VTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VTimePicker label="Start time" min="10:00:00" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 360px
<vwc-time-picker label="Start time" min="10:00:00"></vwc-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Max

Set the `max` attribute to configure the latest time to accept. The user will be prevented from choosing a later time, however it is still possible to manually enter one.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 360px
<script setup lang="ts">
import { VTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VTimePicker label="Start time" max="10:00:00" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 360px
<vwc-time-picker label="Start time" max="10:00:00"></vwc-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Disabled

The `disabled` attribute disables the Time Picker input element.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VTimePicker label="Start time" disabled />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-time-picker label="Start time" disabled></vwc-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Read Only

The `readonly` attribute prevents the user from changing the Time Picker input element value.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VTimePicker label="Start time" readonly />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-time-picker label="Start time" readonly></vwc-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>
