# Date Picker Examples

## Date picker
<code-tab>
<template #example>
<DatePickerExample />
</template>
<template #code>

```vue
<!--@include: ./components/date-picker/DatePickerExample.vue -->
```
</template>
</code-tab>

## Label
<code-tab>
<template #example>
<LabelExample />
</template>
<template #code>

```vue
<!--@include: ./components/date-picker/LabelExample.vue -->
```
</template>
</code-tab>

## Helper text
<code-tab>
<template #example>
<HelperTextExample />
</template>
<template #code>

```vue
<!--@include: ./components/date-picker/HelperTextExample.vue -->
```
</template>
</code-tab>

## Error text
<code-tab>
<template #example>
<ErrorTextExample />
</template>
<template #code>

```vue
<!--@include: ./components/date-picker/ErrorTextExample.vue -->
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
<!--@include: ./components/date-picker/DisabledExample.vue -->
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
<!--@include: ./components/date-picker/ReadonlyExample.vue -->
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
<!--@include: ./components/date-picker/ValueExample.vue -->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const DatePickerExample = defineClientComponent(() =>  import('./components/date-picker/DatePickerExample.vue'));
const LabelExample = defineClientComponent(() =>  import('./components/date-picker/LabelExample.vue'));
const HelperTextExample = defineClientComponent(() =>  import('./components/date-picker/HelperTextExample.vue'));
const ErrorTextExample = defineClientComponent(() =>  import('./components/date-picker/ErrorTextExample.vue'));
const DisabledExample = defineClientComponent(() =>  import('./components/date-picker/DisabledExample.vue'));
const ReadonlyExample = defineClientComponent(() =>  import('./components/date-picker/ReadonlyExample.vue'));
const ValueExample = defineClientComponent(() =>  import('./components/date-picker/ValueExample.vue'));
</script>
