## Total

The `total` attribute sets the total amount of pages. If set to `0` (it's default value) both 'Previous' and 'Next' links will be disabled.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VPagination } from '@vonage/vivid-vue';
</script>

<template>
	<VPagination :total="20" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-pagination total="20"></vwc-pagination>
```

</vwc-tab-panel>
</vwc-tabs>

## Selected Index

The `selected-index` attribute sets the currently selected page.

<vwc-note connotation="information">
  <vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>

The value is zero-indexed. It is set to `0` if total pages is `0`.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VPagination } from '@vonage/vivid-vue';
</script>

<template>
	<VPagination :total="20" :selected-index="5" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-pagination total="20" selected-index="5"></vwc-pagination>
```

</vwc-tab-panel>
</vwc-tabs>

## Size

The `size` attribute sets the pagination's buttons sizes.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VPagination } from '@vonage/vivid-vue';
</script>

<template>
	<p>super-condensed (default)</p>
	<VPagination size="super-condensed" :total="20" />
	<p>condensed</p>
	<VPagination size="condensed" :total="20" />
	<p>normal</p>
	<VPagination size="normal" :total="20" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<p>super-condensed (default)</p>
<vwc-pagination size="super-condensed" total="20"></vwc-pagination>
<p>condensed</p>
<vwc-pagination size="condensed" total="20"></vwc-pagination>
<p>normal</p>
<vwc-pagination size="normal" total="20"></vwc-pagination>
```

</vwc-tab-panel>
</vwc-tabs>

## Shape

The `shape` attribute sets the pagination's buttons shapes.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VPagination } from '@vonage/vivid-vue';
</script>

<template>
	<p>rounded (default)</p>
	<VPagination shape="rounded" :total="20" />
	<p>pill</p>
	<VPagination shape="pill" :total="20" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<p>rounded (default)</p>
<vwc-pagination shape="rounded" total="20"></vwc-pagination>
<p>pill</p>
<vwc-pagination shape="pill" total="20"></vwc-pagination>
```

</vwc-tab-panel>
</vwc-tabs>

## Nav Icons

The `nav-icons` attribute changes the pagination's "Previous" and "Next" buttons to be chevron icons.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VPagination } from '@vonage/vivid-vue';
</script>

<template>
	<VPagination :total="20" nav-icons :selected-index="2" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-pagination total="20" nav-icons selected-index="2"></vwc-pagination>
```

</vwc-tab-panel>
</vwc-tabs>
