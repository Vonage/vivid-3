# VDataGrid Examples

## DataGrid
<code-tab visible-overflow>
<template #example>
<BasicExample />
</template>
<template #code>

```vue
<!--@include: ./components/data-grid/BasicExample.vue -->
```
</template>
</code-tab>

## RowsData
<code-tab visible-overflow>
<template #example>
<RowsDataExample />
</template>
<template #code>

```vue
<!--@include: ./components/data-grid/RowsDataExample.vue -->
```
</template>
</code-tab>

## Selection Mode
<code-tab visible-overflow>
<template #example>
<SelectionModeExample />
</template>
<template #code>

```vue
<!--@include: ./components/data-grid/SelectionModeExample.vue -->
```
</template>
</code-tab>

## NoTabbing
<code-tab visible-overflow>
<template #example>
<NoTabbingExample />
</template>
<template #code>

```vue
<!--@include: ./components/data-grid/NoTabbingExample.vue -->
```
</template>
</code-tab>

## Generate Header
<code-tab visible-overflow>
<template #example>
<GenerateHeaderExample />
</template>
<template #code>

```vue
<!--@include: ./components/data-grid/BasicExample.vue -->
```
</template>
</code-tab>

## Custom Cells
<code-tab visible-overflow>
<template #example>
<CustomCellsExample />
</template>
<template #code>

```vue
<!--@include: ./components/data-grid/CustomCellsExample.vue -->
```
</template>
</code-tab>

## Sorting
<code-tab visible-overflow>
<template #example>
<SortingExample />
</template>
<template #code>

```vue
<!--@include: ./components/data-grid/SortingExample.vue -->
```
</template>
</code-tab>

## Custom Columns Widths
<code-tab visible-overflow>
<template #example>
<CustomColumnsWidthsExample />
</template>
<template #code>

```vue
<!--@include: ./components/data-grid/CustomColumnsWidthsExample.vue -->
```
</template>
</code-tab>

## Manipulating Data
<code-tab visible-overflow>
<template #example>
<ManipulatingDataExample />
</template>
<template #code>

```vue
<!--@include: ./components/data-grid/ManipulatingDataExample.vue -->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const BasicExample = defineClientComponent(() =>  import('./components/data-grid/BasicExample.vue'));
const ManipulatingDataExample = defineClientComponent(() =>  import('./components/data-grid/ManipulatingDataExample.vue'));
const RowsDataExample = defineClientComponent(() =>  import('./components/data-grid/RowsDataExample.vue'));
const SelectionModeExample = defineClientComponent(() =>  import('./components/data-grid/SelectionModeExample.vue'));
const NoTabbingExample = defineClientComponent(() =>  import('./components/data-grid/NoTabbingExample.vue'));
const GenerateHeaderExample = defineClientComponent(() =>  import('./components/data-grid/GenerateHeaderExample.vue'));
const CustomCellsExample = defineClientComponent(() =>  import('./components/data-grid/CustomCellsExample.vue'));
const SortingExample = defineClientComponent(() =>  import('./components/data-grid/SortingExample.vue'));
const CustomColumnsWidthsExample = defineClientComponent(() =>  import('./components/data-grid/CustomColumnsWidthsExample.vue'));
</script>

