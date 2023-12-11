# VMenuItem Examples

## Menu Item

<code-tab>
<template #example>
<MenuItemExample />
</template>
<template #code>

```vue
<!--@include: ./components/menu-item/MenuItemExample.vue -->
```

</template>
</code-tab>

## Text

<code-tab>
<template #example>
<TextExample />
</template>
<template #code>

```vue
<!--@include: ./components/menu-item/TextExample.vue -->
```

</template>
</code-tab>

## Secondary text

<code-tab>
<template #example>
<SecondaryTextExample />
</template>
<template #code>

```vue
<!--@include: ./components/menu-item/SecondaryTextExample.vue -->
```

</template>
</code-tab>

## Role

<code-tab>
<template #example>
<RoleExample />
</template>
<template #code>

```vue
<!--@include: ./components/menu-item/RoleExample.vue -->
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
<!--@include: ./components/menu-item/IconExample.vue -->
```

</template>
</code-tab>

## Checked

<code-tab>
<template #example>
<CheckedExample />
</template>
<template #code>

```vue
<!--@include: ./components/menu-item/CheckedExample.vue -->
```

</template>
</code-tab>

## Disabled

<code-tab>
<template #example>
<DisabledExample />
</template>
<template #code>

```vue
<!--@include: ./components/menu-item/DisabledExample.vue -->
```

</template>
</code-tab>

## Submenu

<code-tab>
<template #example>
<SubmenuExample />
</template>
<template #code>

```vue
<!--@include: ./components/menu-item/SubmenuExample.vue -->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const MenuItemExample = defineClientComponent(() =>  import('./components/menu-item/MenuItemExample.vue'));
const TextExample = defineClientComponent(() =>  import('./components/menu-item/TextExample.vue'));
const SecondaryTextExample = defineClientComponent(() =>  import('./components/menu-item/SecondaryTextExample.vue'));
const RoleExample = defineClientComponent(() =>  import('./components/menu-item/RoleExample.vue'));
const IconExample = defineClientComponent(() =>  import('./components/menu-item/IconExample.vue'));
const CheckedExample = defineClientComponent(() =>  import('./components/menu-item/CheckedExample.vue'));
const DisabledExample = defineClientComponent(() =>  import('./components/menu-item/DisabledExample.vue'));
const SubmenuExample = defineClientComponent(() =>  import('./components/menu-item/SubmenuExample.vue'));
</script>
