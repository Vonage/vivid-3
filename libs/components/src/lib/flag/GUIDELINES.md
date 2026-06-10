## When to Use

Use `Flag` when you need to display a country flag as a visual identifier next to country-related content.

## Best Practices

<docs-do-dont>

<div slot="description">
Use flags as a supporting visual cue. If the country name is already present as text, omit the `label` so the flag remains decorative.
</div>

<docs-do headline="Omit the label when the text already conveys the meaning">

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VFlag } from '@vonage/vivid-vue';
</script>

<template>
	<p><VFlag code="DE" /> Germany</p>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<p><vwc-flag code="DE"></vwc-flag> Germany</p>
```

</vwc-tab-panel>
</vwc-tabs>

</docs-do>

<docs-dont headline="Don’t rely on a flag alone to convey meaning">

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VFlag } from '@vonage/vivid-vue';
</script>

<template>
	<VFlag code="DE" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-flag code="DE"></vwc-flag>
```

</vwc-tab-panel>
</vwc-tabs>

</docs-dont>

</docs-do-dont>

## Related Components

- [Country](/components/country/)
- [Icon](/components/icon/)
