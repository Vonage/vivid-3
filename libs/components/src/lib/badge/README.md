## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VBadge } from '@vonage/vivid-vue';
</script>
<template>
	<VBadge text="My Badge" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerBanner } from '@vonage/vivid';

registerBadge('your-prefix');
```

```html preview
<script type="module">
	import { registerBadge } from '@vonage/vivid';
	registerBadge('your-prefix');
</script>

<your-prefix-badge text="My Badge"></your-prefix-badge>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Icon Slot

Use the `icon` slot to provide an icon.
If set, the `icon` attribute _(deprecated)_ will be ignored.

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>

For [informative icons](/components/icon/accessibility//#informative-vs-decorative-icons), provide an accessible label using the `label` attribute on the [Icon component](/components/icon/code/#label).

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VBadge, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<VBadge text="Accessibility testing" appearance="subtle-light" connotation="success" size="expanded">
		<template #icon><VIcon label="Done:" name="check-circle-solid" connotation="success" /></template>
	</VBadge>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-badge text="Accessibility testing" appearance="subtle-light" connotation="success" size="expanded">
	<vwc-icon label="Done:" slot="icon" name="check-circle-solid" connotation="success"></vwc-icon>
</vwc-badge>
```

</vwc-tab-panel>
</vwc-tabs>
