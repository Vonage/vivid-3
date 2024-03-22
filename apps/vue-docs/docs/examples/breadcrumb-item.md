# VBreadcrumbItem Examples

## Link

<code-tab>
<template #example>
<LinkExample />
</template>
<template #code>

```vue
<!--@include: ./components/breadcrumb-item/LinkExample.vue -->
```

</template>
</code-tab>

## Text

<code-tab>
<template #example>
<TextExample />
</template>
<template #code>

```vue
<!--@include: ./components/breadcrumb-item/TextExample.vue -->
```

</template>
</code-tab>

## Combined

<code-tab>
<template #example>
<CombinedExample />
</template>
<template #code>

```vue
<!--@include: ./components/breadcrumb-item/CombinedExample.vue -->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const LinkExample = defineClientComponent(() =>  import('./components/breadcrumb-item/LinkExample.vue'));
const TextExample = defineClientComponent(() =>  import('./components/breadcrumb-item/TextExample.vue'));
const CombinedExample = defineClientComponent(() =>  import('./components/breadcrumb-item/CombinedExample.vue'));
</script>
