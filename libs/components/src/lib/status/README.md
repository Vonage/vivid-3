Status shows a short message with a type (positive, info, warning, or alert), an icon, and optional description. Set **connotation** and **status**; use the default slot for the description. Use the **icon** attribute or slot to override the default icon.

## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```js
import { VStatus } from '@vonage/vivid-vue';
```

```vue preview
<script setup lang="ts">
import { VStatus } from '@vonage/vivid-vue';
</script>

<template>
	<VStatus connotation="success" status="Positive">Description</VStatus>
	<VStatus connotation="information" status="Info">Description</VStatus>
	<VStatus connotation="warning" status="Warning">Description</VStatus>
	<VStatus connotation="alert" status="Alert">Description</VStatus>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerStatus } from '@vonage/vivid';

registerStatus('your-prefix');
```

```html preview
<script type="module">
	import { registerStatus } from '@vonage/vivid';
	registerStatus('your-prefix');
</script>

<your-prefix-status connotation="success" status="Positive">Description</your-prefix-status>
<your-prefix-status connotation="information" status="Info">Description</your-prefix-status>
<your-prefix-status connotation="warning" status="Warning">Description</your-prefix-status>
<your-prefix-status connotation="alert" status="Alert">Description</your-prefix-status>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Properties

| **Property**    | **Type**                                                   | **Description**                                                   |
| --------------- | ---------------------------------------------------------- | ----------------------------------------------------------------- |
| **status**      | _string_                                                   | The status title (e.g. "Positive", "Info", "Warning", "Alert").   |
| **connotation** | _Enum_: `success` \| `information` \| `warning` \| `alert` | The connotation; determines icon and color.                       |
| **icon**        | _string_                                                   | Optional custom icon name. Overrides the default per connotation. |

### Slots

| **Name**  | **Description**                           |
| --------- | ----------------------------------------- |
| _default_ | Description text below the title.         |
| **icon**  | Optional custom icon (overrides default). |
