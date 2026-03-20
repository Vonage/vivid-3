## Usage

<vwc-tabs gutters="none" >
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```js
import { VDateRangePicker } from '@vonage/vivid-vue';
```

```vue preview 460px
<script setup lang="ts">
import { VDateRangePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateRangePicker label="Event duration" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
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
</vwc-tabs>

## Locales

Dates will be stored in the format `YYYY-MM-DD` and displayed in the configured locale. Use the locale switcher in the example below to see this in action.

See [Localization](/guides/localization/) for more details.

<vwc-tabs gutters="none" >
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview locale-switcher 460px
<script setup lang="ts">
import { VDateRangePicker } from '@vonage/vivid-vue';
</script>

<template>
	<VDateRangePicker label="Event duration" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview locale-switcher 460px
<vwc-date-range-picker label="Event duration"></vwc-date-range-picker>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Helper Text Slot

The `helper-text` slot allows you to use rich content as the date picker's helper text.

<vwc-tabs gutters="none" >
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

<vwc-tabs gutters="none" >
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview locale-switcher 460px
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
