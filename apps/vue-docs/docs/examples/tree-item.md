# VTreeItem Examples

## Text
<code-tab>
<template #example>
<TextExample/>
</template>
<template #code>

```vue
<!--@include: ./components/tree-item/TextExample.vue-->
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
<!--@include: ./components/tree-item/IconExample.vue-->
```
</template>
</code-tab>


## Selected
<code-tab>
<template #example>
<SelectedExample/>
</template>
<template #code>

```vue
<!--@include: ./components/tree-item/SelectedExample.vue-->
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
<!--@include: ./components/tree-item/DisabledExample.vue-->
```
</template>
</code-tab>


## Expanded
<code-tab>
<template #example>
<ExpandedExample/>
</template>
<template #code>

```vue
<!--@include: ./components/tree-item/ExpandedExample.vue-->
```
</template>
</code-tab>


## Item Slot
<code-tab>
<template #example>
<ItemSlotExample/>
</template>
<template #code>

```vue
<!--@include: ./components/tree-item/ItemSlotExample.vue-->
```
</template>
</code-tab>



<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from "vitepress";

const TextExample = defineClientComponent(() => import("./components/tree-item/TextExample.vue"));
const IconExample = defineClientComponent(() => import("./components/tree-item/IconExample.vue"));
const SelectedExample = defineClientComponent(() => import("./components/tree-item/SelectedExample.vue"));
const DisabledExample = defineClientComponent(() => import("./components/tree-item/DisabledExample.vue"));
const ExpandedExample = defineClientComponent(() => import ("./components/tree-item/ExpandedExample.vue"));
const ItemSlotExample = defineClientComponent(() => import ("./components/tree-item/ItemSlotExample.vue"));
</script>
