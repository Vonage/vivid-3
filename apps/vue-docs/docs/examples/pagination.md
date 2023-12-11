# Pagination Examples

## pagination
<code-tab>
<template #example>
<PaginationExample />
</template>
<template #code>

```vue
<!--@include: ./components/pagination/PaginationExample.vue -->
```
</template>
</code-tab>

## Total
<code-tab>
<template #example>
<TotalExample />
</template>
<template #code>

```vue
<!--@include: ./components/pagination/TotalExample.vue -->
```
</template>
</code-tab>

## Size
<code-tab>
<template #example>
<SizeExample />
</template>
<template #code>

```vue
<!--@include: ./components/pagination/SizeExample.vue -->
```
</template>
</code-tab>

## Selected Index
<code-tab>
<template #example>
<SelectedIndexExample />
</template>
<template #code>

```vue
<!--@include: ./components/pagination/SelectedIndexExample.vue -->
```
</template>
</code-tab>

## Nav Icons
<code-tab>
<template #example>
<NavIconsExample />
</template>
<template #code>

```vue
<!--@include: ./components/pagination/NavIconsExample.vue -->
```
</template>
</code-tab>

## pagination-change
<code-tab>
<template #example>
<PaginationChangeExample />
</template>
<template #code>

```vue
<!--@include: ./components/pagination/PaginationChangeExample.vue -->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const PaginationExample = defineClientComponent(() =>  import('./components/pagination/PaginationExample.vue'));
const TotalExample = defineClientComponent(() =>  import('./components/pagination/TotalExample.vue'));
const SizeExample = defineClientComponent(() =>  import('./components/pagination/SizeExample.vue'));
const SelectedIndexExample = defineClientComponent(() =>  import('./components/pagination/SelectedIndexExample.vue'));
const NavIconsExample = defineClientComponent(() =>  import('./components/pagination/NavIconsExample.vue'));
const PaginationChangeExample = defineClientComponent(() =>  import('./components/pagination/PaginationChangeExample.vue'));
</script>
