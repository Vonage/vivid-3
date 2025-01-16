## Usage

<vwc-tabs>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/breadcrumb';
import '@vonage/vivid/breadcrumb-item';
```

or, if you need to use a unique prefix:

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
	<your-prefix-breadcrumb-item
		href="#"
		text="Breadcrumb"
	></your-prefix-breadcrumb-item>
	<your-prefix-breadcrumb-item
		href="#"
		text="Breadcrumb"
	></your-prefix-breadcrumb-item>
	<your-prefix-breadcrumb-item
		href="#"
		text="Breadcrumb"
	></your-prefix-breadcrumb-item>
</your-prefix-breadcrumb>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VBreadcrumb, VBreadcrumbItem } from '@vonage/vivid-vue';
</script>
<template>
	<VBreadcrumb>
		<VBreadcrumbItem href="#" text="Breadcrumb"></VBreadcrumbItem>
	</VBreadcrumb>
</template>
```

</vwc-tab-panel>
</vwc-tabs>
