# VDivider Examples

<code-tab>
<template #example>
<SimpleExample/>
</template>
<template #code>

```vue
<!--@include: ./components/divider/SimpleExample.vue-->
```
</template>
</code-tab>

## Orientation

<code-tab>
<template #example>
<OrientationExample/>
</template>
<template #code>

```vue
<!--@include: ./components/divider/OrientationExample.vue-->
```
</template>
</code-tab>


# UseCase 

## Vertical Divider

<code-tab>
<template #example>
<VerticalUseCaseExample/>
</template>
<template #code>

```vue
<!--@include: ./components/divider/VerticalUseCaseExample.vue-->
```
</template>
</code-tab>

## Horizontal Divider

<code-tab>
<template #example>
<HorizontalUseCaseExample/>
</template>
<template #code>

```vue
<!--@include: ./components/divider/HorizontalUseCaseExample.vue-->
```
</template>
</code-tab>

## Divider as decorative element

<code-tab>
<template #example>
<DecorativeElementExample/>
</template>
<template #code>

```vue
<!--@include: ./components/divider/DecorativeElementExample.vue-->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const SimpleExample = defineClientComponent(() =>  import('./components/divider/SimpleExample.vue'));
const OrientationExample = defineClientComponent(() =>  import('./components/divider/OrientationExample.vue'));
const VerticalUseCaseExample = defineClientComponent(() =>  import('./components/divider/VerticalUseCaseExample.vue'));
const HorizontalUseCaseExample = defineClientComponent(() =>  import('./components/divider/HorizontalUseCaseExample.vue'));
const DecorativeElementExample = defineClientComponent(() =>  import('./components/divider/DecorativeElementExample.vue'));
</script>
