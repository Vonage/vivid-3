# Alert Examples

## Text
<code-tab>
<template #example>
<TextExample />
</template>
<template #code>

```vue
<!--@include: ./components/alert/TextExample.vue -->
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
<!--@include: ./components/alert/HeadlineExample.vue -->
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
<!--@include: ./components/alert/OpenExample.vue -->
```
</template>
</code-tab>

## Connotation
<code-tab>
<template #example>
<ConnotationExample />
</template>
<template #code>

```vue
<!--@include: ./components/alert/ConnotationExample.vue -->
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
<!--@include: ./components/alert/IconExample.vue -->
```
</template>
</code-tab>

## Placement
<code-tab>
<template #example>
<PlacementExample />
</template>
<template #code>

```vue
<!--@include: ./components/alert/PlacementExample.vue -->
```
</template>
</code-tab>

## Removable
<code-tab>
<template #example>
<RemovableExample />
</template>
<template #code>

```vue
<!--@include: ./components/alert/RemovableExample.vue -->
```
</template>
</code-tab>

## Timeoutms
<code-tab>
<template #example>
<TimeoutmsExample />
</template>
<template #code>

```vue
<!--@include: ./components/alert/TimeoutmsExample.vue -->
```
</template>
</code-tab>

## Main
<code-tab>
<template #example>
<MainExample />
</template>
<template #code>

```vue
<!--@include: ./components/alert/MainExample.vue -->
```
</template>
</code-tab>

## ActionItems
<code-tab>
<template #example>
<ActionItemsExample />
</template>
<template #code>

```vue
<!--@include: ./components/alert/ActionItemsExample.vue -->
```
</template>
</code-tab>

## Minimum inline Size
<code-tab>
<template #example>
<MinimumInlineSizeExample />
</template>
<template #code>

```vue
<!--@include: ./components/alert/MinimumInlineSizeExample.vue -->
```
</template>
</code-tab>

## Maximum inline Size
<code-tab>
<template #example>
<MaximumInlineSizeExample />
</template>
<template #code>

```vue
<!--@include: ./components/alert/MaximumInlineSizeExample.vue -->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const TextExample = defineClientComponent(() =>  import('./components/alert/TextExample.vue'));
const HeadlineExample = defineClientComponent(() =>  import('./components/alert/HeadlineExample.vue'));
const OpenExample = defineClientComponent(() =>  import('./components/alert/OpenExample.vue'));
const ConnotationExample = defineClientComponent(() =>  import('./components/alert/ConnotationExample.vue'));
const IconExample = defineClientComponent(() =>  import('./components/alert/IconExample.vue'));
const PlacementExample = defineClientComponent(() =>  import('./components/alert/PlacementExample.vue'));
const RemovableExample = defineClientComponent(() =>  import('./components/alert/RemovableExample.vue'));
const TimeoutmsExample = defineClientComponent(() =>  import('./components/alert/TimeoutmsExample.vue'));
const MainExample = defineClientComponent(() =>  import('./components/alert/MainExample.vue'));
const ActionItemsExample = defineClientComponent(() =>  import('./components/alert/ActionItemsExample.vue'));
const MinimumInlineSizeExample = defineClientComponent(() =>  import('./components/alert/MinimumInlineSizeExample.vue'));
const MaximumInlineSizeExample = defineClientComponent(() =>  import('./components/alert/MaximumInlineSizeExample.vue'));
</script>
