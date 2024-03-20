# VButton Examples

## Label

<code-tab>
<template #example>
<DefaultLabelExample/>
</template>
<template #code>

```vue
<!--@include: ./components/button/DefaultLabelExample.vue-->
```

</template>
</code-tab>

## Appearance

<code-tab>
<template #example>
<AppearanceExample/>
</template>
<template #code>

```vue
<!--@include: ./components/button/AppearanceExample.vue-->
```

</template>
</code-tab>

## Icon

<code-tab>
<template #example>
<IconExample/>
</template>
<template #code>

```vue
<!--@include: ./components/button/IconExample.vue-->
```

</template>
</code-tab>

## Icon with Label

<code-tab>
<template #example>
<IconWithLabelExample/>
</template>
<template #code>

```vue
<!--@include: ./components/button/IconWithLabelExample.vue-->
```

</template>
</code-tab>

## Shape

<code-tab>
<template #example>
<ShapeExample/>
</template>
<template #code>

```vue
<!--@include: ./components/button/ShapeExample.vue-->
```

</template>
</code-tab>

## Size

<code-tab>
<template #example>
<SizeExample/>
</template>
<template #code>

```vue
<!--@include: ./components/button/SizeExample.vue-->
```

</template>
</code-tab>

## Stacked

<code-tab>
<template #example>
<StackedExample/>
</template>
<template #code>

```vue
<!--@include: ./components/button/StackedExample.vue-->
```

</template>
</code-tab>

## Ghost button with connotation

<code-tab>
<template #example>
<GhostButtonConnotationExample/>
</template>
<template #code>

```vue
<!--@include: ./components/button/GhostButtonConnotationExample.vue-->
```

</template>
</code-tab>

## Filled button with connotation

<code-tab>
<template #example>
<FilledButtonConnotationExample/>
</template>
<template #code>

```vue
<!--@include: ./components/button/FilledButtonConnotationExample.vue-->
```

</template>
</code-tab>

## Outlined button with connotation

<code-tab>
<template #example>
<OutlinedButtonExample/>
</template>
<template #code>

```vue
<!--@include: ./components/button/OutlinedButtonExample.vue-->
```

</template>
</code-tab>

## Disabled

<code-tab>
<template #example>
<DisabledExample/>
</template>
<template #code>

```vue
<!--@include: ./components/button/DisabledExample.vue-->
```

</template>
</code-tab>

## Pending

<code-tab>
<template #example>
<PendingExample/>
</template>
<template #code>

```vue
<!--@include: ./components/button/PendingExample.vue-->
```

</template>
</code-tab>

## Toggle Button

<code-tab>
<template #example>
<ToggleButtonExample/>
</template>
<template #code>

```vue
<!--@include: ./components/button/ToggleButtonExample.vue-->
```

</template>
</code-tab>

## Full-width Button

<code-tab>
<template #example>
<FullWidthButtonExample/>
</template>
<template #code>

```vue
<!--@include: ./components/button/FullWidthButtonExample.vue-->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from "vitepress";

const DefaultLabelExample = defineClientComponent(() => import("./components/button/DefaultLabelExample.vue"));
const AppearanceExample = defineClientComponent(() => import("./components/button/AppearanceExample.vue"));
const IconExample = defineClientComponent(() => import("./components/button/IconExample.vue"));
const IconWithLabelExample = defineClientComponent(() => import("./components/button/IconWithLabelExample.vue"));
const ShapeExample = defineClientComponent(() => import("./components/button/ShapeExample.vue"));
const SizeExample = defineClientComponent(() => import("./components/button/SizeExample.vue"));
const StackedExample = defineClientComponent(() => import("./components/button/StackedExample.vue"));
const GhostButtonConnotationExample = defineClientComponent(() => import("./components/button/GhostButtonConnotationExample.vue"));
const FilledButtonConnotationExample = defineClientComponent(() => import("./components/button/FilledButtonConnotationExample.vue"));
const OutlinedButtonExample = defineClientComponent(() => import("./components/button/OutlinedButtonExample.vue"));
const DisabledExample = defineClientComponent(() => import("./components/button/DisabledExample.vue"));
const PendingExample = defineClientComponent(() => import("./components/button/PendingExample.vue"));
const ToggleButtonExample = defineClientComponent(() => import("./components/button/ToggleButtonExample.vue"));
const FullWidthButtonExample = defineClientComponent(() => import("./components/button/FullWidthButtonExample.vue"));
</script>
