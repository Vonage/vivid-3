## Usage

<vwc-tabs>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/divider';
```

or, if you need to use a unique prefix:

```js
import { registerDivider } from '@vonage/vivid';

registerDivider('your-prefix');
```

```html preview
<script type="module">
	import { registerDivider } from '@vonage/vivid';
	registerDivider('your-prefix');
</script>

<your-prefix-divider></your-prefix-text-divider>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VDivider } from '@vonage/vivid-vue';
</script>

<template>
	<VDivider />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Role

<vwc-note connotation="warning" icon="warning-line">

    The `role` attribute in the divider component will be deprecated.

    According to accessibility review - dividers shall not be announced by screen readers.

</vwc-note>

The `role` attribute to express the semantic value of the divider. If it is being use purely for decorative purposes, set it to `presentation`.

See the [Decorative Divider](/components/divider/use-cases/#decorative-divider) use case.

```html preview
<vwc-divider role="presentation"></vwc-divider>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name            | Type                                  | Description                |
| --------------- | ------------------------------------- | -------------------------- |
| **orientation** | `horizontal` (default), `vertical`    | Controls the orientation   |
| **role**        | `separator` (default), `presentation` | Controls the semantic role |

</div>
