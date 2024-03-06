#VTreeView Example

## Default Slot

<code-tab>
<template #example>
<DefaultSlotExample/>
</template>
<template #code>

```vue
<!--@include: ./components/tree-view/DefaultSlotExample.vue-->
```

</template>
</code-tab>

## Nested Tree

<code-tab>
<template #example>
<NestedTreeExample/>
</template>
<template #code>

```vue
<!--@include: ./components/tree-view/NestedTreeExample.vue-->
```

</template>
</code-tab>

<script setup lang="ts">
import codeTab from '../custom/CodeTab.vue'; 
import { defineClientComponent } from "vitepress"; 
const DefaultSlotExample = defineClientComponent(() => import("./components/tree-view/DefaultSlotExample.vue"));
const NestedTreeExample = defineClientComponent(() => import("./components/tree-view/NestedTreeExample.vue"));
</script>
