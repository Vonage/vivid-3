# Status

The Status component is used to clearly communicate system states and outcomes, such as success, information, warnings, or alerts.

<docs-do-dont>
<docs-do slot="description">

**Use Status when...**

- Showing passive state
- Communicating outcomes or progress
- Information is contextual
- No interuption is needed

</docs-do>

<docs-do dont>

**Don't use Status when...**

- Immediate attention is required
- User action is blocked
- Screen reader announcement is needed
- Message is critical or urgent

</docs-do>
</docs-do-dont>

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
	<VStatus connotation="information" status="Information">Check the terms and conditions carefully</VStatus>
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

<your-prefix-status status="Information" connotation="information">Check the terms and conditions carefully</your-prefix-status>
```

</vwc-tab-panel>
</vwc-tabs>

## Connotation

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
		<VStatus connotation="success" status="Success">Transaction complete</VStatus>
		<VStatus connotation="information" status="Informatoin">Additional details are available</VStatus>
		<VStatus connotation="warning" status="Warning">Action may be required</VStatus>
		<VStatus connotation="alert" status="Alert">An error has occurred</VStatus>
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
	<vwc-status connotation="success" status="Success">Transaction complete</vwc-status>
	<vwc-status connotation="information" status="Info">Additional details are available</vwc-status>
	<vwc-status connotation="warning" status="Warning">Action may be required</vwc-status>
	<vwc-status connotation="alert" status="Alert">An error has occurred</vwc-status>
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

## Status

The `status` attribute defines the short, visible label displayed next to the status icon (for example: Completed, New, Draft, Error).

Use concise, meaningful text that clearly communicates the current state of an item, and pair it with an appropriate connotation to reinforce the message visually.

The optional content placed inside the component (see [Default slot](#default-slot) below) provides additional context or explanation and should remain brief and scannable.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VStatus } from '@vonage/vivid-vue';
</script>

<template>
	<div class="status-group">
		<VStatus connotation="success" status="Complete">Request submitted</VStatus>
		<VStatus connotation="information" status="New">Check your inbox</VStatus>
		<VStatus connotation="warning" status="Draft">Review before continuing</VStatus>
		<VStatus connotation="alert" status="Error">Something went wrong</VStatus>
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
	<vwc-status connotation="success" status="Complete">Request submitted</vwc-status>
	<vwc-status connotation="information" status="New">Check your inbox</vwc-status>
	<vwc-status connotation="warning" status="Draft">Review before continuing</vwc-status>
	<vwc-status connotation="alert" status="Error">Something went wrong</vwc-status>
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

Use the default slot to provide additional context or explanation. Content should remain brief and scannable.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VStatus } from '@vonage/vivid-vue';
</script>

<template>
	<VStatus connotation="success" status="Complete">Request submitted</VStatus>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-status connotation="success" status="Complete">Request submitted</vwc-status>
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
	<VStatus connotation="success" status="Complete">
		<template #icon><VIcon name="check-double-solid" /></template>
		Request submitted
	</VStatus>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-status connotation="success" status="Complete">
	<vwc-icon slot="icon" name="check-double-solid"></vwc-icon>
	Request submitted
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
