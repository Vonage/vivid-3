## Connotation

The `connotation` attribute controls the color of the Progress component.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VProgress } from '@vonage/vivid-vue';
</script>
<template>
	<p>accent (default)</p>
	<VProgress :min="0" :max="100" :value="25" connotation="accent" />
	<p>cta</p>
	<VProgress :min="0" :max="100" :value="25" connotation="cta" />
	<p>success</p>
	<VProgress :min="0" :max="100" :value="25" connotation="success" />
	<p>alert</p>
	<VProgress :min="0" :max="100" :value="25" connotation="alert" />
	<p>pacific</p>
	<VProgress :min="0" :max="100" :value="25" connotation="pacific" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<p>accent (default)</p>
<vwc-progress min="0" max="100" value="25" connotation="accent"></vwc-progress>
<p>cta</p>
<vwc-progress min="0" max="100" value="25" connotation="cta"></vwc-progress>
<p>success</p>
<vwc-progress min="0" max="100" value="25" connotation="success"></vwc-progress>
<p>alert</p>
<vwc-progress min="0" max="100" value="25" connotation="alert"></vwc-progress>
<p>pacific</p>
<vwc-progress min="0" max="100" value="25" connotation="pacific"></vwc-progress>
```

</vwc-tab-panel>
</vwc-tabs>

## Shape

The `shape` attribute the border radius.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VProgress } from '@vonage/vivid-vue';
</script>
<template>
	<p>rounded (default)</p>
	<VProgress :min="0" :max="50" :value="25" shape="rounded" />
	<p>sharp</p>
	<VProgress :min="0" :max="50" :value="25" shape="sharp" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<p>rounded (default)</p>
<vwc-progress min="0" max="50" value="25" shape="rounded"></vwc-progress>
<p>sharp</p>
<vwc-progress min="0" max="50" value="25" shape="sharp"></vwc-progress>
```

</vwc-tab-panel>
</vwc-tabs>

## Paused

The `paused` attribute shows a disabled / paused state of the progress.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VProgress } from '@vonage/vivid-vue';
</script>
<template>
	<p>Determinate</p>
	<VProgress :min="0" :max="50" :value="25" paused />
	<p>Indeterminate</p>
	<VProgress :min="0" :max="50" paused />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<p>Determinate</p>
<vwc-progress min="0" max="50" value="25" paused></vwc-progress>
<p>Indeterminate</p>
<vwc-progress min="0" max="50" paused></vwc-progress>
```

</vwc-tab-panel>
</vwc-tabs>

## Reverse

The `reverse` attribute sets the progress from right to left.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VProgress } from '@vonage/vivid-vue';
</script>
<template>
	<p>Determinate</p>
	<VProgress :min="0" :max="50" :value="25" reverse />
	<p>Indeterminate</p>
	<VProgress :min="0" :max="50" reverse />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<p>Determinate</p>
<vwc-progress min="0" max="50" value="25" reverse></vwc-progress>
<p>Indeterminate</p>
<vwc-progress min="0" max="50" reverse></vwc-progress>
```

</vwc-tab-panel>
</vwc-tabs>

## Value

Providing a numeric value to the `value` attribute sets the amount of progress to be displayed in [determinate state](/components/progress/use-cases/#determinate-state). In order to present an [indeterminate state](/components/progress/use-cases/#indeterminate-state) provide a non-numeric value.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VProgress } from '@vonage/vivid-vue';
</script>
<template>
	<p>Determinate</p>
	<VProgress :value="50" aria-label="You are 50% through the process" />
	<p>Indeterminate</p>
	<VProgress aria-label="Loading search results" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<p>Determinate</p>
<vwc-progress value="50" aria-label="You are 50% through the process"></vwc-progress>
<p>Indeterminate</p>
<vwc-progress aria-label="Loading search results"></vwc-progress>
```

</vwc-tab-panel>
</vwc-tabs>

## Min / Max

Use `min` and `max` attributes to determine the range of the progress.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VProgress } from '@vonage/vivid-vue';
</script>
<template>
	<VProgress :min="1" :max="5" :value="2" aria-label="Step 2 of 5" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-progress min="1" max="5" value="2" aria-label="Step 2 of 5"></vwc-progress>
```

</vwc-tab-panel>
</vwc-tabs>
