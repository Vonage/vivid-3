# VNav Examples

## Default

<code-tab>
<template #example>
<DefaultExample />
</template>
<template #code>

```vue
<!--@include: ./components/nav/DefaultExample.vue -->
```

</template>
</code-tab>

## Navigation Disclosure

<code-tab>
<template #example>
<NavigationDisclosureExample />
</template>
<template #code>

```vue
<!--@include: ./components/nav/NavigationDisclosureExample.vue -->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const DefaultExample = defineClientComponent(() =>  import('./components/nav/DefaultExample.vue'));
const NavigationDisclosureExample = defineClientComponent(() =>  import('./components/nav/NavigationDisclosureExample.vue'));
</script>
