This rule enforces the use of the Vue slot syntax (`<template #slotname>`) instead of the slot attribute (`slot="slotname"`) for named slots of Vivid components.
This syntax should be preferred for consistency with slots of regular Vue components.

The rule provides a fix to convert the syntax automatically.

#### Example

```html
<!-- ❌ BAD -->
<VTextField label="Search">
	<VButton slot="action-items" label="Clear" />
</VTextField>

<!-- ✅ GOOD -->
<VTextField label="Search">
	<template #action-items><VButton label="Clear" /></template>
</VTextField>
```
