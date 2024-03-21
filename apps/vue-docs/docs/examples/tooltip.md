# Tooltip Example

## Anchor

<code-tab visible-overflow>
<template #example>
<AnchorExample/>
</template>
<template #code>

```vue
<!--@include: ./components/tooltip/AnchorExample.vue -->
```

</template>
</code-tab>

## Placement

<code-tab visible-overflow>
<template #example>
<PlacementExample/>
</template>
<template #code>

```vue
<!--@include: ./components/tooltip/PlacementExample.vue -->
```

</template>
</code-tab>

## Inline Size

<code-tab visible-overflow>
<template #example>
<InlineExample/>
</template>
<template #code>

```vue
<!--@include: ./components/tooltip/InlineExample.vue -->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const AnchorExample = defineClientComponent(() =>  import('./components/tooltip/AnchorExample.vue'));
const PlacementExample = defineClientComponent(() =>  import('./components/tooltip/PlacementExample.vue'));
const InlineExample = defineClientComponent(() =>  import('./components/tooltip/InlineExample.vue'));
</script>
