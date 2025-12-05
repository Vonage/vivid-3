## Common Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VBreadcrumb, VBreadcrumbItem } from '@vonage/vivid-vue';
</script>

<template>
	<VBreadcrumb>
		<VBreadcrumbItem href="#" text="Breadcrumb" />
		<VBreadcrumbItem href="#" text="Breadcrumb" />
		<VBreadcrumbItem href="#" text="Breadcrumb" />
		<VBreadcrumbItem text="Breadcrumb" />
	</VBreadcrumb>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-breadcrumb>
	<vwc-breadcrumb-item href="#" text="Breadcrumb"></vwc-breadcrumb-item>
	<vwc-breadcrumb-item href="#" text="Breadcrumb"></vwc-breadcrumb-item>
	<vwc-breadcrumb-item href="#" text="Breadcrumb"></vwc-breadcrumb-item>
	<vwc-breadcrumb-item text="Breadcrumb"></vwc-breadcrumb-item>
</vwc-breadcrumb>
```

</vwc-tab-panel>
</vwc-tabs>

## Multiple hidden crumbs

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
		<VBreadcrumbItem text="..." />
		<VBreadcrumbItem text="Breadcrumb" />
	</VBreadcrumb>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-breadcrumb>
	<vwc-breadcrumb-item text="Breadcrumb" href="#"></vwc-breadcrumb-item>
	<vwc-breadcrumb-item text="..."></vwc-breadcrumb-item>
	<vwc-breadcrumb-item text="Breadcrumb"></vwc-breadcrumb-item>
</vwc-breadcrumb>
```

</vwc-tab-panel>
</vwc-tabs>
