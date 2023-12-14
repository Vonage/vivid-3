# VMenu Examples

## Menu
<code-tab visible-overflow>
<template #example>
<MenuExample />
</template>
<template #code>

```vue
<!--@include: ./components/menu/MenuExample.vue -->
```
</template>
</code-tab>

## Anchor
<code-tab visible-overflow>
<template #example>
<AnchorExample />
</template>
<template #code>

```vue
<!--@include: ./components/menu/AnchorExample.vue -->
```
</template>
</code-tab>

## Placement
<code-tab visible-overflow>
<template #example>
<PlacementExample />
</template>
<template #code>

```vue
<!--@include: ./components/menu/PlacementExample.vue -->
```
</template>
</code-tab>

## Max Inline Size
<code-tab visible-overflow>
<template #example>
<MaxInlineSizeExample />
</template>
<template #code>

```vue
<!--@include: ./components/menu/MaxInlineSizeExample.vue -->
```
</template>
</code-tab>

## Min Inline Size
<code-tab visible-overflow>
<template #example>
<MinInlineSizeExample />
</template>
<template #code>

```vue
<!--@include: ./components/menu/MinInlineSizeExample.vue -->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const MenuExample = defineClientComponent(() =>  import('./components/menu/MenuExample.vue'));
const AnchorExample = defineClientComponent(() =>  import('./components/menu/AnchorExample.vue'));
const PlacementExample = defineClientComponent(() =>  import('./components/menu/PlacementExample.vue'));
const MaxInlineSizeExample = defineClientComponent(() =>  import('./components/menu/MaxInlineSizeExample.vue'));
const MinInlineSizeExample = defineClientComponent(() =>  import('./components/menu/MinInlineSizeExample.vue'));
</script>
