## Slots

### Icon Slot

Use the `icon` slot to customize default icon.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VContextualHelp, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VContextualHelp>
		This is an example contextual help
		<template #icon><VIcon name="info-solid" /></template>
	</VContextualHelp>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-contextual-help>
	This is an example contextual help
	<vwc-icon slot="icon" name="info-solid"></vwc-icon>
</vwc-contextual-help>
```

</vwc-tab-panel>
</vwc-tabs>
