## Connotation

The **connotation** attribute controls the status type and its icon and color.

- **success** (positive): Green checkmark icon.
- **information** (info): Blue filled info icon.
- **warning**: Orange warning icon.
- **alert**: Red alert icon.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```js
import { VStatus } from '@vonage/vivid-vue';
```

```vue preview
<script setup lang="ts">
import { VStatus } from '@vonage/vivid-vue';
</script>

<template>
	<VStatus connotation="success" status="Positive">Description</VStatus>
	<VStatus connotation="information" status="Info">Description</VStatus>
	<VStatus connotation="warning" status="Warning">Description</VStatus>
	<VStatus connotation="alert" status="Alert">Description</VStatus>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerStatus } from '@vonage/vivid';

registerStatus('your-prefix');
```

```html preview
<script type="module">
	import { registerStatus } from '@vonage/vivid';
	registerStatus('your-prefix');
</script>

<your-prefix-status connotation="success" status="Positive">Description</your-prefix-status>
<your-prefix-status connotation="information" status="Info">Description</your-prefix-status>
<your-prefix-status connotation="warning" status="Warning">Description</your-prefix-status>
<your-prefix-status connotation="alert" status="Alert">Description</your-prefix-status>
```

</vwc-tab-panel>
</vwc-tabs>
