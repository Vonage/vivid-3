# Empty State Examples

## Empty State

<code-tab>
<template #example>
<EmptyStateExample />
</template>
<template #code>

```vue
<!--@include: ./components/empty-state/EmptyStateExample.vue -->
```

</template>
</code-tab>

## Headline

<code-tab>
<template #example>
<HeadlineExample />
</template>
<template #code>

```vue
<!--@include: ./components/empty-state/HeadlineExample.vue -->
```

</template>
</code-tab>

## Icon

<code-tab>
<template #example>
<IconExample />
</template>
<template #code>

```vue
<!--@include: ./components/empty-state/IconExample.vue -->
```

</template>
</code-tab>

## Default

<code-tab>
<template #example>
<DefaultExample />
</template>
<template #code>

```vue
<!--@include: ./components/empty-state/DefaultExample.vue -->
```

</template>
</code-tab>

## Graphic

<code-tab>
<template #example>
<GraphicExample />
</template>
<template #code>

```vue
<!--@include: ./components/empty-state/GraphicExample.vue -->
```

</template>
</code-tab>

## Action Items

<code-tab>
<template #example>
<ActionItemsExample />
</template>
<template #code>

```vue
<!--@include: ./components/empty-state/ActionItemsExample.vue -->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const EmptyStateExample = defineClientComponent(() =>  import('./components/empty-state/EmptyStateExample.vue'));
const HeadlineExample = defineClientComponent(() =>  import('./components/empty-state/HeadlineExample.vue'));
const IconExample = defineClientComponent(() =>  import('./components/empty-state/IconExample.vue'));
const DefaultExample = defineClientComponent(() =>  import('./components/empty-state/DefaultExample.vue'));
const GraphicExample = defineClientComponent(() =>  import('./components/empty-state/GraphicExample.vue'));
const ActionItemsExample = defineClientComponent(() =>  import('./components/empty-state/ActionItemsExample.vue'));
</script>
