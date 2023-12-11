# VTag Examples

## Label

<code-tab>
<template #example>
<LabelExample/>
</template>
<template #code>

```vue
<!--@include: ./components/tag/LabelExample.vue-->
```
</template>
</code-tab>


## Shape

<code-tab>
<template #example>
<ShapeExample/>
</template>
<template #code>

```vue
<!--@include: ./components/tag/ShapeExample.vue-->
```
</template>
</code-tab>


## Icon

<code-tab>
<template #example>
<IconExample/>
</template>
<template #code>

```vue
<!--@include: ./components/tag/IconExample.vue-->
```
</template>
</code-tab>


## Appearance

<code-tab>
<template #example>
<AppearanceExample/>
</template>
<template #code>

```vue
<!--@include: ./components/tag/AppearanceExample.vue-->
```
</template>
</code-tab>


## Connotation

<code-tab>
<template #example>
<ConnotationExample/>
</template>
<template #code>

```vue
<!--@include: ./components/tag/ConnotationExample.vue-->
```
</template>
</code-tab>


## Subtle tag with connotation

<code-tab>
<template #example>
<SubtleTagWithConnotationExample/>
</template>
<template #code>

```vue
<!--@include: ./components/tag/SubtleTagWithConnotationExample.vue-->
```
</template>
</code-tab>


## Duotone tag with connotation

<code-tab>
<template #example>
<DuotoneTagWithConnotationExample/>
</template>
<template #code>

```vue
<!--@include: ./components/tag/DuotoneTagWithConnotationExample.vue-->
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
<!--@include: ./components/tag/DisabledExample.vue-->
```
</template>
</code-tab>


## Selectable

<code-tab>
<template #example>
<SelectableExample/>
</template>
<template #code>

```vue
<!--@include: ./components/tag/SelectableExample.vue-->
```
</template>
</code-tab>


## Removable

<code-tab>
<template #example>
<RemovableExample/>
</template>
<template #code>

```vue
<!--@include: ./components/tag/RemovableExample.vue-->
```
</template>
</code-tab>


<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from "vitepress";

const LabelExample = defineClientComponent(() => import("./components/tag/LabelExample.vue"));
const ShapeExample = defineClientComponent(() => import("./components/tag/ShapeExample.vue"));
const IconExample = defineClientComponent(() => import("./components/tag/IconExample.vue"));
const AppearanceExample = defineClientComponent(() => import("./components/tag/AppearanceExample.vue"));
const ConnotationExample = defineClientComponent(() => import("./components/tag/ConnotationExample.vue"));
const SubtleTagWithConnotationExample = defineClientComponent(() => import("./components/tag/SubtleTagWithConnotationExample.vue"));
const DuotoneTagWithConnotationExample = defineClientComponent(() => import("./components/tag/DuotoneTagWithConnotationExample.vue"));
const DisabledExample = defineClientComponent(() => import("./components/tag/DisabledExample.vue"));
const SelectableExample = defineClientComponent(() => import("./components/tag/SelectableExample.vue")); 
const RemovableExample = defineClientComponent(() => import("./components/tag/RemovableExample.vue"));
</script>
