# VBadge Examples

## Text
<code-tab>
<template #example>
<TextExample />
</template>
<template #code>

```vue
<!--@include: ./components/badge/TextExample.vue -->
```
</template>
</code-tab>

## Shape
<code-tab>
<template #example>
<ShapeExample />
</template>
<template #code>

```vue
<!--@include: ./components/badge/ShapeExample.vue -->
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
<!--@include: ./components/badge/IconExample.vue -->
```
</template>
</code-tab>

## Icon with Text
<code-tab>
<template #example>
<IconWithTextExample />
</template>
<template #code>

```vue
<!--@include: ./components/badge/IconWithTextExample.vue -->
```
</template>
</code-tab>

## Appearance
<code-tab>
<template #example>
<AppearanceExample />
</template>
<template #code>

```vue
<!--@include: ./components/badge/AppearanceExample.vue -->
```
</template>
</code-tab>

## Filled badge with connotation
<code-tab>
<template #example>
<FilledBadgeWithConnotationExample />
</template>
<template #code>

```vue
<!--@include: ./components/badge/FilledBadgeWithConnotationExample.vue -->
```
</template>
</code-tab>

## Subtle badge with connotation
<code-tab>
<template #example>
<SubtleBadgeWithConnotationExample />
</template>
<template #code>

```vue
<!--@include: ./components/badge/SubtleBadgeWithConnotationExample.vue -->
```
</template>
</code-tab>

## Duotone badge with connotation
<code-tab>
<template #example>
<DuotoneBadgeWithConnotationExample />
</template>
<template #code>

```vue
<!--@include: ./components/badge/DuotoneBadgeWithConnotationExample.vue -->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const TextExample = defineClientComponent(() =>  import('./components/badge/TextExample.vue'));
const ShapeExample = defineClientComponent(() =>  import('./components/badge/ShapeExample.vue'));
const IconExample = defineClientComponent(() =>  import('./components/badge/IconExample.vue'));
const IconWithTextExample = defineClientComponent(() =>  import('./components/badge/IconWithTextExample.vue'));
const AppearanceExample = defineClientComponent(() =>  import('./components/badge/AppearanceExample.vue'));
const FilledBadgeWithConnotationExample = defineClientComponent(() =>  import('./components/badge/FilledBadgeWithConnotationExample.vue'));
const SubtleBadgeWithConnotationExample = defineClientComponent(() =>  import('./components/badge/SubtleBadgeWithConnotationExample.vue'));
const DuotoneBadgeWithConnotationExample = defineClientComponent(() =>  import('./components/badge/DuotoneBadgeWithConnotationExample.vue'));
</script>
