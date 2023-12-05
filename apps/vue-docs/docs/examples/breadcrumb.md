# VBreadcrumb Examples

## Common Usage
<code-tab>
<template #example>
<CommonUsageExample />
</template>
<template #code>

```vue
<!--@include: ./components/breadcrumb/CommonUsageExample.vue -->
```
</template>
</code-tab>

## Multiple hidden crumbs
<code-tab>
<template #example>
<MultipleHiddenCrumbsExample />
</template>
<template #code>

```vue
<!--@include: ./components/breadcrumb/MultipleHiddenCrumbsExample.vue -->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const CommonUsageExample = defineClientComponent(() =>  import('./components/breadcrumb/CommonUsageExample.vue'));
const MultipleHiddenCrumbsExample = defineClientComponent(() =>  import('./components/breadcrumb/MultipleHiddenCrumbsExample.vue'));
</script>
