## Usage

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { registerBreadcrumb, registerBreadcrumbItem } from '@vonage/vivid';

registerBreadcrumb('your-prefix');
registerBreadcrumbItem('your-prefix');
```

```html preview
<script type="module">
	import { registerBreadcrumb, registerBreadcrumbItem } from '@vonage/vivid';
	registerBreadcrumb('your-prefix');
	registerBreadcrumbItem('your-prefix');
</script>

<your-prefix-breadcrumb>
	<your-prefix-breadcrumb-item href="#" text="Breadcrumb"></your-prefix-breadcrumb-item>
	<your-prefix-breadcrumb-item href="#" text="Breadcrumb"></your-prefix-breadcrumb-item>
	<your-prefix-breadcrumb-item href="#" text="Breadcrumb"></your-prefix-breadcrumb-item>
</your-prefix-breadcrumb>
```

</vwc-tab-panel>
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VBreadcrumb, VBreadcrumbItem } from '@vonage/vivid-vue';
</script>
<template>
	<VBreadcrumb>
		<VBreadcrumbItem href="#" text="breadcrumb" />
		<VBreadcrumbItem href="#" text="breadcrumb" />
		<VBreadcrumbItem href="#" text="breadcrumb" />
		<VBreadcrumbItem text="breadcrumb" />
	</VBreadcrumb>
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Properties

<div class="table-wrapper">

| Name     | Type     | Description                       |
| -------- | -------- | --------------------------------- |
| **text** | `string` | Sets the **breadcrumb-item** text |
| **href** | `string` | Sets the **breadcrumb-item** href |

</div>
