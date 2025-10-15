## Usage

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
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
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
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
</vwc-tabs>

## API Reference

### Properties

<div class="table-wrapper">

| Name            | Type                                                            | Description                         |
| --------------- | --------------------------------------------------------------- | ----------------------------------- |
| **connotation** | `accent` (default), `cta`, `success`, `alert`                   | Sets the connotation                |
| **max**         | `number`                                                        | Sets the maximum value of the range |
| **min**         | `number`                                                        | Sets the minimum value of the range |
| **paused**      | `boolean`                                                       | Sets the paused state               |
| **size**        | `-6`, `-5` `-4`, `-3`, `-2`, `-1`, `0`, `1`, `2`, `3`, `4`, `5` | Sets the size                       |
| **value**       | `number` or `string`                                            | Sets the current value of progress  |

</div>
