# VSearchableSelect Examples

## Single

<code-tab>
<template #example>
<SingleExample />
</template>
<template #code>

```vue
<!--@include: ./components/searchable-select/SingleExample.vue -->
```

</template>
</code-tab>

## Multiple

<code-tab>
<template #example>
<MultipleExample />
</template>
<template #code>

```vue
<!--@include: ./components/searchable-select/MultipleExample.vue -->
```

</template>
</code-tab>

## Async

<code-tab>
<template #example>
<AsyncExample />
</template>
<template #code>

```vue
<!--@include: ./components/searchable-select/AsyncExample.vue -->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const SingleExample = defineClientComponent(() =>  import('./components/searchable-select/SingleExample.vue'));
const MultipleExample = defineClientComponent(() =>  import('./components/searchable-select/MultipleExample.vue'));
const AsyncExample = defineClientComponent(() =>  import('./components/searchable-select/AsyncExample.vue'));
</script>
