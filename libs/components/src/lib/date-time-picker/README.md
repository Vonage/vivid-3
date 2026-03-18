## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```js
import { VDateTimePicker } from '@vonage/vivid-vue';
```

```vue preview 460px
<script setup lang="ts">
import { VDateTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateTimePicker label="Start date and time" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
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

<your-prefix-date-time-picker label="Start date and time"></your-prefix-date-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Locales

Values will be stored in the format `YYYY-MM-DDTHH:MM:SS` and displayed in the configured locale. Use the locale switcher in the example below to see this in action.

See [Localization](/guides/localization/) for more details.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview locale-switcher 460px
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

```html preview locale-switcher 460px
<vwc-date-time-picker label="Start date and time"></vwc-date-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Helper Text Slot

The `helper-text` slot allows you to use rich content as the date picker's helper text.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 460px
<script setup lang="ts">
import { VDateTimePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateTimePicker label="Start date and time">
		<template #helper-text>
			<span>Please see our <a href="#">opening times</a>.</span>
		</template>
	</VDateTimePicker>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-time-picker label="Start date and time">
	<span slot="helper-text">Please see our <a href="#">opening times</a>.</span>
</vwc-date-time-picker>
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
import { VDateTimePicker, VContextualHelp } from '@vonage/vivid-vue';
</script>

<template>
	<VDateTimePicker label="Start date and time">
		<template #contextual-help>
			<VContextualHelp>Please see our opening times</VContextualHelp>
		</template>
	</VDateTimePicker>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview 460px
<vwc-date-time-picker label="Start date and time">
	<vwc-contextual-help slot="contextual-help">Please see our opening times</vwc-contextual-help>
</vwc-date-time-picker>
```

</vwc-tab-panel>
</vwc-tabs>
