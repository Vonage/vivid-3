# VTagGroup Example


## Default slot

<code-tab>
<template #example>
<DefaultSlotExample/>
</template>
<template #code>

```vue
<!--@include: ./components/tag/DefaultSlotExample.vue-->
```
</template>
</code-tab>

## Selectable

<code-tab>
<template #example>
<SelectableUseCaseExample/>
</template>
<template #code>

```vue
<!--@include: ./components/tag/SelectableUseCaseExample.vue-->
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

const DefaultSlotExample = defineClientComponent(() => import("./components/tag-group/DefaultSlotExample.vue"));
const SelectableUseCaseExample = defineClientComponent(() => import("./components/tag-group/SelectableUseCaseExample.vue"));
const RemovableExample = defineClientComponent(() => import("./components/tag-group/RemovableExample.vue"));
</script>
