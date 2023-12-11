# VSelect Examples

## Default
<code-tab>
<template #example>
<DefaultExample />
</template>
<template #code>

```vue
<!--@include: ./components/select/DefaultExample.vue -->
```
</template>
</code-tab>

## Label
<code-tab>
<template #example>
<LabelExample />
</template>
<template #code>

```vue
<!--@include: ./components/select/LabelExample.vue -->
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
<!--@include: ./components/select/IconExample.vue -->
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
<!--@include: ./components/select/MultipleExample.vue -->
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
<!--@include: ./components/select/AppearanceExample.vue -->
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
<!--@include: ./components/select/ShapeExample.vue -->
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
<!--@include: ./components/select/DisabledExample.vue -->
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
<!--@include: ./components/select/OpenExample.vue -->
```
</template>
</code-tab>

## Option Label
<code-tab>
<template #example>
<OptionLabelExample />
</template>
<template #code>

```vue
<!--@include: ./components/select/OptionLabelExample.vue -->
```
</template>
</code-tab>

## Height (CSS Variable)
<code-tab>
<template #example>
<HeightCSSVariableExample />
</template>
<template #code>

```vue
<!--@include: ./components/select/HeightCSSVariableExample.vue -->
```
</template>
</code-tab>

## Width
<code-tab>
<template #example>
<WidthExample />
</template>
<template #code>

```vue
<!--@include: ./components/select/WidthExample.vue -->
```
</template>
</code-tab>

## Use Case
<code-tab>
<template #example>
<UseCaseExample />
</template>
<template #code>

```vue
<!--@include: ./components/select/UseCaseExample.vue -->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const DefaultExample = defineClientComponent(() =>  import('./components/select/DefaultExample.vue'));
const LabelExample = defineClientComponent(() =>  import('./components/select/LabelExample.vue'));
const IconExample = defineClientComponent(() =>  import('./components/select/IconExample.vue'));
const MultipleExample = defineClientComponent(() =>  import('./components/select/MultipleExample.vue'));
const AppearanceExample = defineClientComponent(() =>  import('./components/select/AppearanceExample.vue'));
const ShapeExample = defineClientComponent(() =>  import('./components/select/ShapeExample.vue'));
const DisabledExample = defineClientComponent(() =>  import('./components/select/DisabledExample.vue'));
const OpenExample = defineClientComponent(() =>  import('./components/select/OpenExample.vue'));
const OptionLabelExample = defineClientComponent(() =>  import('./components/select/OptionLabelExample.vue'));
const HeightCSSVariableExample = defineClientComponent(() =>  import('./components/select/HeightCSSVariableExample.vue'));
const WidthExample = defineClientComponent(() =>  import('./components/select/WidthExample.vue'));
const UseCaseExample = defineClientComponent(() =>  import('./components/select/UseCaseExample.vue'));
</script>
