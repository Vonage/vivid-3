# VAccordion Item Examples

## Heading

<code-tab>
<template #example>
<HeadingExample/>
</template>
<template #code>

```vue
<!--@include: ./components/accordionItem/HeadingExample.vue-->
```

</template>
</code-tab>

## Heading Level

<code-tab>
<template #example>
<HeadingLevelExample/>
</template>
<template #code>

```vue
<!--@include: ./components/accordionItem/HeadingLevelExample.vue-->
```

</template>
</code-tab>

## Expanded

<code-tab>
<template #example>
<ExpandedExample/>
</template>
<template #code>

```vue
<!--@include: ./components/accordionItem/ExpandedExample.vue-->
```

</template>
</code-tab>

## No-Indicator

<code-tab>
<template #example>
<NoIndicatorExample/>
</template>
<template #code>

```vue
<!--@include: ./components/accordionItem/NoIndicatorExample.vue-->
```

</template>
</code-tab>

## Meta

<code-tab>
<template #example>
<MetaExample/>
</template>
<template #code>

```vue
<!--@include: ./components/accordionItem/MetaExample.vue-->
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
<!--@include: ./components/accordionItem/IconExample.vue-->
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
<!--@include: ./components/accordionItem/SizeExample.vue-->
```

</template>
</code-tab>

## Icon-Trailing

<code-tab>
<template #example>
<IconTrailingExample/>
</template>
<template #code>

```vue
<!--@include: ./components/accordionItem/IconTrailingExample.vue-->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const SizeExample = defineClientComponent(() =>  import('./components/accordionItem/SizeExample.vue'));
const IconExample = defineClientComponent(() =>  import('./components/accordionItem/IconExample.vue'));
const MetaExample = defineClientComponent(() =>  import('./components/accordionItem/MetaExample.vue'));
const NoIndicatorExample = defineClientComponent(() =>  import('./components/accordionItem/NoIndicatorExample.vue'));
const ExpandedExample = defineClientComponent(() =>  import('./components/accordion/ExpandedExample.vue'));
const HeadingLevelExample = defineClientComponent(() =>  import('./components/accordionItem/HeadingLevelExample.vue'));
const HeadingExample = defineClientComponent(() =>  import('./components/accordionItem/HeadingExample.vue'));
const IconTrailingExample = defineClientComponent(() =>  import('./components/accordionItem/IconTrailingExample.vue'));
</script>
