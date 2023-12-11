# VAccordion Examples

<code-tab>
<template #example>
<ExpandedExample/>
</template>
<template #code>

```vue
<!--@include: ./components/accordion/ExpandedExample.vue-->
```
</template>
</code-tab>


## Expand multi mode

<code-tab>
<template #example>
<MultiModeExample/>
</template>
<template #code>

```vue
<!--@include: ./components/accordion/MultiModeExample.vue-->
```
</template>
</code-tab>


<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const ExpandedExample = defineClientComponent(() =>  import("./components/accordion/ExpandedExample.vue"));
const MultiModeExample = defineClientComponent(() =>  import("./components/accordion/MultiModeExample.vue"));
</script>
