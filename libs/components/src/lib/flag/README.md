## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<template>
	<p>Shipping to <VFlag code="DE" label="Germany" /> Germany</p>
</template>

<script setup lang="ts">
import { VFlag } from '@vonage/vivid-vue';
</script>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerFlag } from '@vonage/vivid';

registerFlag('your-prefix');
```

```html preview
<script type="module">
	import { registerFlag } from '@vonage/vivid';
	registerFlag('your-prefix');
</script>

<p>Shipping to <your-prefix-flag code="DE" label="Germany"></your-prefix-flag> Germany</p>
```

</vwc-tab-panel>
</vwc-tabs>

## Label

Use the `label` attribute to provide an accessible name when the flag conveys meaning. When no `label` is provided (or it is whitespace-only), `aria-hidden="true"` is applied automatically and the flag is treated as decorative.

See the [Accessibility section](/components/flag/accessibility/) for more information.

## Size

Use the `size` attribute to choose a predefined size scale (shared with `vwc-icon`).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VFlag } from '@vonage/vivid-vue';
</script>

<template>
	<div style="display: flex; gap: 12px; align-items: center;">
		<VFlag code="US" label="United States" size="-4" />
		<VFlag code="US" label="United States" size="0" />
		<VFlag code="US" label="United States" size="2" />
	</div>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div style="display: flex; gap: 12px; align-items: center;">
	<vwc-flag code="US" label="United States" size="-4"></vwc-flag>
	<vwc-flag code="US" label="United States" size="0"></vwc-flag>
	<vwc-flag code="US" label="United States" size="2"></vwc-flag>
</div>
```

</vwc-tab-panel>
</vwc-tabs>
