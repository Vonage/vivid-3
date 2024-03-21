# VCalendar Examples

## Basic

<code-tab>
<template #example>
<BasicExample/>
</template>
<template #code>

```vue
<!--@include: ./components/calendar/BasicExample.vue-->
```

</template>
</code-tab>

## Datetime

<code-tab>
<template #example>
<DateTimeExample/>
</template>
<template #code>

```vue
<!--@include: ./components/calendar/DateTimeExample.vue-->
```

</template>
</code-tab>

## Start Day

<code-tab>
<template #example>
<StartDayExample/>
</template>
<template #code>

```vue
<!--@include: ./components/calendar/StartDayExample.vue-->
```

</template>
</code-tab>

## Locale

<code-tab>
<template #example>
<LocaleExample/>
</template>
<template #code>

```vue
<!--@include: ./components/calendar/LocaleExample.vue-->
```

</template>
</code-tab>

## Hour 12 Example

<code-tab>
<template #example>
<Hour12Example/>
</template>
<template #code>

```vue
<!--@include: ./components/calendar/Hour12Example.vue-->
```

</template>
</code-tab>

<script setup lang="ts">
import { VCalendar } from "@vonage/vivid-vue";
import CodeTab from "../custom/CodeTab.vue";
import { defineClientComponent } from 'vitepress';

const BasicExample = defineClientComponent(() =>  import("./components/calendar/BasicExample.vue"));
const DateTimeExample = defineClientComponent(() =>  import("./components/calendar/DateTimeExample.vue"));
const StartDayExample = defineClientComponent(() =>  import("./components/calendar/StartDayExample.vue"));
const LocaleExample = defineClientComponent(() =>  import("./components/calendar/LocaleExample.vue"));
const Hour12Example = defineClientComponent(() => import("./components/calendar/Hour12Example.vue"));
</script>
