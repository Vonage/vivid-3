# VSideDrawer Examples

## Basic
<code-tab no-padding no-overflow>
<template #example>
<BasicExample/>
</template>
<template #code>

```vue
<!--@include: ./components/side-drawer/BasicExample.vue-->
```
</template>
</code-tab>

## Collapsible
<code-tab no-padding no-overflow>
<template #example>
<CollapsibleExample/>
</template>
<template #code>

```vue
<!--@include: ./components/side-drawer/CollapsibleExample.vue-->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const BasicExample = defineClientComponent(() =>  import('./components/side-drawer/BasicExample.vue'));
const CollapsibleExample = defineClientComponent(() =>  import('./components/side-drawer/CollapsibleExample.vue'));
</script>
