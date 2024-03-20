# VProgress Examples

## Min/Max

<code-tab>
<template #example>
<MinMaxExample />
</template>
<template #code>

```vue
<!--@include: ./components/progress/MinMaxExample.vue -->
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
<!--@include: ./components/progress/ValueExample.vue -->
```

</template>
</code-tab>

## Paused

<code-tab>
<template #example>
<PausedExample />
</template>
<template #code>

```vue
<!--@include: ./components/progress/PausedExample.vue -->
```

</template>
</code-tab>

## Paused (Indeterminate)

<code-tab>
<template #example>
<PausedIndeterminateExample />
</template>
<template #code>

```vue
<!--@include: ./components/progress/PausedIndeterminateExample.vue -->
```

</template>
</code-tab>

## Reverse

<code-tab>
<template #example>
<ReverseExample />
</template>
<template #code>

```vue
<!--@include: ./components/progress/ReverseExample.vue -->
```

</template>
</code-tab>

## Connotation

<code-tab>
<template #example>
<ConnotationExample />
</template>
<template #code>

```vue
<!--@include: ./components/progress/ConnotationExample.vue -->
```

</template>
</code-tab>

## Shape

<code-tab>
<template #example>
<ShapeExample />
</template>
<template #code>

```vue
<!--@include: ./components/progress/ShapeExample.vue -->
```

</template>
</code-tab>

## Determinate State

<code-tab>
<template #example>
<DeterminateStateExample />
</template>
<template #code>

```vue
<!--@include: ./components/progress/DeterminateStateExample.vue -->
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
<!--@include: ./components/progress/IndeterminateExample.vue -->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const MinMaxExample = defineClientComponent(() =>  import('./components/progress/MinMaxExample.vue'));
const ValueExample = defineClientComponent(() =>  import('./components/progress/ValueExample.vue'));
const PausedExample = defineClientComponent(() =>  import('./components/progress/PausedExample.vue'));
const PausedIndeterminateExample = defineClientComponent(() =>  import('./components/progress/PausedIndeterminateExample.vue'));
const ReverseExample = defineClientComponent(() =>  import('./components/progress/ReverseExample.vue'));
const ConnotationExample = defineClientComponent(() =>  import('./components/progress/ConnotationExample.vue'));
const ShapeExample = defineClientComponent(() =>  import('./components/progress/ShapeExample.vue'));
const DeterminateStateExample = defineClientComponent(() =>  import('./components/progress/DeterminateStateExample.vue'));
const IndeterminateExample = defineClientComponent(() =>  import('./components/progress/IndeterminateExample.vue'));
</script>
