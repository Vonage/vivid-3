#VDialPad Example

## Basic

<code-tab>
<template #example>
<ValueExample/>
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
