# VTabs Examples

## Tabs

<code-tab>
<template #example>
<TabsExample />
</template>
<template #code>

```vue
<!--@include: ./components/tabs/TabsExample.vue -->
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
<!--@include: ./components/tabs/OrientationExample.vue -->
```

</template>
</code-tab>

## Activeid

<code-tab>
<template #example>
<ActiveidExample />
</template>
<template #code>

```vue
<!--@include: ./components/tabs/ActiveidExample.vue -->
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
<!--@include: ./components/tabs/ConnotationExample.vue -->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const TabsExample = defineClientComponent(() =>  import('./components/tabs/TabsExample.vue'));
const OrientationExample = defineClientComponent(() =>  import('./components/tabs/OrientationExample.vue'));
const ActiveidExample = defineClientComponent(() =>  import('./components/tabs/ActiveidExample.vue'));
const ConnotationExample = defineClientComponent(() =>  import('./components/tabs/ConnotationExample.vue'));
</script>
