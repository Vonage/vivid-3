Country Indicator shows a country flag and country code. Set the **code** attribute (ISO 3166-1 alpha-2, e.g. "GB", "UK", "US"); the component displays the matching flag icon (Vivid icon set) and the code (e.g. "UK") automatically. "UK" uses the GB flag. Use the optional **label** attribute to override the displayed text (e.g. "Saint Helena" instead of "SH") for less familiar codes. Use the **icon** slot only when you need a custom flag or graphic.

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

With a custom flag via the **icon** slot:

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

<your-prefix-country-indicator code="UK"></your-prefix-country-indicator>
```

With a custom flag or graphic via the **icon** slot:

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

| **Property**     | **Type** | **Description**                                                                                                                                                                                                   |
| ---------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **code**          | _string_ | ISO 3166-1 alpha-2 country code (e.g. "GB", "UK", "US"). When set, the component shows the matching flag (from [flag-icons](https://github.com/lipis/flag-icons)) and the code (e.g. "UK") automatically. |
| **label**        | _string_ | Optional text to show instead of the country code (e.g. "Saint Helena" for "SH"). Useful for less familiar codes.                                                                                                |

### Slots

| **Name** | **Description**                                                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **icon** | Optional custom flag or graphic. When `code` is set and no content is slotted, a default flag from the flag-icons library is shown. |
