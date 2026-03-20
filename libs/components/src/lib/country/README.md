# Country

Displays a country flag with its ISO country code or custom label.

<docs-do-dont>
<docs-do slot="description">

**Use Country when...**

- Displaying a country using a flag and short identifier (code or label).
- Adding quick visual context in tables, lists, or compact UI elements.
- Showing static, read-only country information consistently across products.

</docs-do>

<docs-do dont>

**Don't use Country when...**

- Allowing users to select or change a country — use a [Select](/components/select/) or [Searchable Select](/components/searchable-select/) instead.
- Displaying long or descriptive country names.
- Representing languages, regions, or nationalities.
- Acting as an interactive or behavioural element.

</docs-do>
</docs-do-dont>

## Usage

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
	<VCountry code="US" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerCountry } from '@vonage/vivid';

registerCountry('your-prefix');
```

```html preview
<script type="module">
	import { registerCountry } from '@vonage/vivid';
	registerCountry('your-prefix');
</script>

<your-prefix-country code="US"></your-prefix-country>
```

</vwc-tab-panel>
</vwc-tabs>

## Code

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
	<VCountry code="DE" /><br />
	<VCountry code="US" /><br />
	<VCountry code="UK" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-country code="DE"></vwc-country><br />
<vwc-country code="US"></vwc-country><br />
<vwc-country code="UK"></vwc-country>
```

</vwc-tab-panel>
</vwc-tabs>

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line"></vwc-icon>
	<p>Use the Country component to show a country's flag and country code together. Set the <strong>code</strong> attribute (ISO 3166-1 alpha-2, e.g. "GB", "UK", "US"); the component shows the matching flag icon from vivid icon set and the country code (e.g. "UK", "US") automatically. Use the <strong>icon</strong> slot only when you need a custom flag or graphic instead of the default.</p>
</vwc-note>

## Label

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
	<VCountry code="DE" label="Germany" /><br />
	<VCountry code="US" label="United States of America" /><br />
	<VCountry code="UK" label="United Kingdom" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-country code="DE" label="Germany"></vwc-country><br />
<vwc-country code="US" label="United State of America"></vwc-country><br />
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
