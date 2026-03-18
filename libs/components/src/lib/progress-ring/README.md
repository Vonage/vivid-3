## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VProgressRing } from '@vonage/vivid-vue';
</script>
<template>
	<VProgressRing />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerProgressRing } from '@vonage/vivid';

registerProgressRing('your-prefix');
```

```html preview
<script type="module">
	import { registerProgressRing } from '@vonage/vivid';
	registerProgressRing('your-prefix');
</script>

<your-prefix-progress-ring></your-prefix-progress-ring>
```

</vwc-tab-panel>
</vwc-tabs>
