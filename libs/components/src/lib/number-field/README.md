## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNumberField } from '@vonage/vivid-vue';
</script>

<template>
	<VNumberField label="First name" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerNumberField } from '@vonage/vivid';

registerNumberField('your-prefix');
```

```html preview
<script type="module">
	import { registerNumberField } from '@vonage/vivid';
	registerNumberField('your-prefix');
</script>

<your-prefix-number-field label="First name" autofocus></your-prefix-number-field>
```

</vwc-tab-panel>
</vwc-tabs>

## About Number Field

The number-field component allows users to enter a number in a text field. It follows the [native number field](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number) specification.

The component is not appropriate for values that only happen to consist of numbers but aren't strictly speaking a number, e.g. phone numbers or ZIP codes.
Use the [`text-field`](/components/text-field/) component instead.

### Known issues

- Constraint validation with `minlength` and `maxlength` is not supported.

## Step

- Type: `number`
- Default: `1`

Set the `step` attribute to change the step value for the number field.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNumberField } from '@vonage/vivid-vue';
</script>

<template>
	<VNumberField label="With step" :step="0.1" value="1.5" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-number-field label="With step" step="0.1" value="1.5"></vwc-number-field>
```

</vwc-tab-panel>
</vwc-tabs>

## Min

- Type: `number` | `undefined`
- Default: `undefined`

Set the `min` attribute to set the minimum value for the number field.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNumberField } from '@vonage/vivid-vue';
</script>

<template>
	<VNumberField label="With minimum" :min="100" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-number-field label="With minimum" min="100"></vwc-number-field>
```

</vwc-tab-panel>
</vwc-tabs>

## Max

- Type: `number` | `undefined`
- Default: `undefined`

Set the `max` attribute to set the maximum value for the number field.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNumberField } from '@vonage/vivid-vue';
</script>

<template>
	<VNumberField label="With maximum" :max="2" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-number-field label="With maximum" max="2"></vwc-number-field>
```

</vwc-tab-panel>
</vwc-tabs>

## Slots

### Helper-Text

The `helper-text` slot allows you to use rich content as the number field's helper text.

Example showing a link in the helper text:

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNumberField } from '@vonage/vivid-vue';
</script>

<template>
	<VNumberField label="Timeout">
		<template #helper-text>
			<span>The timeout in seconds. <a href="#">Guide to setting timeouts</a></span>
		</template>
	</VNumberField>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-number-field label="Timeout">
	<span slot="helper-text">The timeout in seconds. <a href="#">Guide to setting timeouts</a></span>
</vwc-number-field>
```

</vwc-tab-panel>
</vwc-tabs>

### Contextual-Help

The `contextual-help` slot allows you to add the [Contextual Help](/components/contextual-help/) component next to the label.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VContextualHelp, VNumberField } from '@vonage/vivid-vue';
</script>

<template>
	<VNumberField label="Wanted quantity">
		<template #contextual-help>
			<VContextualHelp>How many apples do you need</VContextualHelp>
		</template>
	</VNumberField>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-number-field label="Wanted quantity">
	<vwc-contextual-help slot="contextual-help">How many apples do you need</vwc-contextual-help>
</vwc-number-field>
```

</vwc-tab-panel>
</vwc-tabs>
