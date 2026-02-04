# Country Indicator Use Cases

## Next to user or location

Use Country Indicator to show a user's or location's country. Set **code** (e.g. "GB", "UK", "US"); the component shows the flag and country code automatically.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```js
import { VCountryIndicator } from '@vonage/vivid-vue';
```

```vue preview
<script setup lang="ts">
import { VCountryIndicator } from '@vonage/vivid-vue';
</script>

<template>
	<VCountryIndicator code="UK" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerCountryIndicator } from '@vonage/vivid';

registerCountryIndicator('your-prefix');
```

```html preview
<script type="module">
	import { registerCountryIndicator } from '@vonage/vivid';
	registerCountryIndicator('your-prefix');
</script>

<your-prefix-country-indicator code="UK"></your-prefix-country-indicator>
```

</vwc-tab-panel>
</vwc-tabs>

## In lists or tables

Use Country Indicator in table cells or list items to show the country for each row.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```js
import { VCountryIndicator } from '@vonage/vivid-vue';
```

```vue preview
<script setup lang="ts">
import { VCountryIndicator } from '@vonage/vivid-vue';
</script>

<template>
	<VCountryIndicator code="US" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerCountryIndicator } from '@vonage/vivid';

registerCountryIndicator('your-prefix');
```

```html preview
<script type="module">
	import { registerCountryIndicator } from '@vonage/vivid';
	registerCountryIndicator('your-prefix');
</script>

<your-prefix-country-indicator code="US"></your-prefix-country-indicator>
```

</vwc-tab-panel>
</vwc-tabs>

## With custom flag

When you need a custom flag image (e.g. different size or source), use the **icon** slot. The **code** attribute still drives the displayed country code.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```js
import { VCountryIndicator } from '@vonage/vivid-vue';
```

```vue preview
<script setup lang="ts">
import { VCountryIndicator } from '@vonage/vivid-vue';
</script>

<template>
	<VCountryIndicator code="FR">
		<template #icon>
			<img src="https://flagcdn.com/fr.svg" alt="" width="24" height="18" />
		</template>
	</VCountryIndicator>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerCountryIndicator } from '@vonage/vivid';

registerCountryIndicator('your-prefix');
```

```html preview
<script type="module">
	import { registerCountryIndicator } from '@vonage/vivid';
	registerCountryIndicator('your-prefix');
</script>

<your-prefix-country-indicator code="FR">
	<img slot="icon" src="https://flagcdn.com/fr.svg" alt="" width="24" height="18" />
</your-prefix-country-indicator>
```

</vwc-tab-panel>
</vwc-tabs>
