# Tree View

Represents a hierarchical list. Any [vwc-tree-item](/components/tree-item/) in the hierarchy may have child vwc-tree-items, and vwc-tree-items that have children may be expanded or collapsed to show or hide the children.
Click [here](https://www.w3.org/WAI/ARIA/apg/patterns/treeview) to learn more about TreeView's Keyboard Interaction and Accessibility.

## Slots

### Default

Read more about [vwc-tree-item](/components/tree-item/).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTreeItem, VTreeView } from '@vonage/vivid-vue';
</script>

<template>
	<VTreeView>
		<VTreeItem text="Tree Item 1" />
		<VTreeItem text="Tree Item 2" />
	</VTreeView>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-tree-view>
	<vwc-tree-item text="Tree Item 1"></vwc-tree-item>
	<vwc-tree-item text="Tree Item 2"></vwc-tree-item>
</vwc-tree-view>
```

</vwc-tab-panel>
</vwc-tabs>

## Use Cases

### Nested Tree

Read more about [vwc-tree-item](/components/tree-item/).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTreeItem, VTreeView } from '@vonage/vivid-vue';
</script>

<template>
	<VTreeView>
		<VTreeItem text="Tree Item 1">
			<template #item><VTreeItem text="Tree Item 1 - 1" /></template>
		</VTreeItem>
		<VTreeItem text="Tree Item 2" />
	</VTreeView>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-tree-view>
	<vwc-tree-item text="Tree Item 1">
		<vwc-tree-item slot="item" text="Tree Item 1 - 1"></vwc-tree-item>
	</vwc-tree-item>
	<vwc-tree-item text="Tree Item 2"></vwc-tree-item>
</vwc-tree-view>
```

</vwc-tab-panel>
</vwc-tabs>
