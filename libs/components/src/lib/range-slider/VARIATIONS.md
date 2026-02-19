## Connotation

Use the `connotation` attribute on Range Slider to control the color of the selected range.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview full
<script setup lang="ts">
import { VLayout, VRangeSlider } from '@vonage/vivid-vue';
</script>
<template>
	<VLayout column-basis="block" gutters="small">
		<VRangeSlider connotation="accent" aria-label="Accent connotation example" />
		<VRangeSlider connotation="cta" aria-label="CTA connotation example" />
	</VLayout>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview blocks
<vwc-range-slider connotation="accent" aria-label="Accent connotation example"></vwc-range-slider> <vwc-range-slider connotation="cta" aria-label="CTA connotation example"></vwc-range-slider>
```

</vwc-tab-panel>
</vwc-tabs>

## Markers

Use the `markers` attribute to add tick marks on the slider.  
The markers are set by the value of [`step`](/components/range-slider/code/#step).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VRangeSlider } from '@vonage/vivid-vue';
</script>
<template>
	<VRangeSlider markers aria-label="Example with markers" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-range-slider markers aria-label="Example with markers"></vwc-range-slider>
```

</vwc-tab-panel>
</vwc-tabs>

## Orientation

The `orientation` attribute controls which axis the Range Slider is aligned.  
Below is an example of vertical alignment.

<vwc-note connotation="information">
	<vwc-icon slot="icon" name="info-line" label="Note:"></vwc-icon>
	<p>When used vertically, the range slider fits the height of its container.</p>
</vwc-note>

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview center 300px
<script setup lang="ts">
import { VRangeSlider } from '@vonage/vivid-vue';
</script>
<template>
	<VRangeSlider orientation="vertical" aria-label="Vertical orientation example" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview center 300px
<vwc-range-slider orientation="vertical" aria-label="Vertical orientation example"></vwc-range-slider>
```

</vwc-tab-panel>
</vwc-tabs>

## Pin

Use `pin` attribute to display a tooltip at the start and end values.  
Use the [`valueTextFormatter`](/components/range-slider/code/#value-text-formatter) member to customize the format of the values.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { useTemplateRef, onMounted } from 'vue';
import { VRangeSlider } from '@vonage/vivid-vue';
const horizontalSlider = useTemplateRef<InstanceType<typeof VRangeSlider>>('horizontal');
const verticalSlider = useTemplateRef<InstanceType<typeof VRangeSlider>>('vertical');

onMounted(() => {
	if (horizontalSlider.value) {
		horizontalSlider.value.element.valueTextFormatter = (value) => `${value} units`;
	}
	if (verticalSlider.value) {
		verticalSlider.value.element.valueTextFormatter = (value) => `${value} units`;
	}
});
</script>
<template>
	<VRangeSlider ref="horizontal" pin aria-label="Horizontal example with pins" />
	<VRangeSlider ref="vertical" pin orientation="vertical" style="height: 200px" aria-label="Vertical example with pins" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<vwc-range-slider pin class="slider" aria-label="Horizontal example with pins"></vwc-range-slider>
<vwc-range-slider pin class="slider" orientation="vertical" style="height: 200px" aria-label="Vertical example with pins"></vwc-range-slider>
<script>
	for (const slider of document.querySelectorAll('.slider')) {
		slider.valueTextFormatter = (value) => `${value} units`;
	}
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Disabled

The `disabled` attribute disables the Range Slider.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VRangeSlider } from '@vonage/vivid-vue';
</script>
<template>
	<VRangeSlider disabled aria-label="Disabled example" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview blocks
<vwc-range-slider disabled aria-label="Disabled example"></vwc-range-slider>
```

</vwc-tab-panel>
</vwc-tabs>
