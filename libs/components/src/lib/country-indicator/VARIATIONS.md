## Default

<vwc-note connotation="information">
   <vwc-icon slot="icon" name="info-line"></vwc-icon>
  <p>Country Indicator shows a country flag and country code. Set the <code>code</code> attribute (ISO 3166-1 alpha-2, e.g. "GB", "FR", "US"); the component displays the matching flag icon (Vivid icon set) and the code (e.g. "UK") automatically. "UK" uses the GB flag. Use the optional <code>label</code> attribute to override the displayed text (e.g. "United Kingdom" instead of "GB") for less familiar codes. Use the <code>icon</code> slot only when you need a custom flag or graphic.</p>
</vwc-note>

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

## With Custom Code Text

Use the **label** attribute when the country code alone is not clear (e.g. for less familiar codes). The component still shows the flag from **code** but displays the label text instead of the code.

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

## With Custom Flag Icon

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
