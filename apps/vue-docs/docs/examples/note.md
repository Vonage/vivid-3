# VNote Examples

## Note

<code-tab>
<template #example>
<NoteExample />
</template>
<template #code>

```vue
<!--@include: ./components/note/NoteExample.vue -->
```

</template>
</code-tab>

## Headline

<code-tab>
<template #example>
<HeadlineExample />
</template>
<template #code>

```vue
<!--@include: ./components/note/HeadlineExample.vue -->
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
<!--@include: ./components/note/IconExample.vue -->
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
<!--@include: ./components/note/ConnotationExample.vue -->
```

</template>
</code-tab>

## Default

<code-tab>
<template #example>
<DefaultExample />
</template>
<template #code>

```vue
<!--@include: ./components/note/DefaultExample.vue -->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const NoteExample = defineClientComponent(() =>  import('./components/note/NoteExample.vue'));
const HeadlineExample = defineClientComponent(() =>  import('./components/note/HeadlineExample.vue'));
const IconExample = defineClientComponent(() =>  import('./components/note/IconExample.vue'));
const ConnotationExample = defineClientComponent(() =>  import('./components/note/ConnotationExample.vue'));
const DefaultExample = defineClientComponent(() =>  import('./components/note/DefaultExample.vue'));
</script>
