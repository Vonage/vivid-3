# VSwitch Examples

<code-tab>
<template #example>
<BasicExample/>
</template>
<template #code>

```vue
<!--@include: ./components/switch/BasicExample.vue-->
```
</template>
</code-tab>


## Checked

<code-tab>
<template #example>
<CheckedExample/>
</template>
<template #code>

```vue
<!--@include: ./components/switch/CheckedExample.vue-->
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
<!--@include: ./components/switch/DisabledExample.vue-->
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
<!--@include: ./components/switch/ReadonlyExample.vue-->
```
</template>
</code-tab>

## Value

<code-tab>
<template #example>
<ReadonlyExample/>
</template>
<template #code>

```vue
<!--@include: ./components/switch/ReadonlyExample.vue-->
```
</template>
</code-tab>


## Name

<code-tab>
<template #example>
<NameExample/>
</template>
<template #code>

```vue
<!--@include: ./components/switch/NameExample.vue-->
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
<!--@include: ./components/switch/LabelExample.vue-->
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
<!--@include: ./components/switch/ConnotationExample.vue-->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const BasicExample = defineClientComponent(() =>  import('./components/switch/BasicExample.vue'));
const NameExample = defineClientComponent(() =>  import('./components/switch/NameExample.vue'));
const LabelExample = defineClientComponent(() =>  import('./components/switch/LabelExample.vue'));
const CheckedExample = defineClientComponent(() =>  import('./components/switch/CheckedExample.vue'));
const ReadonlyExample = defineClientComponent(() =>  import('./components/switch/ReadonlyExample.vue'));
const DisabledExample = defineClientComponent(() =>  import('./components/switch/DisabledExample.vue'));
const ConnotationExample = defineClientComponent(() =>  import('./components/switch/ConnotationExample.vue'));
const ValueExample = defineClientComponent(() =>  import('./components/switch/NameExample.vue'));
</script>
