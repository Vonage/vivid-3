## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
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

```js
import { registerTimePicker } from '@vonage/vivid';

registerTimePicker('your-prefix');
```

```html preview
<script type="module">
	import { registerTimePicker } from '@vonage/vivid';
	registerTimePicker('your-prefix');
</script>

<your-prefix-time-picker label="Start time"></your-prefix-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Locales

By default, the Time Picker adapts to either 12-hour or 24-hour format based on the configured locale. Use the locale switcher in the example below to see this in action. Read more on [localization in Vivid](/guides/localization/).

<vwc-note connotation="information">
	<vwc-icon	vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>

You can override this behavior using the [clock attribute](/components/time-picker/#clock).

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview locale-switcher 360px
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

```html preview locale-switcher 360px
<vwc-time-picker label="Start time"></vwc-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Helper-Text

The `helper-text` slot allows you to use rich content as the time-picker's helper text.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview locale-switcher 360px
<script setup lang="ts">
import { VTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VTimePicker label="Start time">
		<template #helper-text>
			<span>Please see our <a href="#">opening times</a>.</span>
		</template>
	</VTimePicker>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview locale-switcher 360px
<vwc-time-picker label="Start time">
	<span slot="helper-text">Please see our <a href="#">opening times</a>.</span>
</vwc-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

### Contextual Help

The `contextual-help` slot allows you to add the [Contextual Help](/components/contextual-help/) component next to the label.

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
			<VContextualHelp>Please see our opening times</VContextualHelp>
		</template>
	</VTimePicker>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 360px
<vwc-time-picker label="Start time">
	<vwc-contextual-help slot="contextual-help">Please see our opening times</vwc-contextual-help>
</vwc-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Properties

<div class="table-wrapper">

| Name             | Type                              | Description                                                             |
| ---------------- | --------------------------------- | ----------------------------------------------------------------------- |
| **clock**        | enum: `12h`, `24hr`               | Sets time display format                                                |
| **disabled**     | `boolean`                         | Sets the disabled state                                                 |
| **error-text**   | `string`                          | Sets the error text                                                     |
| **helper-text**  | `string`                          | Sets the helper text                                                    |
| **label**        | `string`                          | Sets the field label                                                    |
| **max**          | `string` (time format `hh:mm:ss`) | Sets the maximum time the user can set                                  |
| **min**          | `string` (time format `hh:mm:ss`) | Sets the minimum time the user can set                                  |
| **minutes-step** | `number`                          | Sets the step between minites in the Time Picker                        |
| **read-only**    | `boolean`                         | Sets the read onnly state                                               |
| **required**     | `boolean`                         | Sets the field as required                                              |
| **seconds-step** | `number`                          | Sets the step between seconds (and activate seconds) in the Time Picker |
| **value**        | `string` (time format `hh:mm:ss`) | Sets the current value of the Time Picker                               |

</div>

### Slots

<div class="table-wrapper">

| Name                | Description                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **helper-text**     | Add rich content as the Time Picker's helper text                                                                  |
| **contextual-help** | Allows you to add the [Contextual Help](/components/contextual-help/) component to be displayed next to the label. |

</div>

### Events

<div class="table-wrapper">

| Name            | Type                      | Bubbles | Composed | Description                                     |
| --------------- | ------------------------- | ------- | -------- | ----------------------------------------------- |
| **input**       | `CustomEvent<undefined>`  | Yes     | Yes      | Emitted when the time is changed by the user.   |
| **change**      | `CustomEvent<undefined>`  | Yes     | Yes      | Emitted when the time is changed by the user.   |
| **clear-click** | `CustomEvent<undefined> ` | Yes     | Yes      | Event emitted when the clear button is clicked. |

</div>
