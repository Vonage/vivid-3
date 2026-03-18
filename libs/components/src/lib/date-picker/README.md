## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { VDatePicker } from '@vonage/vivid-vue';
```

```vue preview 420px
<script setup lang="ts">
import { VDatePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDatePicker label="Start date" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { registerDatePicker } from '@vonage/vivid';

registerDatePicker('your-prefix');
```

```html preview 420px
<script type="module">
	import { registerDatePicker } from '@vonage/vivid';
	registerDatePicker('your-prefix');
</script>

<your-prefix-date-picker label="Start date"></your-prefix-date-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Locales

Dates will be stored in the format `YYYY-MM-DD` and displayed in the configured locale. Use the locale switcher in the example below to see this in action.

See [Localization](/guides/localization/) for more details.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview locale-switcher 400px
<script setup lang="ts">
import { VDatePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDatePicker label="Start date" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview locale-switcher 400px
<vwc-date-picker label="Start date"></vwc-date-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Helper Text Slot

The `helper-text` slot allows you to use rich content as the date picker's helper text.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview 400px
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

```html preview 400px
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

```vue preview 400px
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

```html preview 400px
<vwc-date-picker label="Start date">
	<vwc-contextual-help slot="contextual-help">Pick the start date</vwc-contextual-help>
</vwc-date-picker>
```

</vwc-tab-panel>
</vwc-tabs>
