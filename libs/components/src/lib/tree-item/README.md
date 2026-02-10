# Tree Item

Represents a tree-item custom element.
Read more about [vwc-tree-view](/components/tree-view/).

## Members

### Text

- Type: `string`
- Default: `undefined`

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTreeItem, VTreeView } from '@vonage/vivid-vue';
</script>

<template>
	<VTreeView>
		<VTreeItem text="Tree Item" />
	</VTreeView>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-tree-view>
	<vwc-tree-item text="Tree Item"></vwc-tree-item>
</vwc-tree-view>
```

</vwc-tab-panel>
</vwc-tabs>

### Icon

Use [icon slot](/components/tree-item/#icon-1) or `icon`_(deprecated)_ attribute to set an icon to the tree item.
Check out the [vivid icons gallery](/icons/icons-gallery/) for a list of available icons.

<vwc-note connotation="warning" headline="Deprecated Prop: icon">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `icon` prop is deprecated (as of 05/25) and directly replaced with `icon` slot. `icon` is still functional in the component but will be removed in a future major release. This will be communicated when it's removal becomes a release candidate at the end of the support period.

</vwc-note>

- Type: `string`
- Default: `undefined`

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTreeItem, VTreeView } from '@vonage/vivid-vue';
</script>

<template>
	<VTreeView>
		<VTreeItem text="Tree Item" icon="chat-line" />
	</VTreeView>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-tree-view>
	<vwc-tree-item text="Tree Item" icon="chat-line"></vwc-tree-item>
</vwc-tree-view>
```

</vwc-tab-panel>
</vwc-tabs>

### Selected

Add the `selected` attribute to select the tree item.

- Type: `boolean`
- Default: `false`

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTreeItem, VTreeView } from '@vonage/vivid-vue';
</script>

<template>
	<VTreeView>
		<VTreeItem text="Tree Item" selected />
	</VTreeView>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-tree-view>
	<vwc-tree-item text="Tree Item" selected></vwc-tree-item>
</vwc-tree-view>
```

</vwc-tab-panel>
</vwc-tabs>

### Disabled

Add the `disabled` attribute to disable the tree item.

- Type: `boolean`
- Default: `false`

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTreeItem, VTreeView } from '@vonage/vivid-vue';
</script>

<template>
	<VTreeView>
		<VTreeItem text="Tree Item" disabled />
	</VTreeView>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-tree-view>
	<vwc-tree-item text="Tree Item" disabled></vwc-tree-item>
</vwc-tree-view>
```

</vwc-tab-panel>
</vwc-tabs>

### Expanded

Use the `expanded` attribute to set the tree-item's open state.

- Type: `boolean`
- Default: `false`

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VTreeItem, VTreeView } from '@vonage/vivid-vue';
</script>

<template>
	<VTreeView>
		<VTreeItem text="Tree Item" expanded>
			<template #item><VTreeItem text="Tree Item 1 - 1" /></template>
		</VTreeItem>
	</VTreeView>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-tree-view>
	<vwc-tree-item text="Tree Item" expanded>
		<vwc-tree-item slot="item" text="Tree Item 1 - 1"></vwc-tree-item>
	</vwc-tree-item>
</vwc-tree-view>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Item

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

### Icon

Set the `icon` slot to show an icon before the tree item's text.
If set, the `icon` attribute is ignored.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VIcon, VTreeItem, VTreeView } from '@vonage/vivid-vue';
</script>

<template>
	<VTreeView>
		<VTreeItem text="Tree Item">
			<template #icon><VIcon name="check-circle-solid" connotation="success" /></template>
		</VTreeItem>
	</VTreeView>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-tree-view>
	<vwc-tree-item text="Tree Item">
		<vwc-icon slot="icon" name="check-circle-solid" connotation="success"></vwc-icon>
	</vwc-tree-item>
</vwc-tree-view>
```

</vwc-tab-panel>
</vwc-tabs>

## Events

<div class="table-wrapper">

| Name              | Type                       | Bubbles | Composed | Description                                                            |
| ----------------- | -------------------------- | ------- | -------- | ---------------------------------------------------------------------- |
| `expanded-change` | `CustomEvent<HTMLElement>` | Yes     | Yes      | Fires a custom 'expanded-change' event when the expanded state changes |
| `selected-change` | `CustomEvent<HTMLElement>` | Yes     | Yes      | Fires a custom 'selected-change' event when the selected state changes |

</div>
