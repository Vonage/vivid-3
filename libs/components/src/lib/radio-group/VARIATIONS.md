For Radio buttons to function correctly they must be slotted inside Radio Group component.

## Labelling

### Radio Label Text

Use the `label` attribute to provide a visible label for the [**Radio**](/components/radio).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VRadio } from '@vonage/vivid-vue';
</script>

<template>
	<VRadio label="A default radio" />
</template>
```

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview
<vwc-radio label="A default radio"></vwc-radio>
```

</vwc-tab-panel>
</vwc-tabs>

### Radio Group Label Text

Use the `label` to set the **Radio Group** label.

<vwc-note connotation="information" headline="Accessibility Tip">
<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
<p>If a visible label can't be used, provide one using the <nobr><code>aria-label</code></nobr> attribute. This ensures screen readers announce the purpose of the element, making it accessible to all users.</p>
</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VRadio, VRadioGroup } from '@vonage/vivid-vue';
</script>

<template>
	<VRadioGroup label="Pick a number" name="number">
		<VRadio label="Number one" value="1" />
		<VRadio label="Number two" value="2" />
		<VRadio label="Number three" value="3" />
	</VRadioGroup>
</template>
```

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview
<vwc-radio-group label="Pick a number" name="number">
	<vwc-radio label="Number one" value="1"></vwc-radio>
	<vwc-radio label="Number two" value="2"></vwc-radio>
	<vwc-radio label="Number three" value="3"></vwc-radio>
</vwc-radio-group>
```

</vwc-tab-panel>
</vwc-tabs>

### Helper Text

The `helper-text` attribute provides additional information to help the user enter the correct information.

To add HTML to the helper text, use the [helper-text slot](/components/radio-group/code/#helper-text-slot).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VRadio, VRadioGroup } from '@vonage/vivid-vue';
</script>

<template>
	<VRadioGroup helper-text="Please choose wisely" label="Pick a number" name="number">
		<VRadio label="Number one" value="1" />
		<VRadio label="Number two" value="2" />
		<VRadio label="Number three" value="3" />
	</VRadioGroup>
</template>
```

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview
<vwc-radio-group helper-text="Please choose wisely" label="Pick a number" name="number">
	<vwc-radio label="Number one" value="1"></vwc-radio>
	<vwc-radio label="Number two" value="2"></vwc-radio>
	<vwc-radio label="Number three" value="3"></vwc-radio>
</vwc-radio-group>
```

</vwc-tab-panel>
</vwc-tabs>

### Error Text

The `error-text` attribute provides a custom error message.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VRadio, VRadioGroup } from '@vonage/vivid-vue';
</script>

<template>
	<VRadioGroup error-text="Please, select one of the options" label="Pick a number" name="number">
		<VRadio label="Number one" value="1" />
		<VRadio label="Number two" value="2" />
		<VRadio label="Number three" value="3" />
	</VRadioGroup>
</template>
```

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview
<vwc-radio-group error-text="Please, select one of the options" label="Pick a number" name="number">
	<vwc-radio label="Number one" value="1"></vwc-radio>
	<vwc-radio label="Number two" value="2"></vwc-radio>
	<vwc-radio label="Number three" value="3"></vwc-radio>
</vwc-radio-group>
```

</vwc-tab-panel>
</vwc-tabs>

## Orientation

Set the `orientation` member to set the orientation (`horizontal` or `vertical`) of the radio-group.

- Type: `horizontal` | `vertical`
- Default: `horizontal`

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VRadio, VRadioGroup } from '@vonage/vivid-vue';
</script>

<template>
	<VRadioGroup label="Pick a number" name="number" orientation="vertical">
		<VRadio label="1" value="1" />
		<VRadio label="2" value="2" />
		<VRadio label="3" value="3" />
	</VRadioGroup>
</template>
```

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview
<vwc-radio-group label="Pick a number" name="number" orientation="vertical">
	<vwc-radio label="1" value="1"></vwc-radio>
	<vwc-radio label="2" value="2"></vwc-radio>
	<vwc-radio label="3" value="3"></vwc-radio>
</vwc-radio-group>
```

</vwc-tab-panel>
</vwc-tabs>

## Connotation

Use the `connotation` attribute to set the **Radio** color.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VRadio, VRadioGroup } from '@vonage/vivid-vue';
</script>

<template>
	<div class="wrapper">
		<VRadioGroup label="radio accent connotation">
			<VRadio connotation="accent" label="accent radio" />
			<VRadio connotation="accent" label="accent radio" default-checked />
		</VRadioGroup>
		<VRadioGroup label="radio accent connotation">
			<VRadio connotation="cta" label="cta radio" />
			<VRadio connotation="cta" label="cta radio" default-checked />
		</VRadioGroup>
	</div>
</template>

<style>
.wrapper {
	display: flex;
	gap: 48px;
}
</style>
```

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview
<div class="wrapper">
	<vwc-radio-group label="radio accent connotation">
		<vwc-radio connotation="accent" label="accent radio"></vwc-radio>
		<vwc-radio connotation="accent" label="accent radio" checked></vwc-radio>
	</vwc-radio-group>
	<vwc-radio-group label="radio accent connotation">
		<vwc-radio connotation="cta" label="cta radio"></vwc-radio>
		<vwc-radio connotation="cta" label="cta radio" checked></vwc-radio>
	</vwc-radio-group>
</div>

<style>
	.wrapper {
		display: flex;
		gap: 48px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## States

### Checked

Use the `checked` on the **Radio** to mark the radio as selected.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>
  
	In <strong>Vue</strong>, the equivalent of the checked attribute is <code>default-checked</code>.

</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VRadio, VRadioGroup } from '@vonage/vivid-vue';
</script>

<template>
	<VRadioGroup label="who is checked?">
		<VRadio default-checked label="I am checked on load" value="checked" />
		<VRadio label="I am not checked on load" value="not-checked-1" />
		<VRadio label="I am not checked on load" value="not-checked-2" />
	</VRadioGroup>
</template>
```

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview
<vwc-radio-group label="who is checked?">
	<vwc-radio checked label="I am checked on load" value="checked"></vwc-radio>
	<vwc-radio label="I am not checked on load" value="not-checked-1"></vwc-radio>
	<vwc-radio label="I am not checked on load" value="not-checked-2"></vwc-radio>
</vwc-radio-group>
```

</vwc-tab-panel>
</vwc-tabs>

### Disabled

Set the `disabled` attribute on a single **Radio** button.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VRadio, VRadioGroup } from '@vonage/vivid-vue';
</script>

<template>
	<VRadioGroup label="Pick a number" name="number">
		<VRadio disabled label="1" value="1" />
		<VRadio label="2" value="2" />
		<VRadio label="3" value="3" />
	</VRadioGroup>
</template>
```

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview
<vwc-radio-group label="Pick a number" name="number">
	<vwc-radio disabled label="1" value="1"></vwc-radio>
	<vwc-radio label="2" value="2"></vwc-radio>
	<vwc-radio label="3" value="3"></vwc-radio>
</vwc-radio-group>
```

</vwc-tab-panel>
</vwc-tabs>

Set the `disabled` attribute to disable **all** radio buttons in the **Radio Group**.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VRadio, VRadioGroup } from '@vonage/vivid-vue';
</script>

<template>
	<VRadioGroup disabled label="Pick a number" name="number">
		<VRadio label="1" value="1" default-checked />
		<VRadio label="2" value="2" />
		<VRadio label="3" value="3" />
	</VRadioGroup>
</template>
```

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview
<vwc-radio-group disabled label="Pick a number" name="number">
	<vwc-radio label="1" value="1" checked></vwc-radio>
	<vwc-radio label="2" value="2"></vwc-radio>
	<vwc-radio label="3" value="3"></vwc-radio>
</vwc-radio-group>
```

</vwc-tab-panel>
</vwc-tabs>

### Readonly

Set the `readonly` attribute to specify that the **Radio Group** is read-only.  
A read-only radio-group cannot be modified but can be focused and tabbed into.  
**Radio** can not have a read-only state.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VRadio, VRadioGroup } from '@vonage/vivid-vue';
</script>

<template>
	<VRadioGroup label="Pick a number" name="number" readonly>
		<VRadio label="1" value="1" default-checked />
		<VRadio label="2" value="2" />
		<VRadio label="3" value="3" />
	</VRadioGroup>
</template>
```

</vwc-tab-panel> 
<vwc-tab label="Web Component"></vwc-tab> 
<vwc-tab-panel>

```html preview
<vwc-radio-group label="Pick a number" name="number" readonly>
	<vwc-radio label="1" value="1" checked></vwc-radio>
	<vwc-radio label="2" value="2"></vwc-radio>
	<vwc-radio label="3" value="3"></vwc-radio>
</vwc-radio-group>
```

</vwc-tab-panel>
</vwc-tabs>
