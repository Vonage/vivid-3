## Usage

<vwc-tabs gutters="none">
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
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VProgress } from '@vonage/vivid-vue';
</script>
<template>
	<VProgress value="25" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Properties

<div class="table-wrapper">

| Name            | Type                                                     | Description                                  |
| --------------- | -------------------------------------------------------- | -------------------------------------------- |
| **connotation** | `accent` (default), `cta`, `success`, `alert`, `pacific` | Sets the connotation                         |
| **max**         | `number`                                                 | Sets the maximum value of the range          |
| **min**         | `number`                                                 | Sets the minimum value of the range          |
| **paused**      | `boolean`                                                | Sets the paused state                        |
| **reverse**     | `boolean`                                                | Sets the progress to show from right to left |
| **shape**       | `rounded` (default), `sharp`                             | Sets the border radius                       |
| **value**       | `number` or `string`                                     | Sets the current value of progress           |

</div>
