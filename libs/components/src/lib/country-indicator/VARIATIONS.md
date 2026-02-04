## Default (flag and country code)

Set **code** (ISO 3166-1 alpha-2, e.g. "GB", "UK", "US") to show the flag and country code. The flag is rendered as a Vivid icon; "UK" is resolved to the GB flag. The displayed text is the country code (e.g. "UK", "US").

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
	<VCountryIndicator code="GB" />
	<VCountryIndicator code="US" />
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

<your-prefix-country-indicator code="GB"></your-prefix-country-indicator>
<your-prefix-country-indicator code="US"></your-prefix-country-indicator>
<your-prefix-country-indicator code="UK"></your-prefix-country-indicator>
```

</vwc-tab-panel>
</vwc-tabs>

## With custom icon

Use the **icon** slot to provide your own flag image or graphic instead of the default flag icon.

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
	<VCountryIndicator code="UK">
		<template #icon>
			<img src="https://flagcdn.com/gb.svg" alt="" width="24" height="18" />
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

<your-prefix-country-indicator code="UK">
	<img slot="icon" src="https://flagcdn.com/gb.svg" alt="" width="24" height="18" />
</your-prefix-country-indicator>
```

</vwc-tab-panel>
</vwc-tabs>
