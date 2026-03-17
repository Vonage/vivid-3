## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { VCheckbox } from '@vonage/vivid-vue';
```

```vue preview
<script setup lang="ts">
import { VCheckbox } from '@vonage/vivid-vue';
</script>

<template>
	<VCheckbox label="Use signed Webhooks" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```js
import { registerCheckbox } from '@vonage/vivid';

registerCheckbox('your-prefix');
```

```html preview
<script type="module">
	import { registerCheckbox } from '@vonage/vivid';
	registerCheckbox('your-prefix');
</script>

<your-prefix-checkbox label="Use signed Webhooks"></your-prefix-checkbox>
```

</vwc-tab-panel>
</vwc-tabs>

Checkbox follows [the W3C specification for `<input type="checkbox">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox).

## Controlling State

### Aria Checked

As an alternative to the `checked` and `indeterminate` members, you can use the `aria-checked` attribute to set the Checkbox's checked state. It reflects the `checked` state as well as the `indeterminate` state with the value "mixed".

> The ariaChecked property of the Element interface reflects the value of the aria-checked attribute, which indicates the current "checked" state of checkboxes.
> A string with one of the following values:
> "true" The element is checked.
> "mixed" Indicates a mixed mode value for a tri-state checkbox.
> "false" The element supports being checked but is not currently checked.
> "undefined" The element does not support being checked.
> -- <cite>[mdn][2]</cite>

[2]: https://developer.mozilla.org/en-US/docs/Web/API/Element/ariaChecked#value

<vwc-note connotation="warning" headline="Deprecated behavior: aria-checked">
	<vwc-icon slot="icon" name="warning-line" label="Warning:"></vwc-icon>

The `aria-checked` prop will no longer set the state (as of 06/25) . It is still functional in the component, but will be updated in a future major release. This will be communicated when it's change becomes a release candidate at the end of the support period.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCheckbox } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VCheckbox aria-checked="true"></VCheckbox>
		<VCheckbox aria-checked="false"></VCheckbox>
		<VCheckbox aria-checked="mixed"></VCheckbox>
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
<vwc-checkbox aria-checked="true"></vwc-checkbox>
<vwc-checkbox aria-checked="false"></vwc-checkbox>
<vwc-checkbox aria-checked="mixed"></vwc-checkbox>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Default

The default slot allows you to use rich content as the Checkbox's label.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCheckbox } from '@vonage/vivid-vue';
</script>

<template>
	<VCheckbox error-text="You need to accept the Terms of service">
		I agree to
		<a href="https://www.vonage.com/legal/" target="_blank"> Vonage Terms of Service </a>
	</VCheckbox>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-checkbox error-text="You need to accept the Terms of service">
	I agree to
	<a href="https://www.vonage.com/legal/" target="_blank"> Vonage Terms of Service </a>
</vwc-checkbox>
```

</vwc-tab-panel>
</vwc-tabs>

### Helper Text

The `helper-text` slot allows you to use rich content as the Checkbox's helper text.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VCheckbox } from '@vonage/vivid-vue';
</script>

<template>
	<VCheckbox class="checkbox" label="Use Signed Webhooks">
		<template #helper-text>
			<span><a href="#">Signed Webhooks</a> are a way to verify that the request is coming from Vonage.</span>
		</template>
	</VCheckbox>
</template>

<style scoped>
.checkbox {
	width: 300px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<style>
	.checkbox {
		width: 300px;
	}
</style>
<vwc-checkbox class="checkbox" label="Use Signed Webhooks">
	<span slot="helper-text"><a href="#">Signed Webhooks</a> are a way to verify that the request is coming from Vonage.</span>
</vwc-checkbox>
```

</vwc-tab-panel>
</vwc-tabs>
