## Trim Text

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VBadge } from '@vonage/vivid-vue';
</script>
<template>
	<VBadge class="badge-trim" text="overflowing text" />
</template>
<style>
.badge-trim {
	inline-size: 60px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-badge class="badge-trim" text="overflowing text"></vwc-badge>

<style>
	.badge-trim {
		inline-size: 60px;
	}
</style>
```

</vwc-tab-panel>

</vwc-tabs>

## Custom Width

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VBadge } from '@vonage/vivid-vue';
</script>
<template>
	<VBadge class="badge-inline-size" text="with min-width" />
</template>
<style>
.badge-inline-size {
	min-width: 300px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-badge class="badge-inline-size" text="with min-width"></vwc-badge>

<style>
	.badge-inline-size {
		min-width: 300px;
	}
</style>
```

</vwc-tab-panel>

</vwc-tabs>

## Usage With Buttons

If you need to use the badge together with buttons (e.g. in toolbars), use an `expanded` size of the badge with a `super-condensed` button. This will make both components the same height and vertical alignment, improving layout consistency.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VActionGroup, VBadge, VButton } from '@vonage/vivid-vue';
</script>
<template>
	<VActionGroup>
		<VBadge appearance="subtle" size="expanded" text="Example badge" />
		<VButton size="super-condensed" label="Example button" appearance="filled" />
	</VActionGroup>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-action-group>
	<vwc-badge appearance="subtle" size="expanded" text="Example badge"></vwc-badge>
	<vwc-button size="super-condensed" label="Example button" appearance="filled"></vwc-button>
</vwc-action-group>
```

</vwc-tab-panel>

</vwc-tabs>
