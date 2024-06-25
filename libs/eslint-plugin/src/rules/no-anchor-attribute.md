Anchored components, like tooltip, can reference their anchor in different ways.

This rule disallows the usage of the `anchor` attribute to reference an anchor by ID. Instead, the `anchor` slot should be used.
The slot is preferred because it does not require the use of global IDs and ensures correct DOM order for accessibility.

The rule provides an automatic fix if the anchor is immediately preceding the anchored component.

#### Example

```html
<!-- ❌ BAD -->
<VButton id="anchor" label="Save"></VButton>
<VTooltip anchor="anchor" text="Tooltip text"></VTooltip>

<!-- ✅ GOOD -->
<VTooltip text="Tooltip text">
	<template #anchor><VButton label="Save"></VButton></template>
</VTooltip>
```
