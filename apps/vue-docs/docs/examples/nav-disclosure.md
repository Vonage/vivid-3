# VNavDisclosure Examples

## Label
<code-tab>
<template #example>
<LabelExample />
</template>
<template #code>

```vue
<!--@include: ./components/nav-disclosure/LabelExample.vue -->
```
</template>
</code-tab>

## Open
<code-tab>
<template #example>
<OpenExample />
</template>
<template #code>

```vue
<!--@include: ./components/nav-disclosure/OpenExample.vue -->
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
<!--@include: ./components/nav-disclosure/IconExample.vue -->
```
</template>
</code-tab>

## Icon Only
<code-tab>
<template #example>
<IconOnlyExample />
</template>
<template #code>

```vue
<!--@include: ./components/nav-disclosure/IconOnlyExample.vue -->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const LabelExample = defineClientComponent(() =>  import('./components/nav-disclosure/LabelExample.vue'));
const OpenExample = defineClientComponent(() =>  import('./components/nav-disclosure/OpenExample.vue'));
const IconExample = defineClientComponent(() =>  import('./components/nav-disclosure/IconExample.vue'));
const IconOnlyExample = defineClientComponent(() =>  import('./components/nav-disclosure/IconOnlyExample.vue'));
</script>
