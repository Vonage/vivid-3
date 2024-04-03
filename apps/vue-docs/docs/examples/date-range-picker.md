# Date Range Picker Examples

## Date range picker

<code-tab>
<template #example>
<DateRangePickerExample />
</template>
<template #code>

```vue
<!--@include: ./components/date-range-picker/DateRangePickerExample.vue -->
```

</template>
</code-tab>

## Label

<code-tab>
<template #example>
<LabelExample />
</template>
<template #code>

```vue
<!--@include: ./components/date-range-picker/LabelExample.vue -->
```

</template>
</code-tab>

## Helper text

<code-tab>
<template #example>
<HelperTextExample />
</template>
<template #code>

```vue
<!--@include: ./components/date-range-picker/HelperTextExample.vue -->
```

</template>
</code-tab>

## Error text

<code-tab>
<template #example>
<ErrorTextExample />
</template>
<template #code>

```vue
<!--@include: ./components/date-range-picker/ErrorTextExample.vue -->
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
<!--@include: ./components/date-range-picker/DisabledExample.vue -->
```

</template>
</code-tab>

## Readonly

<code-tab>
<template #example>
<ReadonlyExample />
</template>
<template #code>

```vue
<!--@include: ./components/date-range-picker/ReadonlyExample.vue -->
```

</template>
</code-tab>

## Min

<code-tab>
<template #example>
<MinExample />
</template>
<template #code>

```vue
<!--@include: ./components/date-range-picker/MinExample.vue -->
```

</template>
</code-tab>

## Max

<code-tab>
<template #example>
<MaxExample />
</template>
<template #code>

```vue
<!--@include: ./components/date-range-picker/MaxExample.vue -->
```

</template>
</code-tab>

## In a form

<code-tab>
<template #example>
<InAFormExample />
</template>
<template #code>

```vue
<!--@include: ./components/date-range-picker/InAFormExample.vue -->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from '../custom/CodeTab.vue';
import { defineClientComponent } from 'vitepress';

const DateRangePickerExample = defineClientComponent(() =>  import('./components/date-range-picker/DateRangePickerExample.vue'));
const LabelExample = defineClientComponent(() =>  import('./components/date-range-picker/LabelExample.vue'));
const HelperTextExample = defineClientComponent(() =>  import('./components/date-range-picker/HelperTextExample.vue'));
const ErrorTextExample = defineClientComponent(() =>  import('./components/date-range-picker/ErrorTextExample.vue'));
const DisabledExample = defineClientComponent(() =>  import('./components/date-range-picker/DisabledExample.vue'));
const ReadonlyExample = defineClientComponent(() =>  import('./components/date-range-picker/ReadonlyExample.vue'));
const MinExample = defineClientComponent(() =>  import('./components/date-range-picker/MinExample.vue'));
const MaxExample = defineClientComponent(() =>  import('./components/date-range-picker/MaxExample.vue'));
const InAFormExample = defineClientComponent(() =>  import('./components/date-range-picker/InAFormExample.vue'));
</script>
