# Status Use Cases

## Inline status in forms

Use Status to show validation or submission result next to a form or field.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```js
import { VStatus } from '@vonage/vivid-vue';
```

```vue preview 250px
<script setup lang="ts">
import { VStatus } from '@vonage/vivid-vue';
</script>

<template>
	<VStatus connotation="success" status="Saved">Your preferences were updated.</VStatus>
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

<your-prefix-status connotation="success" status="Saved">Your preferences were updated.</your-prefix-status>
```

</vwc-tab-panel>
</vwc-tabs>

## List of statuses

Stack multiple statuses when summarizing different states (e.g. checks or alerts).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```js
import { VStatus } from '@vonage/vivid-vue';
```

```vue preview 250px
<script setup lang="ts">
import { VStatus } from '@vonage/vivid-vue';
</script>

<template>
	<VStatus connotation="success" status="Positive">Description</VStatus>
	<VStatus connotation="warning" status="Warning">Description</VStatus>
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
<your-prefix-status connotation="warning" status="Warning">Description</your-prefix-status>
```

</vwc-tab-panel>
</vwc-tabs>
