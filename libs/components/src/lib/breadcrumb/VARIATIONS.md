## Text

Use the `text` attribute on the **breadcrumb-item** to set its text.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VBreadcrumb, VBreadcrumbItem } from '@vonage/vivid-vue';
</script>

<template>
	<VBreadcrumb>
		<VBreadcrumbItem text="Breadcrumb text" />
		<VBreadcrumbItem text="Breadcrumb text" />
	</VBreadcrumb>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-breadcrumb>
	<vwc-breadcrumb-item text="Breadcrumb text"></vwc-breadcrumb-item>
	<vwc-breadcrumb-item text="Breadcrumb text"></vwc-breadcrumb-item>
</vwc-breadcrumb>
```

</vwc-tab-panel>
</vwc-tabs>

## Href

Use the `href` attribute on the **breadcrumb-item** to set its link.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VBreadcrumb, VBreadcrumbItem } from '@vonage/vivid-vue';
</script>

<template>
	<VBreadcrumb>
		<VBreadcrumbItem text="Breadcrumb" href="#" />
		<VBreadcrumbItem text="Breadcrumb" href="#" />
		<VBreadcrumbItem text="Breadcrumb" href="#" />
	</VBreadcrumb>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-breadcrumb>
	<vwc-breadcrumb-item text="Breadcrumb" href="#"></vwc-breadcrumb-item>
	<vwc-breadcrumb-item text="Breadcrumb" href="#"></vwc-breadcrumb-item>
	<vwc-breadcrumb-item text="Breadcrumb" href="#"></vwc-breadcrumb-item>
</vwc-breadcrumb>
```

</vwc-tab-panel>
</vwc-tabs>
