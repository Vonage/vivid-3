# VNumberField Examples

## Number Field

<code-tab>
<template #example>
<NumberFieldExample />
</template>
<template #code>

```vue
<!--@include: ./components/numberfield/NumberFieldExample.vue -->
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
<!--@include: ./components/numberfield/LabelExample.vue -->
```

</template>
</code-tab>

## Placeholder

<code-tab>
<template #example>
<PlaceholderExample />
</template>
<template #code>

```vue
<!--@include: ./components/numberfield/PlaceholderExample.vue -->
```

</template>
</code-tab>

## Value

<code-tab>
<template #example>
<ValueExample />
</template>
<template #code>

```vue
<!--@include: ./components/numberfield/ValueExample.vue -->
```

</template>
</code-tab>

## Value As Number

<code-tab>
<template #example>
<ValueAsNumberExample />
</template>
<template #code>

```vue
<!--@include: ./components/numberfield/ValueAsNumberExample.vue -->
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
<!--@include: ./components/numberfield/HelperTextExample.vue -->
```

</template>
</code-tab>

## Success text

<code-tab>
<template #example>
<SuccessTextExample />
</template>
<template #code>

```vue
<!--@include: ./components/numberfield/SuccessTextExample.vue -->
```

</template>
</code-tab>

## Shape Example

<code-tab>
<template #example>
<ShapeExample />
</template>
<template #code>

```vue
<!--@include: ./components/numberfield/ShapeExample.vue -->
```

</template>
</code-tab>

## Appearance Example

<code-tab>
<template #example>
<AppearanceExample />
</template>
<template #code>

```vue
<!--@include: ./components/numberfield/AppearanceExample.vue -->
```

</template>
</code-tab>

## Disabled Example

<code-tab>
<template #example>
<DisabledExample />
</template>
<template #code>

```vue
<!--@include: ./components/numberfield/DisabledExample.vue -->
```

</template>
</code-tab>

## Readonly Example

<code-tab>
<template #example>
<ReadonlyExample />
</template>
<template #code>

```vue
<!--@include: ./components/numberfield/ReadonlyExample.vue -->
```

</template>
</code-tab>

<script setup lang="ts">
import CodeTab from "../custom/CodeTab.vue";
import { defineClientComponent } from 'vitepress';
const NumberFieldExample = defineClientComponent(() =>  import("./components/numberfield/NumberFieldExample.vue"));
const LabelExample = defineClientComponent(() =>  import("./components/numberfield/LabelExample.vue"));
const PlaceholderExample = defineClientComponent(() =>  import("./components/numberfield/PlaceholderExample.vue"));
const HelperTextExample = defineClientComponent(() =>  import("./components/numberfield/HelperTextExample.vue"));
const ValueExample = defineClientComponent(() =>  import("./components/numberfield/ValueExample.vue"));
const ValueAsNumberExample = defineClientComponent(() =>  import("./components/numberfield/ValueAsNumberExample.vue"));
const SuccessTextExample = defineClientComponent(() =>  import("./components/numberfield/SuccessTextExample.vue"));
const ShapeExample = defineClientComponent(() =>  import("./components/numberfield/ShapeExample.vue"));
const AppearanceExample = defineClientComponent(() =>  import("./components/numberfield/AppearanceExample.vue"));
const DisabledExample = defineClientComponent(() =>  import("./components/numberfield/DisabledExample.vue"));
const ReadonlyExample = defineClientComponent(() =>  import("./components/numberfield/ReadonlyExample.vue"));
</script>
