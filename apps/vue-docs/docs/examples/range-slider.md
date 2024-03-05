# Range Slider Examples

## Range Slider
<code-tab>
<template #example>
<RangeSliderExample />
</template>
<template #code>

```vue
<!--@include: ./components/range-slider/RangeSliderExample.vue -->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const RangeSliderExample = defineClientComponent(() =>  import('./components/range-slider/RangeSliderExample.vue'));
</script>
