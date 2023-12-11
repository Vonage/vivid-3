# VTextField Examples

## Label
<code-tab>
<template #example>
<LabelExample />
</template>
<template #code>

```vue
<!--@include: ./components/text-field/LabelExample.vue -->
```
</template>
</code-tab>

## Placeholder
<code-tab>
<template #example>
<PlaceholderExample />
</template>
<template #code>

```vue
<!--@include: ./components/text-field/PlaceholderExample.vue -->
```
</template>
</code-tab>

## Value
<code-tab>
<template #example>
<ValueExample />
</template>
<template #code>

```vue
<!--@include: ./components/text-field/ValueExample.vue -->
```
</template>
</code-tab>

## Helper text
<code-tab>
<template #example>
<HelperTextExample />
</template>
<template #code>

```vue
<!--@include: ./components/text-field/HelperTextExample.vue -->
```
</template>
</code-tab>

## Success text
<code-tab>
<template #example>
<SuccessTextExample />
</template>
<template #code>

```vue
<!--@include: ./components/text-field/SuccessTextExample.vue -->
```
</template>
</code-tab>

## Error text
<code-tab>
<template #example>
<ErrorTextExample />
</template>
<template #code>

```vue
<!--@include: ./components/text-field/ErrorTextExample.vue -->
```
</template>
</code-tab>

## Character Count
<code-tab>
<template #example>
<CharacterCountExample />
</template>
<template #code>

```vue
<!--@include: ./components/text-field/CharacterCountExample.vue -->
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
<!--@include: ./components/text-field/IconExample.vue -->
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
<!--@include: ./components/text-field/ShapeExample.vue -->
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
<!--@include: ./components/text-field/AppearanceExample.vue -->
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
<!--@include: ./components/text-field/DisabledExample.vue -->
```
</template>
</code-tab>

## Readonly
<code-tab>
<template #example>
<ReadonlyExample />
</template>
<template #code>

```vue
<!--@include: ./components/text-field/ReadonlyExample.vue -->
```
</template>
</code-tab>

## In Form
<code-tab>
<template #example>
<InFormExample />
</template>
<template #code>

```vue
<!--@include: ./components/text-field/InFormExample.vue -->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const LabelExample = defineClientComponent(() =>  import('./components/text-field/LabelExample.vue'));
const PlaceholderExample = defineClientComponent(() =>  import('./components/text-field/PlaceholderExample.vue'));
const ValueExample = defineClientComponent(() =>  import('./components/text-field/ValueExample.vue'));
const HelperTextExample = defineClientComponent(() =>  import('./components/text-field/HelperTextExample.vue'));
const SuccessTextExample = defineClientComponent(() =>  import('./components/text-field/SuccessTextExample.vue'));
const ErrorTextExample = defineClientComponent(() =>  import('./components/text-field/ErrorTextExample.vue'));
const CharacterCountExample = defineClientComponent(() =>  import('./components/text-field/CharacterCountExample.vue'));
const IconExample = defineClientComponent(() =>  import('./components/text-field/IconExample.vue'));
const ShapeExample = defineClientComponent(() =>  import('./components/text-field/ShapeExample.vue'));
const AppearanceExample = defineClientComponent(() =>  import('./components/text-field/AppearanceExample.vue'));
const DisabledExample = defineClientComponent(() =>  import('./components/text-field/DisabledExample.vue'));
const ReadonlyExample = defineClientComponent(() =>  import('./components/text-field/ReadonlyExample.vue'));
const InFormExample = defineClientComponent(() =>  import('./components/text-field/InFormExample.vue'));
</script>
