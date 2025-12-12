## Default Configuration

The Contextual Help component is a helper wrapper that contains a [Toggletip](/components/contextual-help/), a [Button](/components/button/), and a default [Icon](/components/icon/). It was introduced to simplify the integration of contextual help into existing components and to ensure consistency across Vivid.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VContextualHelp } from '@vonage/vivid-vue';
</script>

<template>
	<VContextualHelp>This is an example contextual help</VContextualHelp>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-contextual-help>This is an example contextual help</vwc-contextual-help>
```

</vwc-tab-panel>
</vwc-tabs>

## Custom Icon

Default Icon can be overridden using the `icon` slot.

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
