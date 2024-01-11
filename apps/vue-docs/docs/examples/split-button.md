# VSplitButton Examples

## With Menu
<code-tab>
<template #example>
<WithMenu />
</template>
<template #code>

```vue
<!--@include: ./components/split-button/WithMenu.vue -->
```
</template>
</code-tab>

## With Tooltip
<code-tab>
<template #example>
<WithTooltip />
</template>
<template #code>

```vue
<!--@include: ./components/split-button/WithTooltip.vue -->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const WithMenu = defineClientComponent(() =>  import('./components/split-button/WithMenu.vue'));
const WithTooltip = defineClientComponent(() =>  import('./components/split-button/WithTooltip.vue'));
</script>
