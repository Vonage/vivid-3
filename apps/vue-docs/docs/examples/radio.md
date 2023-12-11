# VRadio Examples

## Label
<code-tab>
<template #example>
<LabelExample />
</template>
<template #code>

```vue
<!--@include: ./components/radio/LabelExample.vue -->
```
</template>
</code-tab>

## Checked
<code-tab>
<template #example>
<CheckedExample />
</template>
<template #code>

```vue
<!--@include: ./components/radio/CheckedExample.vue -->
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
<!--@include: ./components/radio/DisabledExample.vue -->
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
<!--@include: ./components/radio/ValueExample.vue -->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const LabelExample = defineClientComponent(() =>  import('./components/radio/LabelExample.vue'));
const CheckedExample = defineClientComponent(() =>  import('./components/radio/CheckedExample.vue'));
const DisabledExample = defineClientComponent(() =>  import('./components/radio/DisabledExample.vue'));
const ValueExample = defineClientComponent(() =>  import('./components/radio/ValueExample.vue'));
</script>
