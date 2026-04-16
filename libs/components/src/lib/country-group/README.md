# Country Group

Lays out multiple `Country` items with consistent spacing. When space is
limited, extra countries stay in the accessibility tree but are hidden visually
and listed in a hover popover (anchored to the `+N` badge).

## Usage

<vwc-tabs gutters="none">
  <vwc-tab label="Vue"></vwc-tab>
  <vwc-tab-panel>

```js
import { VCountryGroup, VCountry } from '@vonage/vivid-vue';
```

```vue preview
<script setup lang="ts">
import { VCountryGroup, VCountry } from '@vonage/vivid-vue';
</script>

<template>
	<VCountryGroup style="max-width: 320px">
		<VCountry code="UK" />
		<VCountry code="NO" />
		<VCountry code="US" />
	</VCountryGroup>
</template>
```

  </vwc-tab-panel>
  <vwc-tab label="Web Component"></vwc-tab>
  <vwc-tab-panel>

```html preview 500px
<script type="module">
	import { registerCountryGroup } from '@vonage/vivid';
	registerCountryGroup('your-prefix');
</script>

<your-prefix-country-group style="max-width: 320px">
	<your-prefix-country code="UK"></your-prefix-country>
	<your-prefix-country code="NO"></your-prefix-country>
	<your-prefix-country code="US"></your-prefix-country>
</your-prefix-country-group>
```

  </vwc-tab-panel>
</vwc-tabs>

## API Reference

### Slots

| **Name**    | **Description**          |
| ----------- | ------------------------ |
| **default** | `Country` children only. |
