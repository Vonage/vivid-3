# VRadioGroup Examples

## Label
<code-tab>
<template #example>
<LabelExample />
</template>
<template #code>

```vue
<!--@include: ./components/radio-group/LabelExample.vue -->
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
<!--@include: ./components/radio-group/DisabledExample.vue -->
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
<!--@include: ./components/radio-group/ReadonlyExample.vue -->
```
</template>
</code-tab>

## Orientation
<code-tab>
<template #example>
<OrientationExample />
</template>
<template #code>

```vue
<!--@include: ./components/radio-group/OrientationExample.vue -->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const LabelExample = defineClientComponent(() =>  import('./components/radio-group/LabelExample.vue'));
const DisabledExample = defineClientComponent(() =>  import('./components/radio-group/DisabledExample.vue'));
const ReadonlyExample = defineClientComponent(() =>  import('./components/radio-group/ReadonlyExample.vue'));
const OrientationExample = defineClientComponent(() =>  import('./components/radio-group/OrientationExample.vue'));
</script>
