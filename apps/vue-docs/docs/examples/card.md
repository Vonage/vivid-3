# VCard Examples

## Headline

<code-tab>
<template #example>
<HeadlineExample />
</template>
<template #code>

```vue
<!--@include: ./components/card/HeadlineExample.vue -->
```

</template>
</code-tab>

## Subtitle

<code-tab>
<template #example>
<SubtitleExample/>
</template>
<template #code>

```vue
<!--@include: ./components/card/SubtitleExample.vue-->
```

</template>
</code-tab>

## Elevation

<code-tab>
<template #example>
<ElevationExample/>
</template>
<template #code>

```vue
<!--@include: ./components/card/ElevationExample.vue-->
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
<!--@include: ./components/card/IconExample.vue-->
```

</template>
</code-tab>

## Text

<code-tab>
<template #example>
<TextExample/>
</template>
<template #code>

```vue
<!--@include: ./components/card/TextExample.vue-->
```

</template>
</code-tab>

# Slots

## Graphic

<code-tab>
<template #example>
<GraphicSlotExample/>
</template>
<template #code>

```vue
<!--@include: ./components/card/GraphicSlotExample.vue-->
```

</template>
</code-tab>

## Media

<code-tab>
<template #example>
<MediaSlotExample/>
</template>
<template #code>

```vue
<!--@include: ./components/card/MediaSlotExample.vue-->
```

</template>
</code-tab>

## Meta

<code-tab>
<template #example>
<MetaSlotExample/>
</template>
<template #code>

```vue
<!--@include: ./components/card/MetaSlotExample.vue-->
```

</template>
</code-tab>

## Footer

<code-tab>
<template #example>
<FooterSlotExample/>
</template>
<template #code>

```vue
<!--@include: ./components/card/FooterSlotExample.vue-->
```

</template>
</code-tab>

## Main

<code-tab>
<template #example>
 <MainSlotExample/>
</template>
<template #code>

```vue
<!--@include: ./components/card/MainSlotExample.vue-->
```

</template>
</code-tab>

## Trim headline

<code-tab>
<template #example>
<TrimHeadlineExample/>
</template>
<template #code>

```vue
<!--@include: ./components/card/TrimHeadlineExample.vue-->
```

</template>
</code-tab>

## Trim Subtitle

<code-tab>
<template #example>
<TrimSubtitleExample/>
</template>
<template #code>

```vue
<!--@include: ./components/card/TrimSubtitleExample.vue-->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const HeadlineExample = defineClientComponent(() =>  import('./components/card/HeadlineExample.vue'));
const SubtitleExample = defineClientComponent(() =>  import('./components/card/SubtitleExample.vue'));
const ElevationExample = defineClientComponent(() =>  import('./components/card/ElevationExample.vue'));
const IconExample = defineClientComponent(() =>  import('./components/card/IconExample.vue'));
const MediaSlotExample = defineClientComponent(() =>  import('./components/card/MediaSlotExample.vue'));
const MetaSlotExample = defineClientComponent(() =>  import('./components/card/MetaSlotExample.vue'));
const FooterSlotExample = defineClientComponent(() =>  import('./components/card/FooterSlotExample.vue'));
const TrimHeadlineExample = defineClientComponent(() =>  import('./components/card/TrimHeadlineExample.vue'));
const TrimSubtitleExample = defineClientComponent(() =>  import('./components/card/TrimSubtitleExample.vue'));
const MainSlotExample = defineClientComponent(() =>  import('./components/card/MainSlotExample.vue'));
const GraphicSlotExample = defineClientComponent(() =>  import('./components/card/GraphicSlotExample.vue'));
const TextExample = defineClientComponent(() =>  import('./components/card/TextExample.vue'));
</script>
