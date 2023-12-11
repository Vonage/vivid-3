# VTextarea Examples

<code-tab>
<template #example>
<DefaultExample/>
</template>
<template #code>

```vue
<!--@include: ./components/text-area/DefaultExample.vue-->
```
</template>
</code-tab>

## Label

<code-tab>
<template #example>
<LabelExample/>
</template>
<template #code>

```vue
<!--@include: ./components/text-area/LabelExample.vue-->
```
</template>
</code-tab>


## Placeholder

<code-tab>
<template #example>
<PlaceholderExample/>
</template>
<template #code>

```vue
<!--@include: ./components/text-area/PlaceholderExample.vue-->
```
</template>
</code-tab>


## Value

<code-tab>
<template #example>
<ValueExample/>
</template>
<template #code>

```vue
<!--@include: ./components/text-area/ValueExample.vue-->
```
</template>
</code-tab>


## Resize

<code-tab>
<template #example>
<ResizeExample/>
</template>
<template #code>

```vue
<!--@include: ./components/text-area/ResizeExample.vue-->
```
</template>
</code-tab>


## HelperText

<code-tab>
<template #example>
<HelperText/>
</template>
<template #code>

```vue
<!--@include: ./components/text-area/HelperText.vue-->
```
</template>
</code-tab>


## Success Text

<code-tab>
<template #example>
<SuccessText/>
</template>
<template #code>

```vue
<!--@include: ./components/text-area/SuccessText.vue-->
```
</template>
</code-tab>


## Disabled

<code-tab>
<template #example>
<DisabledExample/>
</template>
<template #code>

```vue
<!--@include: ./components/text-area/DisabledExample.vue-->
```
</template>
</code-tab>


## Readonly

<code-tab>
<template #example>
<Readonly/>
</template>
<template #code>

```vue
<!--@include: ./components/text-area/Readonly.vue-->
```
</template>
</code-tab>


## RowsExample

<code-tab>
<template #example>
<RowsExample/>
</template>
<template #code>

```vue
<!--@include: ./components/text-area/RowsExample.vue-->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from "vitepress"; 

const DefaultExample = defineClientComponent(() => import("./components/text-area/DefaultExample.vue"));
const LabelExample = defineClientComponent(() => import("./components/text-area/LabelExample.vue"));
const PlaceholderExample = defineClientComponent(() => import("./components/text-area/PlaceholderExample.vue"));
const ValueExample = defineClientComponent(() => import("./components/text-area/ValueExample.vue"));
const ResizeExample = defineClientComponent(() => import("./components/text-area/ResizeExample.vue"));
const HelperText = defineClientComponent(() => import("./components/text-area/HelperTextExample.vue"));
const SuccessText = defineClientComponent(() => import("./components/text-area/SuccessTextExample.vue"));
const DisabledExample = defineClientComponent(() => import("./components/text-area/DisabledExample.vue"));
const Readonly = defineClientComponent(() => import("./components/text-area/ReadonlyExample.vue"));
const RowsExample = defineClientComponent(() => import("./components/text-area/RowsExample.vue"));
</script>
