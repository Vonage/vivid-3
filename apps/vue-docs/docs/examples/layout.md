# VLayout Examples

## Layout

<code-tab>
<template #example>
<LayoutExample />
</template>
<template #code>

```vue
<!--@include: ./components/layout/LayoutExample.vue -->
```

</template>
</code-tab>

## Column Spacing

<code-tab>
<template #example>
<ColumnSpacingExample />
</template>
<template #code>

```vue
<!--@include: ./components/layout/ColumnSpacingExample.vue -->
```

</template>
</code-tab>

## Column Basis

<code-tab>
<template #example>
<ColumnBasisExample />
</template>
<template #code>

```vue
<!--@include: ./components/layout/ColumnBasisExample.vue -->
```

</template>
</code-tab>

## Auto Sizing

<code-tab>
<template #example>
<AutoSizingExample />
</template>
<template #code>

```vue
<!--@include: ./components/layout/AutoSizingExample.vue -->
```

</template>
</code-tab>

## Gutters

<code-tab>
<template #example>
<GuttersExample />
</template>
<template #code>

```vue
<!--@include: ./components/layout/GuttersExample.vue -->
```

</template>
</code-tab>

## Gutters (inline)

<code-tab>
<template #example>
<GuttersInlineExample />
</template>
<template #code>

```vue
<!--@include: ./components/layout/GuttersInlineExample.vue -->
```

</template>
</code-tab>

## Gutters (block)

<code-tab>
<template #example>
<GuttersBlockExample />
</template>
<template #code>

```vue
<!--@include: ./components/layout/GuttersBlockExample.vue -->
```

</template>
</code-tab>

## Grid-template-columns

<code-tab>
<template #example>
<GridTemplateColumnsExample />
</template>
<template #code>

```vue
<!--@include: ./components/layout/GridTemplateColumnsExample.vue -->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const LayoutExample = defineClientComponent(() =>  import('./components/layout/LayoutExample.vue'));
const ColumnSpacingExample = defineClientComponent(() =>  import('./components/layout/ColumnSpacingExample.vue'));
const ColumnBasisExample = defineClientComponent(() =>  import('./components/layout/ColumnBasisExample.vue'));
const AutoSizingExample = defineClientComponent(() =>  import('./components/layout/AutoSizingExample.vue'));
const GuttersExample = defineClientComponent(() =>  import('./components/layout/GuttersExample.vue'));
const GuttersInlineExample = defineClientComponent(() =>  import('./components/layout/GuttersInlineExample.vue'));
const GuttersBlockExample = defineClientComponent(() =>  import('./components/layout/GuttersBlockExample.vue'));
const GridTemplateColumnsExample = defineClientComponent(() =>  import('./components/layout/GridTemplateColumnsExample.vue'));
</script>
