## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```js
import { VTag, VTagGroup } from '@vonage/vivid-vue';
```

```vue preview
<script setup lang="ts">
import { VTag, VTagGroup } from '@vonage/vivid-vue';
</script>
<template>
	<VTagGroup>
		<VTag label="Tag one" />
		<VTag label="Tag two" />
	</VTagGroup>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerTag, registerTagGroup } from '@vonage/vivid';

registerTag('your-prefix');
registerTagGroup('your-prefix');
```

```html preview
<script type="module">
	import { registerTag, registerTagGroup } from '@vonage/vivid';
	registerTag('your-prefix');
	registerTagGroup('your-prefix');
</script>

<your-prefix-tag-group>
	<your-prefix-tag label="Tag one"></your-prefix-tag>
	<your-prefix-tag label="Tag two"></your-prefix-tag>
</your-prefix-tag-group>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Icon Slot

Use the `icon` slot in the **Tag** component to customise icons. If set, the `icon` attribute is ignored.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VIcon, VTag, VTagGroup } from '@vonage/vivid-vue';
</script>

<template>
	<VTagGroup>
		<VTag label="With icon">
			<template #icon><VIcon name="heart-solid" connotation="alert" /></template>
		</VTag>
	</VTagGroup>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-tag-group>
	<vwc-tag label="With icon">
		<vwc-icon slot="icon" name="heart-solid" connotation="alert"></vwc-icon>
	</vwc-tag>
</vwc-tag-group>
```

</vwc-tab-panel>
</vwc-tabs>
