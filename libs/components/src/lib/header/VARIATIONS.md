## Default Configuration

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VHeader } from '@vonage/vivid-vue';
</script>

<template>
	<VHeader>Header content</VHeader>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-header>Header content</vwc-header>
```

</vwc-tab-panel>
</vwc-tabs>

## Alternate Color Scheme

The `alternate` attribute applies an alternate color scheme, which is in contrast with the current global theme. It will also apply to any slotted Vivid components.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VHeader } from '@vonage/vivid-vue';
</script>

<template>
	<VHeader alternate>Header content</VHeader>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-header alternate>Header content</vwc-header>
```

</vwc-tab-panel>
</vwc-tabs>

## Elevation Shadow

The `elevation-shadow` attribute applies a shadow to the Header.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VHeader } from '@vonage/vivid-vue';
</script>

<template>
	<VHeader elevation-shadow>
		Header content
		<main slot="app-content"><br /></main>
	</VHeader>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-header elevation-shadow>
	Header content
	<main slot="app-content"><br /></main>
</vwc-header>
```

</vwc-tab-panel>
</vwc-tabs>
