# Status

Displays a status icon and a short message. Use the **status** attribute for the title and the default slot for the description. The **connotation** attribute (success, information, warning, alert) drives the icon and color.

## Variations

### Connotation

The **connotation** attribute determines the icon and color. Use `success`, `information`, `warning`, or `alert`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VStatus } from '@vonage/vivid-vue';
</script>

<template>
	<div class="status-group">
		<VStatus connotation="success" status="Positive">Description</VStatus>
		<VStatus connotation="information" status="Info">Description</VStatus>
		<VStatus connotation="warning" status="Warning">Description</VStatus>
		<VStatus connotation="alert" status="Alert">Description</VStatus>
	</div>
</template>

<style scoped>
.status-group {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div class="status-group">
	<vwc-status connotation="success" status="Positive">Description</vwc-status>
	<vwc-status connotation="information" status="Info">Description</vwc-status>
	<vwc-status connotation="warning" status="Warning">Description</vwc-status>
	<vwc-status connotation="alert" status="Alert">Description</vwc-status>
</div>

<style>
	.status-group {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line"></vwc-icon>
	<p>Use the Status component to show a short message with a clear type: positive (success), info, warning, or alert. Use the <strong>status</strong> attribute for the status label and the default slot for a brief description.</p>
</vwc-note>

### Status

The **status** attribute sets the title shown next to the icon (e.g. "Positive", "Completed", "Error"). Use any text that fits your context.

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
	<div class="status-group">
		<VStatus connotation="success" status="Completed">Your request has been submitted.</VStatus>
		<VStatus connotation="information" status="New">Check your inbox for details.</VStatus>
		<VStatus connotation="warning" status="Draft">Please review before continuing.</VStatus>
		<VStatus connotation="alert" status="Error">Something went wrong.</VStatus>
	</div>
</template>

<style scoped>
.status-group {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div class="status-group">
	<vwc-status connotation="success" status="Completed">Your request has been submitted.</vwc-status>
	<vwc-status connotation="information" status="New">Check your inbox for details.</vwc-status>
	<vwc-status connotation="warning" status="Draft">Please review before continuing.</vwc-status>
	<vwc-status connotation="alert" status="Error">Something went wrong.</vwc-status>
</div>

<style>
	.status-group {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Default slot

Use the default slot for the description text below the status title.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VStatus } from '@vonage/vivid-vue';
</script>

<template>
	<VStatus connotation="success" status="Positive">Your request has been submitted successfully.</VStatus>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-status connotation="success" status="Positive">Your request has been submitted successfully.</vwc-status>
```

</vwc-tab-panel>
</vwc-tabs>

### Icon slot

Use the **icon** slot or **icon** attribute to provide a custom icon instead of the default for the connotation.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VIcon, VStatus } from '@vonage/vivid-vue';
</script>

<template>
	<VStatus connotation="success" status="Positive">
		<template #icon><VIcon name="check-double-solid" /></template>
		Description
	</VStatus>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-status connotation="success" status="Positive">
	<vwc-icon slot="icon" name="check-double-solid"></vwc-icon>
	Description
</vwc-status>
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
