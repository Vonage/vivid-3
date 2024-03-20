# NavItem Examples

## Text

<code-tab>
<template #example>
<TextExample />
</template>
<template #code>

```vue
<!--@include: ./components/nav-item/TextExample.vue -->
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
<!--@include: ./components/nav-item/IconExample.vue -->
```

</template>
</code-tab>

## Icon with Text

<code-tab>
<template #example>
<IconWithTextExample />
</template>
<template #code>

```vue
<!--@include: ./components/nav-item/IconWithTextExample.vue -->
```

</template>
</code-tab>

## Aria Current

<code-tab>
<template #example>
<AriaCurrentExample />
</template>
<template #code>

```vue
<!--@include: ./components/nav-item/AriaCurrentExample.vue -->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const TextExample = defineClientComponent(() =>  import('./components/nav-item/TextExample.vue'));
const IconExample = defineClientComponent(() =>  import('./components/nav-item/IconExample.vue'));
const IconWithTextExample = defineClientComponent(() =>  import('./components/nav-item/IconWithTextExample.vue'));
const AriaCurrentExample = defineClientComponent(() =>  import('./components/nav-item/AriaCurrentExample.vue'));
</script>
