# VCombobox Examples

## Default Slot

<code-tab visible-overflow>
<template #example>
<DefaultSlotExample />
</template>
<template #code>

```vue
<!--@include: ./components/combobox/DefaultSlotExample.vue -->
```

</template>
</code-tab>

## Label

<code-tab visible-overflow>
<template #example>
<LabelExample />
</template>
<template #code>

```vue
<!--@include: ./components/combobox/LabelExample.vue -->
```

</template>
</code-tab>

## Value

<code-tab visible-overflow>
<template #example>
<ValueExample />
</template>
<template #code>

```vue
<!--@include: ./components/combobox/ValueExample.vue -->
```

</template>
</code-tab>

## Placeholder

<code-tab visible-overflow>
<template #example>
<PlaceholderExample />
</template>
<template #code>

```vue
<!--@include: ./components/combobox/PlaceholderExample.vue -->
```

</template>
</code-tab>

## Autocomplete

<code-tab visible-overflow>
<template #example>
<AutocompleteExample />
</template>
<template #code>

```vue
<!--@include: ./components/combobox/AutocompleteExample.vue -->
```

</template>
</code-tab>

## Open

<code-tab visible-overflow>
<template #example>
<OpenExample/>
</template>
<template #code>

```vue
<!--@include: ./components/combobox/OpenExample.vue -->
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
<!--@include: ./components/combobox/PlacementExample.vue -->
```

</template>
</code-tab>

## Disabled

<code-tab visible-overflow>
<template #example>
<DisabledExample />
</template>
<template #code>

```vue
<!--@include: ./components/combobox/DisabledExample.vue -->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from "../custom/CodeTab.vue";
import { defineClientComponent } from 'vitepress';

const DefaultSlotExample = defineClientComponent(() =>  import("./components/combobox/DefaultSlotExample.vue"));
const LabelExample = defineClientComponent(() =>  import("./components/combobox/LabelExample.vue"));
const ValueExample = defineClientComponent(() => import ("./components/combobox/ValueExample.vue"));
const PlaceholderExample = defineClientComponent(() => import("./components/combobox/PlaceholderExample.vue"));
const AutocompleteExample = defineClientComponent(() => import ("./components/combobox/AutocompleteExample.vue"));
const OpenExample = defineClientComponent(() => import ("./components/combobox/OpenExample.vue"));
const DisabledExample = defineClientComponent(() => import("./components/combobox/DisabledExample.vue"));
const PlacementExample = defineClientComponent(() => import("./components/combobox/PlacementExample.vue"));
</script>
