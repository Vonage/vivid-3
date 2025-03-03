## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/pagination';
```

or, if you need to use a unique prefix:

```js
import { registerPagination } from '@vonage/vivid';

registerPagination('your-prefix');
```

```html preview
<script type="module">
	import { registerPagination } from '@vonage/vivid';
	registerPagination('your-prefix');
</script>

<your-prefix-pagination total="10"></your-prefix-pagination>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VPagination } from '@vonage/vivid-vue';
</script>

<template>
	<VPagination total="10" />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Properties

<div class="table-wrapper">

| Name             | Type                                               | Description                                                       |
| ---------------- | -------------------------------------------------- | ----------------------------------------------------------------- |
| `nav-icons`      | `boolean`                                          | Changes the Previous and Next buttons to chevron icons            |
| `pagesList`      | `number[]`                                         | An immutable array that represents the current pagination's state |
| `selected-index` | `number`                                           | Index of the currently selected page                              |
| `shape`          | `rounded` (default), `pill`                        | Sets the shapes of the navigation buttons                         |
| `size`           | `super-condensed` (default), `condensed`, `normal` | Sets the size of the navigation buttons                           |
| `total`          | `number`                                           | Total number of pages to navigate                                 |

</div>

### Events

<div class="table-wrapper">

| Name                | Type                                                                    | Bubbles | Composed | Description                  |
| ------------------- | ----------------------------------------------------------------------- | ------- | -------- | ---------------------------- |
| `pagination-change` | `CustomEvent<{selectedIndex: number, total: number, oldIndex: number}>` | Yes     | Yes      | Fires when the page changes. |

</div>
