# VAvatar Examples

## Avatar

<code-tab>
<template #example>
<AvatarExample />
</template>
<template #code>

```vue
<!--@include: ./components/avatar/AvatarExample.vue -->
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
<!--@include: ./components/avatar/IconExample.vue -->
```

</template>
</code-tab>

## Initials

<code-tab>
<template #example>
<InitialsExample />
</template>
<template #code>

```vue
<!--@include: ./components/avatar/InitialsExample.vue -->
```

</template>
</code-tab>

## Appearance

<code-tab>
<template #example>
<AppearanceExample />
</template>
<template #code>

```vue
<!--@include: ./components/avatar/AppearanceExample.vue -->
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
<!--@include: ./components/avatar/ConnotationExample.vue -->
```

</template>
</code-tab>

## Shape

<code-tab>
<template #example>
<ShapeExample />
</template>
<template #code>

```vue
<!--@include: ./components/avatar/ShapeExample.vue -->
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
<!--@include: ./components/avatar/SizeExample.vue -->
```

</template>
</code-tab>

## Graphic

<code-tab>
<template #example>
<GraphicExample />
</template>
<template #code>

```vue
<!--@include: ./components/avatar/GraphicExample.vue -->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from "../custom/CodeTab.vue";
import { defineClientComponent } from 'vitepress';
const AvatarExample = defineClientComponent(() =>  import('./components/avatar/AvatarExample.vue'));
const IconExample = defineClientComponent(() =>  import('./components/avatar/IconExample.vue'));
const InitialsExample = defineClientComponent(() =>  import('./components/avatar/InitialsExample.vue'));
const AppearanceExample = defineClientComponent(() =>  import('./components/avatar/AppearanceExample.vue'));
const ConnotationExample = defineClientComponent(() =>  import('./components/avatar/ConnotationExample.vue'));
const ShapeExample = defineClientComponent(() =>  import('./components/avatar/ShapeExample.vue'));
const SizeExample = defineClientComponent(() =>  import('./components/avatar/SizeExample.vue'));
const GraphicExample = defineClientComponent(() =>  import('./components/avatar/GraphicExample.vue'));
</script>
