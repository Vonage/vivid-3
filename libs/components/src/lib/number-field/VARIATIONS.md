## Labelling

### Label Text

The `label` attribute provides a short description of the purpose of the Number Field.

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
	
	If a visible label can't be used, provide one using the <nobr><code>aria-label</code></nobr> attribute. This ensures screen readers announce the purpose of the element, making it accessible to all users.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNumberField } from '@vonage/vivid-vue';
</script>

<template>
	<VNumberField label="Wanted quantity" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-number-field label="Wanted quantity"></vwc-number-field>
```

</vwc-tab-panel>
</vwc-tabs>

### Placeholder Text

The `placeholder` attribute provides an example of the type of input the user needs to enter.

<vwc-note connotation="information" headline="Accessibility Tip">
	<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
	<p>Avoid using <code>placeholder</code> text as a substitute for a label. Placeholder text is not a reliable label—it disappears when users type and is not always announced by screen readers. Use a <code>label</code> element to ensure the Combobox is both visually and programmatically associated with a descriptive label.</p>
</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNumberField } from '@vonage/vivid-vue';
</script>

<template>
	<VNumberField placeholder="100" label="Wanted quantity" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-number-field placeholder="100" label="Wanted quantity"></vwc-number-field>
```

</vwc-tab-panel>
</vwc-tabs>

### Helper Text

The `helper-text` attribute provides additional information to help the user enter the correct information.

To add HTML to the helper text, use the [helper-text slot](/components/number-field/code/#helper-text-slot).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNumberField } from '@vonage/vivid-vue';
</script>

<template>
	<VNumberField label="Helper text below" helper-text="Help text" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-number-field label="Helper text below" helper-text="Help text"></vwc-number-field>
```

</vwc-tab-panel>
</vwc-tabs>

### Contextual Help

You can add the [Contextual Help](/components/contextual-help/) component using the `contextual-help` slot. It will be displayed next to the label, providing users additional information.

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

## Value

Set the `value` attribute to set the default value for the number field.  
Setting the property on the element will not change the default value, but will change the value shown in the view as well as the submitted value in a form (imitating the native behavior).

<vwc-note connotation="information" headline="Values always use decimal separator">
<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>
<p>Values always use the period (".") as the decimal separator, regardless of the user's locale.
</p>
<p>Only the value on the screen is localized.
</p>
</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNumberField } from '@vonage/vivid-vue';
</script>

<template>
	<VNumberField label="With default value" value="5" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-number-field label="With default value" value="5"></vwc-number-field>
```

</vwc-tab-panel>
</vwc-tabs>

### Value as Number

Use the `valueAsNumber` property to get or set the value as a number. If no valid value is entered in the field, the `valueAsNumber` is `NaN`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview locale-switcher
<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from 'vue';
import { VNumberField } from '@vonage/vivid-vue';

const valueAsNumber = ref('NaN');
const numberField = useTemplateRef<InstanceType<typeof VNumberField>>('number-field');

const updateValue = () => {
	if (numberField.value?.element) {
		valueAsNumber.value = numberField.value.element.valueAsNumber;
	}
};
</script>

<template>
	<div>
		<VNumberField ref="number-field" label="Quantity" @input="updateValue" />
		<p>valueAsNumber: <span :key="valueAsNumber" v-text="valueAsNumber"></span></p>
	</div>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview locale-switcher
<vwc-number-field label="Quantity"></vwc-number-field>
<p>valueAsNumber: <span id="value"></span></p>

<script>
	function update() {
		document.getElementById('value').textContent = document.querySelector('vwc-number-field').valueAsNumber;
	}

	customElements.whenDefined('vwc-number-field').then(update);
	document.querySelector('vwc-number-field').addEventListener('input', update);
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Validation Feedback

### Success Text

The `success-text` attribute provides a custom success message. Any current error state will be overridden by `success-text`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNumberField } from '@vonage/vivid-vue';
</script>

<template>
	<VNumberField label="Valid value" success-text="Great success" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-number-field label="Valid value" success-text="Great success"></vwc-number-field>
```

</vwc-tab-panel>
</vwc-tabs>

## Scale

The `scale` attribute controls the Text Field input element display size.
Use `condensed` in situations when space is limited, for example, inside a Data Grid cell.

<vwc-note connotation="information" headline="Scale instead of Size">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>
	<p>The reason for using <code>scale</code> for form elements and not <code>size</code> (as used in other components such as Button), is that <code>size</code> is a HTML attribute that can be used on <code>input</code> elements (and also Number Field) to control the width of the input.</p>
</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNumberField } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VNumberField label="Condensed" scale="condensed" />
		<VNumberField label="Normal" scale="normal" />
	</div>
</template>

<style>
.container {
	display: flex;
	gap: 16px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div class="container">
	<vwc-number-field label="Condensed" scale="condensed"></vwc-number-field>
	<vwc-number-field label="Normal" scale="normal"></vwc-number-field>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Shape

The `shape` attribute controls the border radius of the Number Field input element.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNumberField } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VNumberField label="Pill" shape="pill" />
		<VNumberField label="Rounded" shape="rounded" />
	</div>
</template>

<style>
.container {
	display: flex;
	gap: 16px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div class="container">
	<vwc-number-field label="Pill" shape="pill"></vwc-number-field>
	<vwc-number-field label="Rounded" shape="rounded"></vwc-number-field>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Appearance

The `appearance` attribute controls the style of the Number Field input element.<br />
Use `ghost` in combination with a containing element which provides a border, for example [Action Group](/components/action-group/).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNumberField } from '@vonage/vivid-vue';
</script>

<template>
	<div class="container">
		<VNumberField appearance="fieldset" placeholder="appearance" label="fieldset" />
		<VNumberField appearance="ghost" placeholder="appearance" label="ghost" />
	</div>
</template>

<style>
.container {
	display: flex;
	gap: 16px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div class="container">
	<vwc-number-field appearance="fieldset" placeholder="appearance" label="fieldset"></vwc-number-field>
	<vwc-number-field appearance="ghost" placeholder="appearance" label="ghost"></vwc-number-field>
</div>

<style>
	.container {
		display: flex;
		gap: 16px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

### Disabled

Add the `disabled` attribute to disable the Number field input element.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNumberField } from '@vonage/vivid-vue';
</script>

<template>
	<VNumberField disabled value="disabled" label="fieldset" appearance="fieldset" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-number-field disabled value="disabled" label="fieldset" appearance="fieldset"></vwc-number-field>
```

</vwc-tab-panel>
</vwc-tabs>

### Readonly

The `readonly` attribute prevents the user from changing the Number Field input element value.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VNumberField } from '@vonage/vivid-vue';
</script>

<template>
	<VNumberField readonly value="8" label="fieldset" appearance="fieldset" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-number-field readonly value="8" label="fieldset" appearance="fieldset"></vwc-number-field>
```

</vwc-tab-panel>
</vwc-tabs>
