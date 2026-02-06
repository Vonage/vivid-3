## Determinate State

Determinate state can be used to display how much of a process has been completed. Although, it may be that the [Progress](/components/progress/) component is better suited for this task.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VProgressRing } from '@vonage/vivid-vue';
</script>
<template>
	<VProgressRing :min="1" :max="5" :value="2" aria-label="Step 2 of 5" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-progress-ring min="1" max="5" value="2" aria-label="Step 2 of 5"></vwc-progress-ring>
```

</vwc-tab-panel>
</vwc-tabs>

## Indeterminate State

Indeterminate state can be used to indicated that something is loading.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VProgressRing } from '@vonage/vivid-vue';
</script>
<template>
	<VProgressRing aria-label="Loading search results" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-progress-ring aria-label="Loading search results"></vwc-progress-ring>
```

</vwc-tab-panel>
</vwc-tabs>
