## Label

The `label` attribute adds a label to the Switch.

<vwc-note connotation="information" headline="Accessibility Tip">
<vwc-icon slot="icon" name="accessibility-line"></vwc-icon>
<p>If a visible label can't be used, provide one using the <nobr><code>aria-label</code></nobr> attribute. This ensures screen readers announce the purpose of the element, making it accessible to all users.</p>
</vwc-note>

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSwitch } from '@vonage/vivid-vue';
</script>

<template>
	<VSwitch label="Email notifications" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-switch label="Email notifications"></vwc-switch>
```

</vwc-tab-panel>
</vwc-tabs>

## Checked

The `checked` attribute controls the checked state of the Switch.

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSwitch } from '@vonage/vivid-vue';
</script>

<template>
	<VSwitch checked label="Email notifications" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-switch checked label="Email notifications"></vwc-switch>
```

</vwc-tab-panel>
</vwc-tabs>

## Connotation

The `connotation` attribute controls the color of the switch.

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSwitch, VLayout } from '@vonage/vivid-vue';
</script>

<template>
	<VLayout gutters="small" row-spacing="small" column-basis="block">
		<VSwitch connotation="primary" label="Primary" checked />
		<VSwitch connotation="cta" label="CTA" checked />
		<VSwitch connotation="announcement" label="Announcement" checked />
		<VSwitch connotation="success" label="Success" checked />
		<VSwitch connotation="alert" label="Alert" checked />
	</VLayout>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
	<vwc-switch connotation="primary" label="Primary" checked></vwc-switch>
	<vwc-switch connotation="cta" label="CTA" checked></vwc-switch>
	<vwc-switch connotation="announcement" label="Announcement" checked></vwc-switch>
	<vwc-switch connotation="success" label="Success" checked></vwc-switch>
	<vwc-switch connotation="alert" label="Alert" checked></vwc-switch>
</vwc-layout>
```

</vwc-tab-panel>
</vwc-tabs>

## Disabled

The `disabled` attribute sets the disabled state of the Switch.

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSwitch, VLayout } from '@vonage/vivid-vue';
</script>

<template>
	<VLayout gutters="small" row-spacing="small" column-basis="block">
		<VSwitch disabled label="Email notifications off" />
		<VSwitch disabled checked label="Email notifications on" />
	</VLayout>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
	<vwc-switch disabled label="Email notifications off"></vwc-switch>
	<vwc-switch disabled checked label="Email notifications on"></vwc-switch>
</vwc-layout>
```

</vwc-tab-panel>
</vwc-tabs>

## Readonly

The `readonly` attribute sets the readonly state of the Switch.

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSwitch, VLayout } from '@vonage/vivid-vue';
</script>

<template>
	<VLayout gutters="small" row-spacing="small" column-basis="block">
		<VSwitch readonly label="Email notifications off" />
		<VSwitch readonly checked label="Email notifications on" />
	</VLayout>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
	<vwc-switch readonly label="Email notifications off"></vwc-switch>
	<vwc-switch readonly checked label="Email notifications on"></vwc-switch>
</vwc-layout>
```

</vwc-tab-panel>
</vwc-tabs>
