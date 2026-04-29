## Flag

Use `Flag` to display a country flag based on an ISO 3166-1 alpha-2 country code.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VFlag } from '@vonage/vivid-vue';
</script>

<template>
	<div style="display: flex; gap: 12px; align-items: center;">
		<VFlag code="DE" label="Germany" />
		<VFlag code="JP" label="Japan" />
		<VFlag code="US" label="United States" />
	</div>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div style="display: flex; gap: 12px; align-items: center;">
	<vwc-flag code="DE" label="Germany"></vwc-flag>
	<vwc-flag code="JP" label="Japan"></vwc-flag>
	<vwc-flag code="US" label="United States"></vwc-flag>
</div>
```

</vwc-tab-panel>
</vwc-tabs>

### Size

The `size` attribute controls the rendered dimensions using the same predefined scale as `vwc-icon`.

```html preview
<div style="display: flex; gap: 12px; align-items: center;">
	<vwc-flag code="DE" label="Germany" size="-4"></vwc-flag>
	<vwc-flag code="DE" label="Germany" size="0"></vwc-flag>
	<vwc-flag code="DE" label="Germany" size="2"></vwc-flag>
	<vwc-flag code="DE" label="Germany" size="4"></vwc-flag>
</div>
```

### Decorative vs Informative

When `label` is omitted (or whitespace-only), the flag is treated as decorative and `aria-hidden="true"` is applied automatically.

```html preview
<p><vwc-flag code="US"></vwc-flag> United States</p>
<p><vwc-flag code="US" label="United States"></vwc-flag> United States</p>
```
