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

```js
import { registerStatus } from '@vonage/vivid';

registerStatus('your-prefix');
```

```html preview
<script type="module">
	import { registerStatus } from '@vonage/vivid';
	registerStatus('your-prefix');
</script>

<div class="status-group">
	<your-prefix-status connotation="success" status="Positive">Description</your-prefix-status>
	<your-prefix-status connotation="information" status="Info">Description</your-prefix-status>
	<your-prefix-status connotation="warning" status="Warning">Description</your-prefix-status>
	<your-prefix-status connotation="alert" status="Alert">Description</your-prefix-status>
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

## Connotation

The **connotation** attribute determines the icon and color. Use `success`, `information`, `warning`, or `alert`.

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
		<VStatus connotation="success" status="Positive">Your request has been submitted.</VStatus>
		<VStatus connotation="information" status="Info">Check your inbox for details.</VStatus>
		<VStatus connotation="warning" status="Warning">Please review before continuing.</VStatus>
		<VStatus connotation="alert" status="Alert">Something went wrong.</VStatus>
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

```js
import { registerStatus } from '@vonage/vivid';

registerStatus('your-prefix');
```

```html preview
<script type="module">
	import { registerStatus } from '@vonage/vivid';
	registerStatus('your-prefix');
</script>

<div class="status-group">
	<your-prefix-status connotation="success" status="Positive">Your request has been submitted.</your-prefix-status>
	<your-prefix-status connotation="information" status="Info">Check your inbox for details.</your-prefix-status>
	<your-prefix-status connotation="warning" status="Warning">Please review before continuing.</your-prefix-status>
	<your-prefix-status connotation="alert" status="Alert">Something went wrong.</your-prefix-status>
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

## Status

The **status** attribute sets the title shown next to the icon (e.g. "Positive", "Info", "Warning", "Alert"). Use any text that fits your context.

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

```js
import { registerStatus } from '@vonage/vivid';

registerStatus('your-prefix');
```

```html preview
<script type="module">
	import { registerStatus } from '@vonage/vivid';
	registerStatus('your-prefix');
</script>

<div class="status-group">
	<your-prefix-status connotation="success" status="Completed">Your request has been submitted.</your-prefix-status>
	<your-prefix-status connotation="information" status="New">Check your inbox for details.</your-prefix-status>
	<your-prefix-status connotation="warning" status="Draft">Please review before continuing.</your-prefix-status>
	<your-prefix-status connotation="alert" status="Error">Something went wrong.</your-prefix-status>
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

### Default Slot

Use the default slot for the description text below the status title.

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
	<VStatus connotation="success" status="Positive">Your request has been submitted successfully.</VStatus>
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

<your-prefix-status connotation="success" status="Positive">Your request has been submitted successfully.</your-prefix-status>
```

</vwc-tab-panel>
</vwc-tabs>

### Icon Slot

Use the **icon** slot or **icon** attribute to provide a custom icon instead of the default icon for the connotation.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```js
import { VIcon, VStatus } from '@vonage/vivid-vue';
```

```vue preview
<script setup lang="ts">
import { VIcon, VStatus } from '@vonage/vivid-vue';
</script>

<template>
	<VStatus connotation="success" status="Positive">
		<template #icon><VIcon name="check-circle-solid" /></template>
		Description
	</VStatus>
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

<your-prefix-status connotation="success" status="Positive">
	<your-prefix-icon slot="icon" name="check-circle-solid"></your-prefix-icon>
	Description
</your-prefix-status>
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
