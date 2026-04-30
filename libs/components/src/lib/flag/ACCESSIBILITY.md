## Implementation

### Informative vs Decorative Flags

- **Informative flags**
  - Convey information not otherwise present in the page's text.
  - Must set the `label` attribute to provide an accessible name.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VFlag } from '@vonage/vivid-vue';
</script>

<template>
	<div style="display: flex; align-items: center; gap: 8px;">
		<VFlag code="DE" label="Germany" />
		<span>Shipping destination</span>
	</div>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div style="display: flex; align-items: center; gap: 8px;">
	<vwc-flag code="DE" label="Germany"></vwc-flag>
	<span>Shipping destination</span>
</div>
```

</vwc-tab-panel>
</vwc-tabs>

- **Decorative flags**
  - Duplicate information already present in the text, or are purely aesthetic.
  - Do not require a `label`.
  - When no `label` is provided, `aria-hidden="true"` is automatically applied.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VFlag } from '@vonage/vivid-vue';
</script>

<template>
	<p><VFlag code="US" /> United States</p>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<p><vwc-flag code="US"></vwc-flag> United States</p>
```

</vwc-tab-panel>
</vwc-tabs>

## Best Practices

### Flags Are Non-Interactive

- Do not use flags as interactive controls.
- If you need an interactive flag, use a component designed for interaction (for example a Button) and include accessible text.

## Resources

- [WAI Images Tutorial: Decorative vs Informative Images](https://www.w3.org/WAI/tutorials/images/)
