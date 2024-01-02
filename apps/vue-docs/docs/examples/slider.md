# VSlider Examples

## Slider

<code-tab>
<template #example>
<SliderExample />
</template>
<template #code>

```vue
<!--@include: ./components/slider/SliderExample.vue -->
```

</template>
</code-tab>

## Min

<code-tab>
<template #example>
<MinExample />
</template>
<template #code>

```vue
<!--@include: ./components/slider/MinExample.vue -->
```

</template>
</code-tab>

## Max

<code-tab>
<template #example>
<MaxExample />
</template>
<template #code>

```vue
<!--@include: ./components/slider/MaxExample.vue -->
```

</template>
</code-tab>

## Step

<code-tab>
<template #example>
<StepExample />
</template>
<template #code>

```vue
<!--@include: ./components/slider/StepExample.vue -->
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
<!--@include: ./components/slider/OrientationExample.vue -->
```

</template>
</code-tab>

## Markers

<code-tab>
<template #example>
<MarkersExample />
</template>
<template #code>

```vue
<!--@include: ./components/slider/MarkersExample.vue -->
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
<!--@include: ./components/slider/DisabledExample.vue -->
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
<!--@include: ./components/slider/ValueExample.vue -->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from "../custom/CodeTab.vue";

import { defineClientComponent } from 'vitepress';

const SliderExample = defineClientComponent(() =>  import('./components/slider/SliderExample.vue'));
const MinExample = defineClientComponent(() =>  import('./components/slider/MinExample.vue'));
const MaxExample = defineClientComponent(() =>  import('./components/slider/MaxExample.vue'));
const StepExample = defineClientComponent(() =>  import('./components/slider/StepExample.vue'));
const OrientationExample = defineClientComponent(() =>  import('./components/slider/OrientationExample.vue'));
const MarkersExample = defineClientComponent(() =>  import('./components/slider/MarkersExample.vue'));
const DisabledExample = defineClientComponent(() =>  import('./components/slider/DisabledExample.vue'));
const ValueExample = defineClientComponent(() =>  import('./components/slider/ValueExample.vue'));
</script>
