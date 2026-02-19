## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VRangeSlider } from '@vonage/vivid-vue';
</script>
<template>
	<VRangeSlider />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import { registerRangeSlider } from '@vonage/vivid';

registerRangeSlider('your-prefix');
```

```html preview
<script type="module">
	import { registerRangeSlider } from '@vonage/vivid';
	registerRangeSlider('your-prefix');
</script>

<your-prefix-range-slider aria-label="Default range slider"></your-prefix-range-slider>
```

</vwc-tab-panel>
</vwc-tabs>

## Min

Use the `min` attribute to set the lowest value allowed for the Range Slider.  
The default value of `min` is `0`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview full
<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from 'vue';
import { VLayout, VRangeSlider } from '@vonage/vivid-vue';

const slider = useTemplateRef<InstanceType<typeof VRangeSlider>>('slider');
const start = ref('');
const end = ref('');

const updateDescription = () => {
	if (!slider.value) return;
	start.value = slider.value.element.start;
	end.value = slider.value.element.end;
};

onMounted(() => updateDescription());
</script>

<template>
	<VLayout column-basis="block" gutters="small">
		<div>
			<VRangeSlider :min="-10" ref="slider" aria-label="Min value example" @change="updateDescription" />
		</div>
		<div>
			Current range:
			<span v-text="start"></span>
			to
			<span v-text="end"></span>
		</div>
	</VLayout>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview blocks
<div>
	<vwc-range-slider min="-10" id="slider" aria-label="Min value example"></vwc-range-slider>
</div>
<div>
	Current range:
	<span id="start"></span>
	to
	<span id="end"></span>
</div>

<script>
	const slider = document.querySelector('#slider');
	const start = document.querySelector('#start');
	const end = document.querySelector('#end');

	const updateDescription = () => {
		start.innerText = slider.start;
		end.innerText = slider.end;
	};
	customElements.whenDefined('vwc-range-slider').then(updateDescription);

	slider.addEventListener('change', updateDescription);
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Max

Use the `max` attribute to set the highest value allowed for the Range Slider.  
The default value `max` of is `10`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview full
<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from 'vue';
import { VLayout, VRangeSlider } from '@vonage/vivid-vue';

const slider = useTemplateRef<InstanceType<typeof VRangeSlider>>('slider');
const start = ref('');
const end = ref('');

const updateDescription = () => {
	if (!slider.value) return;
	start.value = slider.value.element.start;
	end.value = slider.value.element.end;
};

onMounted(() => updateDescription());
</script>

<template>
	<VLayout column-basis="block" gutters="small">
		<div>
			<VRangeSlider :max="20" ref="slider" aria-label="Max value example" @change="updateDescription" />
		</div>
		<div>
			Current range:
			<span v-text="start"></span>
			to
			<span v-text="end"></span>
		</div>
	</VLayout>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview blocks
<div>
	<vwc-range-slider max="20" id="slider" aria-label="Max value example"></vwc-range-slider>
</div>
<div>
	Current range:
	<span id="start"></span>
	to
	<span id="end"></span>
</div>

<script>
	const slider = document.querySelector('#slider');
	const start = document.querySelector('#start');
	const end = document.querySelector('#end');

	const updateDescription = () => {
		start.innerText = slider.start;
		end.innerText = slider.end;
	};
	customElements.whenDefined('vwc-range-slider').then(updateDescription);

	slider.addEventListener('change', updateDescription);
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Step

Use the `step` attribute sets the granularity with which values can be incremented/decremented.  
The default value `step` of is `1`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview full
<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from 'vue';
import { VLayout, VRangeSlider } from '@vonage/vivid-vue';

const slider = useTemplateRef<InstanceType<typeof VRangeSlider>>('slider');
const start = ref('');
const end = ref('');

const updateDescription = () => {
	if (!slider.value) return;
	start.value = slider.value.element.start;
	end.value = slider.value.element.end;
};

onMounted(() => updateDescription());
</script>

<template>
	<VLayout column-basis="block" gutters="small">
		<div>
			<VRangeSlider :step="0.5" ref="slider" markers aria-label="Step example" @change="updateDescription" />
		</div>
		<div>
			Current range:
			<span v-text="start"></span>
			to
			<span v-text="end"></span>
		</div>
	</VLayout>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview blocks
<div>
	<vwc-range-slider step="0.5" id="slider" markers aria-label="Step example"></vwc-range-slider>
</div>
<div>
	Current range:
	<span id="start"></span>
	to
	<span id="end"></span>
</div>

<script>
	const slider = document.querySelector('#slider');
	const start = document.querySelector('#start');
	const end = document.querySelector('#end');

	const updateDescription = () => {
		start.innerText = slider.start;
		end.innerText = slider.end;
	};
	customElements.whenDefined('vwc-range-slider').then(updateDescription);

	slider.addEventListener('change', updateDescription);
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Start

Use the `start` attribute to set the lower position of the range indicator.  
The default value of `start` is [`min`](/components/range-slider/code/#min).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VRangeSlider } from '@vonage/vivid-vue';
</script>
<template>
	<VRangeSlider start="5" markers aria-label="Start value example" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview blocks
<vwc-range-slider start="5" markers aria-label="Start value example"></vwc-range-slider>
```

</vwc-tab-panel>
</vwc-tabs>

## End

Use the `end` attribute to set the upper position of the range indicator.  
The default value of `end` is [`max`](/components/range-slider/code/#max).

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VRangeSlider } from '@vonage/vivid-vue';
</script>
<template>
	<VRangeSlider end="5" markers aria-label="End value example" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview blocks
<vwc-range-slider end="5" markers aria-label="End value example"></vwc-range-slider>
```

</vwc-tab-panel>
</vwc-tabs>

## Value Text Formatter

Use the `valueTextFormatter` to generates a string for the Range Slider's "aria-valuetext" attribute based on the current value.  
Use this to configure the [`pin`](/components/range-slider/#pin) string.

## API Reference

### Properties

<div class="table-wrapper">

| Name                 | Type                                    | Description                                                          |
| -------------------- | --------------------------------------- | -------------------------------------------------------------------- |
| **aria-start-label** | `string`                                | Aria label for the start thumb                                       |
| **aria-end-label**   | `string`                                | Aria label for the end thumb                                         |
| **connotation**      | _Enum_:<br/>`accent`<br/>`cta`          | The connotation of the component                                     |
| **disabled**         | `boolean`                               | Sets the element's disabled state                                    |
| **end**              | `string`                                | The current end value of the element.                                |
| **markers**          | `boolean`                               | Display markers on/off                                               |
| **max**              | `number`                                | The maximum value of the range.                                      |
| **min**              | `number`                                | The minimum value of the range.                                      |
| **orientation**      | _Enum_:<br/>`horizontal`<br/>`vertical` | The orientation of the slider.                                       |
| **pin**              | `boolean`                               | Show current values on the thumbs.                                   |
| **start**            | `string`                                | The current start value of the element.                              |
| **step**             | `number`                                | Value to increment or decrement via arrow keys, mouse click or drag. |

</div>

### Events

<div class="table-wrapper">

| Name            | Type                     | Bubbles | Composed | Description                                               |
| --------------- | ------------------------ | ------- | -------- | --------------------------------------------------------- |
| **input:start** | `CustomEvent<undefined>` | Yes     | Yes      | Event emitted when the start value changes                |
| **input:end**   | `CustomEvent<undefined>` | Yes     | Yes      | Event emitted when the end value changes                  |
| **input**       | `CustomEvent<undefined>` | Yes     | Yes      | Event emitted when either the start or end value changes. |
| **change**      | `CustomEvent<undefined>` | Yes     | Yes      | Event emitted when either the start or end value changes. |

</div>
