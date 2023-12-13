# VActionGroup Examples

## Action Group
<code-tab>
<template #example>
<ActionGroupExample />
</template>
<template #code>

```vue
<!--@include: ./components/action-group/ActionGroupExample.vue -->
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
<!--@include: ./components/action-group/AppearanceExample.vue -->
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
<!--@include: ./components/action-group/ShapeExample.vue -->
```
</template>
</code-tab>

## Tight
<code-tab>
<template #example>
<TightExample />
</template>
<template #code>

```vue
<!--@include: ./components/action-group/TightExample.vue -->
```
</template>
</code-tab>

## Separator
<code-tab>
<template #example>
<SeparatorExample />
</template>
<template #code>

```vue
<!--@include: ./components/action-group/SeparatorExample.vue -->
```
</template>
</code-tab>

## semi-split button
<code-tab>
<template #example>
<SemisplitButtonExample />
</template>
<template #code>

```vue
<!--@include: ./components/action-group/SemisplitButtonExample.vue -->
```
</template>
</code-tab>

## Composed Search
<code-tab>
<template #example>
<ComposedSearchExample />
</template>
<template #code>

```vue
<!--@include: ./components/action-group/ComposedSearchExample.vue -->
```
</template>
</code-tab>

## Radio Group
<code-tab>
<template #example>
<RadioGroupExample />
</template>
<template #code>

```vue
<!--@include: ./components/action-group/RadioGroupExample.vue -->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const ActionGroupExample = defineClientComponent(() =>  import('./components/action-group/ActionGroupExample.vue'));
const AppearanceExample = defineClientComponent(() =>  import('./components/action-group/AppearanceExample.vue'));
const ShapeExample = defineClientComponent(() =>  import('./components/action-group/ShapeExample.vue'));
const TightExample = defineClientComponent(() =>  import('./components/action-group/TightExample.vue'));
const SeparatorExample = defineClientComponent(() =>  import('./components/action-group/SeparatorExample.vue'));
const SemisplitButtonExample = defineClientComponent(() =>  import('./components/action-group/SemisplitButtonExample.vue'));
const ComposedSearchExample = defineClientComponent(() =>  import('./components/action-group/ComposedSearchExample.vue'));
const RadioGroupExample = defineClientComponent(() =>  import('./components/action-group/RadioGroupExample.vue'));
</script>
