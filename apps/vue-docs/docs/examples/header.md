# VHeader Examples

## Elevation Shadow

<code-tab no-padding>
<template #example>
<ElevationShadowExample/>
</template>
<template #code>

```vue
<!--@include: ./components/header/ElevationShadowExample.vue-->
```
</template>
</code-tab>


## Alternate

<code-tab no-padding>
<template #example>
<AlternateExample/>
</template>
<template #code>

```vue
<!--@include: ./components/header/AlternateExample.vue-->
```
</template>
</code-tab>


## Default Slot

<code-tab no-padding>
<template #example>
<DefaultSlotExample/>
</template>
<template #code>

```vue
<!--@include: ./components/header/DefaultSlotExample.vue-->
```
</template>
</code-tab>


## Action Items

<code-tab no-padding>
<template #example>
<ActionItemsExample/>
</template>
<template #code>

```vue
<!--@include: ./components/header/ActionItemsExample.vue-->
```
</template>
</code-tab>


## App Content

<code-tab no-padding>
<template #example>
<AppContentExample/>
</template>
<template #code>

```vue
<!--@include: ./components/header/AppContentExample.vue-->
```
</template>
</code-tab>


## Block Size

<code-tab no-padding>
<template #example>
<BlockSizeExample/>
</template>
<template #code>

```vue
<!--@include: ./components/header/BlockSizeExample.vue-->
```
</template>
</code-tab>


## CSS Parts Base Example

<code-tab no-padding>
<template #example>
<BaseExample/>
</template>
<template #code>

```vue
<!--@include: ./components/header/BaseExample.vue-->
```
</template>
</code-tab>


## Header With Banner

<code-tab no-padding>
<template #example>
<HeaderWithBannerExample/>
</template>
<template #code>

```vue
<!--@include: ./components/header/HeaderWithBannerExample.vue-->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const ElevationShadowExample = defineClientComponent(() =>  import("./components/header/ElevationShadowExample.vue"));
const AlternateExample = defineClientComponent(() =>  import("./components/header/AlternateExample.vue"));
const DefaultSlotExample = defineClientComponent(() => import("./components/header/DefaultSlotExample.vue"));
const ActionItemsExample = defineClientComponent(() => import("./components/header/ActionItemsExample.vue"));
const AppContentExample = defineClientComponent(() => import("./components/header/AppContentExample.vue"));
const BlockSizeExample = defineClientComponent(() => import("./components/header/BlockSizeExample.vue"));
const BaseExample = defineClientComponent(() => import("./components/header/BaseExample.vue"));
const HeaderWithBannerExample = defineClientComponent(() => import("./components/header/HeaderWithBannerExample.vue"))
</script>
