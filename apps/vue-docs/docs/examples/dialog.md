# VDialog Examples

## Dialog
<code-tab>
<template #example>
<DialogExample />
</template>
<template #code>

```vue
<!--@include: ./components/dialog/DialogExample.vue -->
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
<!--@include: ./components/dialog/HeadlineExample.vue -->
```
</template>
</code-tab>

## Subtitle
<code-tab>
<template #example>
<SubtitleExample />
</template>
<template #code>

```vue
<!--@include: ./components/dialog/SubtitleExample.vue -->
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
<!--@include: ./components/dialog/IconExample.vue -->
```
</template>
</code-tab>

## Icon-placement
<code-tab>
<template #example>
<IconPlacementExample />
</template>
<template #code>

```vue
<!--@include: ./components/dialog/IconPlacementExample.vue -->
```
</template>
</code-tab>

## Open
<code-tab>
<template #example>
<OpenExample />
</template>
<template #code>

```vue
<!--@include: ./components/dialog/OpenExample.vue -->
```
</template>
</code-tab>

## Return Value
<code-tab>
<template #example>
<ReturnValueExample />
</template>
<template #code>

```vue
<!--@include: ./components/dialog/ReturnValueExample.vue -->
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
<!--@include: ./components/dialog/GraphicExample.vue -->
```
</template>
</code-tab>

## Body
<code-tab>
<template #example>
<BodyExample />
</template>
<template #code>

```vue
<!--@include: ./components/dialog/BodyExample.vue -->
```
</template>
</code-tab>

## Full-width-body
<code-tab>
<template #example>
<FullWidthBodyExample />
</template>
<template #code>

```vue
<!--@include: ./components/dialog/FullWidthBodyExample.vue -->
```
</template>
</code-tab>

## Footer
<code-tab>
<template #example>
<FooterExample />
</template>
<template #code>

```vue
<!--@include: ./components/dialog/FooterExample.vue -->
```
</template>
</code-tab>

## Main
<code-tab>
<template #example>
<MainExample />
</template>
<template #code>

```vue
<!--@include: ./components/dialog/MainExample.vue -->
```
</template>
</code-tab>

## Inline min & Max size
<code-tab>
<template #example>
<InlineMinMaxSizeExample />
</template>
<template #code>

```vue
<!--@include: ./components/dialog/InlineMinMaxSizeExample.vue -->
```
</template>
</code-tab>

## Block-Size
<code-tab>
<template #example>
<BlockSizeExample />
</template>
<template #code>

```vue
<!--@include: ./components/dialog/BlockSizeExample.vue -->
```
</template>
</code-tab>

## Close
<code-tab>
<template #example>
<CloseEventExample />
</template>
<template #code>

```vue
<!--@include: ./components/dialog/CloseEventExample.vue -->
```
</template>
</code-tab>

## show()
<code-tab>
<template #example>
<ShowExample />
</template>
<template #code>

```vue
<!--@include: ./components/dialog/ShowExample.vue -->
```
</template>
</code-tab>

## showModal()
<code-tab>
<template #example>
<ShowModalExample />
</template>
<template #code>

```vue
<!--@include: ./components/dialog/ShowModalExample.vue -->
```
</template>
</code-tab>

## close()
<code-tab>
<template #example>
<CloseExample />
</template>
<template #code>

```vue
<!--@include: ./components/dialog/CloseExample.vue -->
```
</template>
</code-tab>

## Dialog Form
<code-tab>
<template #example>
<DialogFormExample />
</template>
<template #code>

```vue
<!--@include: ./components/dialog/DialogFormExample.vue -->
```
</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const DialogExample = defineClientComponent(() =>  import('./components/dialog/DialogExample.vue'));
const HeadlineExample = defineClientComponent(() =>  import('./components/dialog/HeadlineExample.vue'));
const SubtitleExample = defineClientComponent(() =>  import('./components/dialog/SubtitleExample.vue'));
const IconExample = defineClientComponent(() =>  import('./components/dialog/IconExample.vue'));
const IconPlacementExample = defineClientComponent(() =>  import('./components/dialog/IconPlacementExample.vue'));
const OpenExample = defineClientComponent(() =>  import('./components/dialog/OpenExample.vue'));
const ReturnValueExample = defineClientComponent(() =>  import('./components/dialog/ReturnValueExample.vue'));
const GraphicExample = defineClientComponent(() =>  import('./components/dialog/GraphicExample.vue'));
const BodyExample = defineClientComponent(() =>  import('./components/dialog/BodyExample.vue'));
const FullWidthBodyExample = defineClientComponent(() =>  import('./components/dialog/FullWidthBodyExample.vue'));
const FooterExample = defineClientComponent(() =>  import('./components/dialog/FooterExample.vue'));
const MainExample = defineClientComponent(() =>  import('./components/dialog/MainExample.vue'));
const InlineMinMaxSizeExample = defineClientComponent(() =>  import('./components/dialog/InlineMinMaxSizeExample.vue'));
const BlockSizeExample = defineClientComponent(() =>  import('./components/dialog/BlockSizeExample.vue'));
const CloseEventExample = defineClientComponent(() =>  import('./components/dialog/CloseEventExample.vue'));
const ShowExample = defineClientComponent(() =>  import('./components/dialog/ShowExample.vue'));
const ShowModalExample = defineClientComponent(() =>  import('./components/dialog/ShowModalExample.vue'));
const CloseExample = defineClientComponent(() =>  import('./components/dialog/CloseExample.vue'));
const DialogFormExample = defineClientComponent(() =>  import('./components/dialog/DialogFormExample.vue'));
</script>
