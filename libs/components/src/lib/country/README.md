# Country

Displays a country flag and country code. When **code** is set, the component shows the matching flag and the code (e.g. "UK") automatically.

## Variations

### Code

Set the **code** attribute to show the country flag and country code. The flag is rendered as a Vivid icon; The displayed text is the country code (e.g. "UK", "US").

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```js
import { VCountry } from '@vonage/vivid-vue';
```

```vue preview
<script setup lang="ts">
import { VCountry } from '@vonage/vivid-vue';
</script>

<template>
	<VCountry code="GB" />
	<VCountry code="US" />
	<VCountry code="UK" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-country code="GB"></vwc-country>
<vwc-country code="US"></vwc-country>
<vwc-country code="UK"></vwc-country>
```

</vwc-tab-panel>
</vwc-tabs>

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line"></vwc-icon>
	<p>Use the Country component to show a country's flag and country code together. Set the <strong>code</strong> attribute (ISO 3166-1 alpha-2, e.g. "GB", "UK", "US"); the component shows the matching flag icon from vivid icon set and the country code (e.g. "UK", "US") automatically. Use the <strong>icon</strong> slot only when you need a custom flag or graphic instead of the default.</p>
</vwc-note>

### Label

Use the **label** attribute when the country code alone is not clear (e.g. for less familiar codes). The component still shows the flag from **code** but displays the label text instead of the code. it will override the default country code text.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```js
import { VCountry } from '@vonage/vivid-vue';
```

```vue preview
<script setup lang="ts">
import { VCountry } from '@vonage/vivid-vue';
</script>

<template>
	<VCountry code="GB" label="United Kingdom" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-country code="GB" label="United Kingdom"></vwc-country>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Icon Slot

Use the **icon** slot to provide your own flag image or graphic instead of the default flag icon.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCountry } from '@vonage/vivid-vue';
</script>

<template>
	<VCountry code="UK">
		<template #icon>
			<img src="https://flagcdn.com/gb.svg" alt="" width="24" height="18" />
		</template>
	</VCountry>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-country code="UK">
	<img slot="icon" src="https://flagcdn.com/gb.svg" alt="" width="24" height="18" />
</vwc-country>
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
