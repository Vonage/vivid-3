## Labelling

### Label Text

Use the `label` attribute to provide a visible label for the Checkbox.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCheckbox } from '@vonage/vivid-vue';
</script>

<template>
	<VCheckbox label="Use signed Webhooks"></VCheckbox>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-checkbox label="Use signed Webhooks"></vwc-checkbox>
```

</vwc-tab-panel>
</vwc-tabs>

### Helper Text

Use the `helper-text` attribute or slot to provide additional context or instructions for the Checkbox.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCheckbox } from '@vonage/vivid-vue';
</script>

<template>
	<VCheckbox label="Use signed Webhooks" helper-text="Signed Webhooks are a way to verify that the request is coming from Vonage."></VCheckbox>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-checkbox label="Use signed Webhooks" helper-text="Signed Webhooks are a way to verify that the request is coming from Vonage."></vwc-checkbox>
```

</vwc-tab-panel>
</vwc-tabs>

## States

### Checked

The `checked` property or `current-checked` attribute controls the checked state of the Checkbox.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCheckbox } from '@vonage/vivid-vue';
</script>

<template>
	<VCheckbox label="Use signed Webhooks" checked></VCheckbox>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-checkbox label="Use signed Webhooks" checked></vwc-checkbox>
```

</vwc-tab-panel>
</vwc-tabs>

### Indeterminate

Checkboxes support an indeterminate state, which indicates that the Checkbox is neither checked nor unchecked.

The indeterminate state is mainly used to implement Select all / none functionality.

Use the `indeterminate` property to set the Checkbox to indeterminate.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCheckbox } from '@vonage/vivid-vue';
</script>

<template>
	<VCheckbox label="Select all" indeterminate></VCheckbox>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-checkbox label="Select all"></vwc-checkbox>

<script>
	document.querySelector('vwc-checkbox').indeterminate = true;
</script>
```

</vwc-tab-panel>
</vwc-tabs>

### Disabled

Toggle the `disabled` member to disable/enable the Checkbox.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCheckbox } from '@vonage/vivid-vue';
</script>

<template><VCheckbox disabled></VCheckbox> <VCheckbox disabled checked></VCheckbox></template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-checkbox disabled></vwc-checkbox> <vwc-checkbox disabled checked></vwc-checkbox>
```

</vwc-tab-panel>
</vwc-tabs>

### Read Only

Set the `readonly` member to specify a Checkbox is read-only.
A read-only Checkbox cannot be modified (however it can be focused and tabbed into).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCheckbox } from '@vonage/vivid-vue';
</script>

<template><VCheckbox readonly></VCheckbox> <VCheckbox readonly checked></VCheckbox></template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-checkbox readonly></vwc-checkbox> <vwc-checkbox readonly checked></vwc-checkbox>
```

</vwc-tab-panel>
</vwc-tabs>

## Validation Feedback

### Error Text

The `error-text` attribute provides a custom error message. Any current error state will be overridden by `error-text`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCheckbox } from '@vonage/vivid-vue';
</script>

<template>
	<VCheckbox label="I agree to the terms and conditions" error-text="You must agree to the terms and conditions to proceed"></VCheckbox>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-checkbox label="I agree to the terms and conditions" error-text="You must agree to the terms and conditions to proceed"></vwc-checkbox>
```

</vwc-tab-panel>
</vwc-tabs>

### Success Text

The `success-text` attribute provides a custom success message. Any current error state will be overridden by `success-text`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCheckbox } from '@vonage/vivid-vue';
</script>

<template>
	<VCheckbox label="A default checkbox" success-text="Success text" checked></VCheckbox>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-checkbox label="A default checkbox" success-text="Success text" checked></vwc-checkbox>
```

</vwc-tab-panel>
</vwc-tabs>

## Connotation

Use the `connotation` attribute to set the Checkbox color.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCheckbox } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VCheckbox connotation="accent"></VCheckbox>
		<VCheckbox connotation="accent" checked></VCheckbox>
		<VCheckbox connotation="cta"></VCheckbox>
		<VCheckbox connotation="cta" checked></VCheckbox>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	gap: 2px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div class="container">
	<vwc-checkbox connotation="accent"></vwc-checkbox>
	<vwc-checkbox connotation="accent" checked></vwc-checkbox>
	<vwc-checkbox connotation="cta"></vwc-checkbox>
	<vwc-checkbox connotation="cta" checked></vwc-checkbox>
</div>

<style>
	.container {
		display: flex;
		gap: 2px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>
