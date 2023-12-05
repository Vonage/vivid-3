# VProgressRing Examples

## Progress Ring

<code-tab>
<template #example>
<ProgressRingExample />
</template>
<template #code>

```vue
<!--@include: ./components/progress-ring/ProgressRingExample.vue -->
```

</template>
</code-tab>

## Min/Max

<code-tab>
<template #example>
<MinMaxExample />
</template>
<template #code>

```vue
<!--@include: ./components/progress-ring/MinMaxExample.vue -->
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
<!--@include: ./components/progress-ring/ValueExample.vue -->
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
<!--@include: ./components/progress-ring/ConnotationExample.vue -->
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
<!--@include: ./components/progress-ring/PausedExample.vue -->
```

</template>
</code-tab>

## Size

<code-tab>
<template #example>
<SizeExample />
</template>
<template #code>

```vue
<!--@include: ./components/progress-ring/SizeExample.vue -->
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
<!--@include: ./components/progress-ring/DeterminateStateExample.vue -->
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
<!--@include: ./components/progress-ring/IndeterminateExample.vue -->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from "../custom/CodeTab.vue";
import { defineClientComponent } from 'vitepress';

const ProgressRingExample = defineClientComponent(() =>  import('./components/progress-ring/ProgressRingExample.vue'));
const MinMaxExample = defineClientComponent(() =>  import('./components/progress-ring/MinMaxExample.vue'));
const ValueExample = defineClientComponent(() =>  import('./components/progress-ring/ValueExample.vue'));
const ConnotationExample = defineClientComponent(() =>  import('./components/progress-ring/ConnotationExample.vue'));
const PausedExample = defineClientComponent(() =>  import('./components/progress-ring/PausedExample.vue'));
const SizeExample = defineClientComponent(() =>  import('./components/progress-ring/SizeExample.vue'));
const DeterminateStateExample = defineClientComponent(() =>  import('./components/progress-ring/DeterminateStateExample.vue'));
const IndeterminateExample = defineClientComponent(() =>  import('./components/progress-ring/IndeterminateExample.vue'));
</script>
