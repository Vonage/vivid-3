# VIcon Examples

## Icon

<code-tab>
<template #example>
<IconExample />
</template>
<template #code>

```vue
<!--@include: ./components/icon/IconExample.vue -->
```

</template>
</code-tab>

## Name

<code-tab>
<template #example>
<NameExample />
</template>
<template #code>

```vue
<!--@include: ./components/icon/NameExample.vue -->
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
<!--@include: ./components/icon/SizeExample.vue -->
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
<!--@include: ./components/icon/ConnotationExample.vue -->
```

</template>
</code-tab>

## Default

<code-tab>
<template #example>
<DefaultExample />
</template>
<template #code>

```vue
<!--@include: ./components/icon/DefaultExample.vue -->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const IconExample = defineClientComponent(() =>  import('./components/icon/IconExample.vue'));
const NameExample = defineClientComponent(() =>  import('./components/icon/NameExample.vue'));
const SizeExample = defineClientComponent(() =>  import('./components/icon/SizeExample.vue'));
const ConnotationExample = defineClientComponent(() =>  import('./components/icon/ConnotationExample.vue'));
const DefaultExample = defineClientComponent(() =>  import('./components/icon/DefaultExample.vue'));
</script>
