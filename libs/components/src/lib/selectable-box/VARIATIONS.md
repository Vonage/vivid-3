## Control Type

Set the `control-type` attribute to change the box's selectable control.
It accepts a subset of predefined values.
When `control-type` is set to `radio`, it is the consuming app's responsibility to ensure only one Selectable Box in a group is checked at a time.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VLayout, VSelectableBox } from '@vonage/vivid-vue';
</script>

<template>
	<VLayout gutters="small" row-spacing="small" column-basis="block">
		<VSelectableBox control-type="checkbox" class="box"> Checkbox control </VSelectableBox>
		<VSelectableBox control-type="radio" class="box"> Radio control </VSelectableBox>
	</VLayout>
</template>

<style>
.box {
	max-inline-size: 450px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
	<vwc-selectable-box control-type="checkbox" class="box"> Checkbox control </vwc-selectable-box>
	<vwc-selectable-box control-type="radio" class="box"> Radio control </vwc-selectable-box>
</vwc-layout>

<style>
	.box {
		max-inline-size: 450px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Control Placement

Use the `control-placement` attribute to change the box's selectable control placement.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VLayout, VSelectableBox } from '@vonage/vivid-vue';
</script>

<template>
	<VLayout gutters="small" row-spacing="small" column-basis="medium">
		<VSelectableBox> Control placement: <strong>end-stacked (default)</strong> </VSelectableBox>
		<VSelectableBox control-placement="start-stacked"> Control placement: <strong>start-stacked</strong> </VSelectableBox>
		<VSelectableBox control-placement="end"> Control placement: <strong>end</strong> </VSelectableBox>
		<VSelectableBox control-placement="start"> Control placement: <strong>start</strong> </VSelectableBox>
	</VLayout>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="medium">
	<vwc-selectable-box> Control placement: <strong>end-stacked (default)</strong> </vwc-selectable-box>
	<vwc-selectable-box control-placement="start-stacked"> Control placement: <strong>start-stacked</strong> </vwc-selectable-box>
	<vwc-selectable-box control-placement="end"> Control placement: <strong>end</strong> </vwc-selectable-box>
	<vwc-selectable-box control-placement="start"> Control placement: <strong>start</strong> </vwc-selectable-box>
</vwc-layout>
```

</vwc-tab-panel>
</vwc-tabs>

## Connotation

Set the `connotation` attribute to change the box's connotation.
It accepts a subset of predefined values.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VLayout, VSelectableBox } from '@vonage/vivid-vue';
</script>

<template>
	<VLayout gutters="small" row-spacing="small" column-basis="block">
		<VSelectableBox connotation="accent" class="box"> Accent box </VSelectableBox>
		<VSelectableBox connotation="cta" class="box"> CTA box </VSelectableBox>
	</VLayout>
</template>

<style>
.box {
	max-inline-size: 450px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
	<vwc-selectable-box connotation="accent" class="box"> Accent box </vwc-selectable-box>
	<vwc-selectable-box connotation="cta" class="box"> CTA box </vwc-selectable-box>
</vwc-layout>

<style>
	.box {
		max-inline-size: 450px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Clickable Box

By default, the card's control element (checkbox or radio) is the clickable element. This allows you to use other clickable elements within the box.
Setting the `clickable-box` attribute makes the whole box clickable, just make sure the box does not contain other clickable elements.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VLayout, VSelectableBox } from '@vonage/vivid-vue';
</script>

<template>
	<VLayout gutters="small" row-spacing="small" column-basis="block">
		<VSelectableBox clickable-box class="box"> Clickable accent box </VSelectableBox>
		<VSelectableBox clickable-box connotation="cta" class="box"> Clickable CTA box </VSelectableBox>
	</VLayout>
</template>

<style>
.box {
	max-inline-size: 450px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
	<vwc-selectable-box clickable-box class="box"> Clickable accent box </vwc-selectable-box>
	<vwc-selectable-box clickable-box connotation="cta" class="box"> Clickable CTA box </vwc-selectable-box>
</vwc-layout>

<style>
	.box {
		max-inline-size: 450px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Checked

Set the `checked` attribute to indicate the checked state of the box.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VLayout, VSelectableBox } from '@vonage/vivid-vue';
</script>

<template>
	<VLayout gutters="small" row-spacing="small" column-basis="block">
		<VSelectableBox control-type="checkbox" checked class="box"> Checked checkbox box </VSelectableBox>
		<VSelectableBox control-type="radio" checked class="box"> Checked radio box </VSelectableBox>
	</VLayout>
</template>

<style>
.box {
	max-inline-size: 450px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
	<vwc-selectable-box control-type="checkbox" checked class="box"> Checked checkbox box </vwc-selectable-box>
	<vwc-selectable-box control-type="radio" checked class="box"> Checked radio box </vwc-selectable-box>
</vwc-layout>
<style>
	.box {
		max-inline-size: 450px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Tight

By default, the Selectable Box is styled in a spacious manner. Enabling the `tight` member will remove the padding around the box's content.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VLayout, VSelectableBox } from '@vonage/vivid-vue';
</script>

<template>
	<VLayout gutters="small" row-spacing="small" column-basis="block">
		<VSelectableBox tight class="box"> Tight box </VSelectableBox>
	</VLayout>
</template>

<style>
.box {
	max-inline-size: 450px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
	<vwc-selectable-box tight class="box"> Tight box </vwc-selectable-box>
</vwc-layout>
<style>
	.box {
		max-inline-size: 450px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>

## Disabled

The disabled `attribute` disables the control (checkbox or radio) and indicates that the action is not available.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VLayout, VSelectableBox } from '@vonage/vivid-vue';
</script>

<template>
	<VLayout gutters="small" row-spacing="small" column-basis="block">
		<VSelectableBox control-type="checkbox" class="box" disabled checked> Checkbox control (disabled & checked) </VSelectableBox>
		<VSelectableBox control-type="radio" class="box" disabled> Radio control (disabled) </VSelectableBox>
	</VLayout>
</template>

<style>
.box {
	max-inline-size: 450px;
}
</style>
```

</vwc-tab-panel>
<vwc-tab label="Web Component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-layout gutters="small" row-spacing="small" column-basis="block">
	<vwc-selectable-box control-type="checkbox" class="box" disabled checked> Checkbox control (disabled & checked) </vwc-selectable-box>
	<vwc-selectable-box control-type="radio" class="box" disabled> Radio control (disabled) </vwc-selectable-box>
</vwc-layout>

<style>
	.box {
		max-inline-size: 450px;
	}
</style>
```

</vwc-tab-panel>
</vwc-tabs>
