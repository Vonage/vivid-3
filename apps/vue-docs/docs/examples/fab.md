# VFab Examples

## Label

<code-tab>
<template #example>
<LabelExample />
</template>
<template #code>

```vue
<!--@include: ./components/fab/LabelExample.vue -->
```

</template>
</code-tab>

## Icon

<code-tab>
<template #example>
<IconExample />
</template>
<template #code>

```vue
<!--@include: ./components/fab/IconExample.vue -->
```

</template>
</code-tab>

## Icon with Label

<code-tab>
<template #example>
<IconWithLabelExample />
</template>
<template #code>

```vue
<!--@include: ./components/fab/IconWithLabelExample.vue -->
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
<!--@include: ./components/fab/ConnotationExample.vue -->
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
<!--@include: ./components/fab/SizeExample.vue -->
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
<!--@include: ./components/fab/DisabledExample.vue -->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const LabelExample = defineClientComponent(() =>  import('./components/fab/LabelExample.vue'));
const IconExample = defineClientComponent(() =>  import('./components/fab/IconExample.vue'));
const IconWithLabelExample = defineClientComponent(() =>  import('./components/fab/IconWithLabelExample.vue'));
const ConnotationExample = defineClientComponent(() =>  import('./components/fab/ConnotationExample.vue'));
const SizeExample = defineClientComponent(() =>  import('./components/fab/SizeExample.vue'));
const DisabledExample = defineClientComponent(() =>  import('./components/fab/DisabledExample.vue'));
</script>
