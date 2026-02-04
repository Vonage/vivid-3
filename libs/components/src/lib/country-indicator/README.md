## Usage

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

## Code

Set the **code** attribute to show the country flag and country code. The flag is rendered as a Vivid icon; The displayed text is the country code (e.g. "UK", "US").

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

## Label

Use the **label** attribute to override the default country code text.

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
	<VCountryIndicator code="GB" label="United Kingdom" />
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

<your-prefix-country-indicator code="GB" label="United Kingdom"></your-prefix-country-indicator>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Icon Slot

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

## API Reference

### Properties

| **Property** | **Type** | **Description**                                                                                                                                                                                           |
| ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **code**     | _string_ | ISO 3166-1 alpha-2 country code (e.g. "GB", "UK", "US"). When set, the component shows the matching flag (from [flag-icons](https://github.com/lipis/flag-icons)) and the code (e.g. "UK") automatically. |
| **label**    | _string_ | Optional text to show instead of the country code (e.g. "Saint Helena" for "SH"). Useful for less familiar codes.                                                                                         |

### Slots

| **Name** | **Description**                  |
| -------- | -------------------------------- |
| **icon** | Optional custom flag or graphic. |
