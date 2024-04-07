# VCalendarEvent Examples

## Basic

<code-tab>
<template #example>
<BasicExample/>
</template>
<template #code>

```vue
<!--@include: ./components/calendar-event/BasicExample.vue-->
```

</template>
</code-tab>

## Heading

<code-tab>
<template #example>
<HeadingExample/>
</template>
<template #code>

```vue
<!--@include: ./components/calendar-event/HeadingExample.vue-->
```

</template>
</code-tab>

## Description

<code-tab>
<template #example>
<DescriptionExample/>
</template>
<template #code>

```vue
<!--@include: ./components/calendar-event/DescriptionExample.vue-->
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
<!--@include: ./components/calendar-event/AppearanceExample.vue-->
```

</template>
</code-tab>

## Connotation

<code-tab>
<template #example>
<ConnotationExample/>
</template>
<template #code>

```vue
<!--@include: ./components/calendar-event/ConnotationExample.vue-->
```

</template>
</code-tab>

## Subtle calendar event with connotation

<code-tab>
<template #example>
<SubtitleCalendarEventExample/>
</template>
<template #code>

```vue
<!--@include: ./components/calendar-event/SubtitleCalendarEventExample.vue-->
```

</template>
</code-tab>

<script setup lang="ts">
import { defineClientComponent } from 'vitepress';

const BasicExample = defineClientComponent(() =>  import("./components/calendar-event/BasicExample.vue"));
const HeadingExample = defineClientComponent(() =>  import("./components/calendar-event/HeadingExample.vue"));
const AppearanceExample = defineClientComponent(() =>  import("./components/calendar-event/AppearanceExample.vue"));
const ConnotationExample = defineClientComponent(() =>  import("./components/calendar-event/ConnotationExample.vue"));
const SubtitleCalendarEventExample = defineClientComponent(() =>  import("./components/calendar-event/SubtitleCalendarEventExample.vue"));
const DescriptionExample = defineClientComponent(() =>  import("./components/calendar-event/DescriptionExample.vue"));

</script>
