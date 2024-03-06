# VCheckbox Examples

## Label

<code-tab>
<template #example>
<LabelExample />
</template>
<template #code>

```vue
<!--@include: ./components/checkbox/LabelExample.vue -->
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
<!--@include: ./components/checkbox/CheckedExample.vue -->
```

</template>
</code-tab>

## Indeterminate

<code-tab>
<template #example>
<IndeterminateExample />
</template>
<template #code>

```vue
<!--@include: ./components/checkbox/IndeterminateExample.vue -->
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
<!--@include: ./components/checkbox/DisabledExample.vue -->
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
<!--@include: ./components/checkbox/ReadonlyExample.vue -->
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
<!--@include: ./components/checkbox/ValueExample.vue -->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const LabelExample = defineClientComponent(() =>  import('./components/checkbox/LabelExample.vue'));
const CheckedExample = defineClientComponent(() =>  import('./components/checkbox/CheckedExample.vue'));
const IndeterminateExample = defineClientComponent(() =>  import('./components/checkbox/IndeterminateExample.vue'));
const DisabledExample = defineClientComponent(() =>  import('./components/checkbox/DisabledExample.vue'));
const ReadonlyExample = defineClientComponent(() =>  import('./components/checkbox/ReadonlyExample.vue'));
const ValueExample = defineClientComponent(() =>  import('./components/checkbox/ValueExample.vue'));
</script>
