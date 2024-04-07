# VBanner Examples

## Text

<code-tab>
<template #example>
<TextExample />
</template>
<template #code>

```vue
<!--@include: ./components/banner/TextExample.vue -->
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
<!--@include: ./components/banner/IconExample.vue -->
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
<!--@include: ./components/banner/ConnotationExample.vue -->
```

</template>
</code-tab>

## Removable

<code-tab>
<template #example>
<RemovableExample />
</template>
<template #code>

```vue
<!--@include: ./components/banner/RemovableExample.vue -->
```

</template>
</code-tab>

## Action Items

<code-tab>
<template #example>
<ActionItemsExample />
</template>
<template #code>

```vue
<!--@include: ./components/banner/ActionItemsExample.vue -->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const TextExample = defineClientComponent(() =>  import('./components/banner/TextExample.vue'));
const IconExample = defineClientComponent(() =>  import('./components/banner/IconExample.vue'));
const ConnotationExample = defineClientComponent(() =>  import('./components/banner/ConnotationExample.vue'));
const RemovableExample = defineClientComponent(() =>  import('./components/banner/RemovableExample.vue'));
const ActionItemsExample = defineClientComponent(() =>  import('./components/banner/ActionItemsExample.vue'));
</script>
