# Dial Pad Examples

## Basic

<code-tab>
<template #example>
<BasicExample/>
</template>
<template #code>

```vue
<!--@include: ./components/dial-pad/BasicExample.vue-->
```

</template>
</code-tab>

<script setup lang="ts">
import codeTab from '../custom/CodeTab.vue'; 
import { defineClientComponent } from "vitepress"; 
const BasicExample = defineClientComponent(() => import("./components/dial-pad/BasicExample.vue"));
</script>
