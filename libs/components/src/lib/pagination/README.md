## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VPagination } from '@vonage/vivid-vue';
</script>

<template>
	<VPagination :total="10" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerPagination } from '@vonage/vivid';

registerPagination('your-prefix');
```

```html preview
<script type="module">
	import { registerPagination } from '@vonage/vivid';
	registerPagination('your-prefix');
</script>

<your-prefix-pagination total="10"></your-prefix-pagination>
```

</vwc-tab-panel>
</vwc-tabs>
