# VTab Examples

## Label
<code-tab>
<template #example>
<LabelExample />
</template>
<template #code>

```vue
<!--@include: ./components/tab/LabelExample.vue -->
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
<!--@include: ./components/tab/IconExample.vue -->
```
</template>
</code-tab>

## Icon with Label
<code-tab>
<template #example>
<IconWithLabelExample />
</template>
<template #code>

```vue
<!--@include: ./components/tab/IconWithLabelExample.vue -->
```
</template>
</code-tab>

## Disabled
<code-tab>
<template #example>
<DisabledExample />
</template>
<template #code>

```vue
<!--@include: ./components/tab/DisabledExample.vue -->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const LabelExample = defineClientComponent(() =>  import('./components/tab/LabelExample.vue'));
const IconExample = defineClientComponent(() =>  import('./components/tab/IconExample.vue'));
const IconWithLabelExample = defineClientComponent(() =>  import('./components/tab/IconWithLabelExample.vue'));
const DisabledExample = defineClientComponent(() =>  import('./components/tab/DisabledExample.vue'));
</script>
