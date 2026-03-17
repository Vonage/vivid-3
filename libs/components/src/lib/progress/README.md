## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VProgress } from '@vonage/vivid-vue';
</script>
<template>
	<VProgress :value="25" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerProgress } from '@vonage/vivid';

registerProgress('your-prefix');
```

```html preview
<script type="module">
	import { registerProgress } from '@vonage/vivid';
	registerProgress('your-prefix');
</script>

<your-prefix-progress value="25"></your-prefix-progress>
```

</vwc-tab-panel>
</vwc-tabs>
