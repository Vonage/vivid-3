# Time Picker Examples

## Value
<code-tab>
<template #example>
<ValueExample />
</template>
<template #code>

```vue
<!--@include: ./components/time-picker/ValueExample.vue -->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const ValueExample = defineClientComponent(() =>  import('./components/time-picker/ValueExample.vue'));
</script>
