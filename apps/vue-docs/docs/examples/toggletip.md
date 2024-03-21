# Toggletip Examples

## Anchor

<code-tab visible-overflow>
<template #example>
<AnchorExample />
</template>
<template #code>

```vue
<!--@include: ./components/toggletip/AnchorExample.vue -->
```

</template>
</code-tab>

## Open

<code-tab visible-overflow>
<template #example>
<OpenExample />
</template>
<template #code>

```vue
<!--@include: ./components/toggletip/OpenExample.vue -->
```

</template>
</code-tab>

## Headline

<code-tab visible-overflow>
<template #example>
<HeadlineExample />
</template>
<template #code>

```vue
<!--@include: ./components/toggletip/HeadlineExample.vue -->
```

</template>
</code-tab>

## Alternate

<code-tab visible-overflow>
<template #example>
<AlternateExample />
</template>
<template #code>

```vue
<!--@include: ./components/toggletip/AlternateExample.vue -->
```

</template>
</code-tab>

## Placement

<code-tab visible-overflow>
<template #example>
<PlacementExample />
</template>
<template #code>

```vue
<!--@include: ./components/toggletip/PlacementExample.vue -->
```

</template>
</code-tab>

## Action Items

<code-tab visible-overflow>
<template #example>
<ActionItemsExample />
</template>
<template #code>

```vue
<!--@include: ./components/toggletip/ActionItemsExample.vue -->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const AnchorExample = defineClientComponent(() =>  import('./components/toggletip/AnchorExample.vue'));
const OpenExample = defineClientComponent(() =>  import('./components/toggletip/OpenExample.vue'));
const HeadlineExample = defineClientComponent(() =>  import('./components/toggletip/HeadlineExample.vue'));
const AlternateExample = defineClientComponent(() =>  import('./components/toggletip/AlternateExample.vue'));
const PlacementExample = defineClientComponent(() =>  import('./components/toggletip/PlacementExample.vue'));
const ActionItemsExample = defineClientComponent(() =>  import('./components/toggletip/ActionItemsExample.vue'));
</script>
