## Connotation

Use the `connotation` attribute on Slider to control the Slider track.

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview blocks
<script setup lang="ts">
import { VSlider } from '@vonage/vivid-vue';
</script>

<template>
	<VSlider aria-label="Slider with the accent connotation" connotation="accent" />
	<VSlider aria-label="Slider with the cta connotation" connotation="cta" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```html preview blocks>
<vwc-slider aria-label="Slider with the accent connotation" connotation="accent"></vwc-slider> <vwc-slider aria-label="Slider with the cta connotation" connotation="cta"></vwc-slider>
```

</vwc-tab-panel>
</vwc-tabs>

## Markers

Use the `markers` attribute to add tick marks on the slider.  
The markers are set by the value of [`step`](/components/slider/code/#step).

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview blocks
<script setup lang="ts">
import { VSlider } from '@vonage/vivid-vue';
</script>

<template>
	<VSlider aria-label="Slider with markers" markers />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```html preview blocks
<vwc-slider aria-label="Slider with markers" markers></vwc-slider>
```

</vwc-tab-panel>
</vwc-tabs>

## Orientation

The `orientation` attribute controls which axis the Slider is aligned.  
Below is an example of vertical alignment.

<vwc-note connotation="information">
<vwc-icon name="info-line" slot="icon" label="Note:"></vwc-icon>
<p>When used vertically, the Slider fits the height of its container.</p>
</vwc-note>

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview center 300px
<script setup lang="ts">
import { VSlider } from '@vonage/vivid-vue';
</script>

<template>
	<VSlider aria-label="Vertical slider" orientation="vertical" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```html preview center 300px
<vwc-slider aria-label="Vertical slider" orientation="vertical"></vwc-slider>
```

</vwc-tab-panel>
</vwc-tabs>

## Pin

Use `pin` attribute to display a tooltip on the Slider knob.  
Use the [`valueTextFormatter`](/components/slider/code/#value-text-formatter) member to customize the format of the value.

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSlider } from '@vonage/vivid-vue';
import { useTemplateRef, onMounted } from 'vue';

const slider1 = useTemplateRef<InstanceType<typeof VSlider>>();
const slider2 = useTemplateRef<InstanceType<typeof VSlider>>();

onMounted(() => {
	if (slider1.value?.element) {
		slider1.value.element.valueTextFormatter = (value) => `${value} units`;
	}
	if (slider2.value?.element) {
		slider2.value.element.valueTextFormatter = (value) => `${value} units`;
	}
});
</script>

<template>
	<VSlider ref="slider1" aria-label="Slider with a pin" pin />
	<VSlider ref="slider2" aria-label="Vertical slider with a pin" orientation="vertical" style="height: 200px" pin />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-slider aria-label="Slider with a pin" pin></vwc-slider>
<vwc-slider aria-label="Vertical slider with a pin" orientation="vertical" style="height: 200px" pin></vwc-slider>

<script>
	for (const slider of document.querySelectorAll('vwc-slider')) {
		slider.valueTextFormatter = (value) => `${value} units`;
	}
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Disabled

The `disabled` attribute disables the Slider.

<vwc-tabs gutters="none" activeid="vue-tab">
<vwc-tab label="Vue" id="vue-tab"></vwc-tab>
<vwc-tab-panel>

```vue preview blocks
<script setup lang="ts">
import { VSlider } from '@vonage/vivid-vue';
</script>

<template>
	<VSlider aria-label="Disabled slider" disabled />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component" id="web-tab"></vwc-tab>
<vwc-tab-panel>

```html preview blocks
<vwc-slider aria-label="Disabled slider" disabled></vwc-slider>
```

</vwc-tab-panel>
</vwc-tabs>
