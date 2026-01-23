## Usage

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { VSlider } from '@vonage/vivid-vue';
</script>
<template>
	<VSlider aria-label="Vue Slider" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component">
</vwc-tab>
<vwc-tab-panel>

```js
import { registerSlider } from '@vonage/vivid';

registerSlider('your-prefix');
```

```html preview
<script type="module">
	import { registerSlider } from '@vonage/vivid';
	registerSlider('your-prefix');
</script>

<your-prefix-slider aria-label="Your slider"></your-prefix-slider>
```

</vwc-tab-panel>

</vwc-tabs>

## Value

Set the `value` attribute to set the value of the Slider.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview blocks
<script setup lang="ts">
import { VSlider } from '@vonage/vivid-vue';
</script>

<template>
	<VSlider aria-label="Slider with the value attribute" :value="3" />
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview blocks
<vwc-slider aria-label="Slider with the value attribute" value="3"></vwc-slider>
```

</vwc-tab-panel>
</vwc-tabs>

### Value Text Formatter

Use the `valueTextFormatter` to generates a string for the Slider's "aria-valuetext" attribute based on the current value.  
Use this to configure the [`pin`](/components/slider/#pin) string.

## Min

Use the `min` attribute to set the lowest value allowed for the Slider.  
The default value of `min` is `0`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview blocks
<script setup lang="ts">
import { VSlider } from '@vonage/vivid-vue';
import { ref } from 'vue';

const slidervalue = ref(1);
</script>

<template>
	<div>
		<div>
			<VSlider v-model="slidervalue" :value="slidervalue" aria-label="Slider with the min attribute" :min="-5" />
		</div>
		<div>Current value: <span id="slidervalue" v-text="slidervalue"></span></div>
	</div>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview blocks
<div>
	<vwc-slider aria-label="Slider with the min attribute" id="slider" min="-5"></vwc-slider>
</div>
<div>
	Current value:
	<span id="slidervalue"></span>
</div>

<script>
	slider.addEventListener('change', (e) => (slidervalue.innerText = slider.value));
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Max

Use the `max` attribute to set the highest value allowed for the Slider.  
The default value `max` of is `10`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview blocks
<script setup lang="ts">
import { VSlider } from '@vonage/vivid-vue';
import { ref } from 'vue';

const slidervalue = ref(50);
</script>

<template>
	<div>
		<div>
			<VSlider v-model="slidervalue" :value="slidervalue" aria-label="Slider with the max attribute" :max="100" />
		</div>
		<div>Current value: <span id="slidervalue" v-text="slidervalue"></span></div>
	</div>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview blocks
<div>
	<vwc-slider aria-label="Slider with the max attribute" id="slider" max="100"></vwc-slider>
</div>
<div>
	Current value:
	<span id="slidervalue"></span>
</div>

<script>
	slider.addEventListener('change', (e) => (slidervalue.innerText = slider.value));
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## Step

Use the `step` attribute sets the granularity with which values can be incremented/decremented.  
The default value of `step` is `1`.

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview blocks
<script setup lang="ts">
import { VSlider } from '@vonage/vivid-vue';
import { ref } from 'vue';

const slidervalue = ref(5);
</script>

<template>
	<div>
		<div>
			<VSlider v-model="slidervalue" :value="slidervalue" aria-label="Slider with the step attribute" :step="0.5" />
		</div>
		<div>Current value: <span id="slidervalue" v-text="slidervalue"></span></div>
	</div>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview blocks
<div>
	<vwc-slider aria-label="Slider with the step attribute" id="slider" step="0.5"></vwc-slider>
</div>
<div>
	Current value:
	<span id="slidervalue"></span>
</div>

<script>
	slider.addEventListener('change', (e) => (slidervalue.innerText = slider.value));
</script>
```

</vwc-tab-panel>
</vwc-tabs>

## API Reference

### Properties

<div class="table-wrapper">

| Name            | Type                                    | Description                                                          |
| --------------- | --------------------------------------- | -------------------------------------------------------------------- |
| **connotation** | _Enum_:<br/>`accent`<br/>`cta`          | The connotation of the component                                     |
| **disabled**    | `boolean`                               | Sets the element's disabled state                                    |
| **markers**     | `boolean`                               | Display markers on/off                                               |
| **max**         | `number`                                | The maximum value of the range.                                      |
| **min**         | `number`                                | The minimum value of the range.                                      |
| **orientation** | _Enum_:<br/>`horizontal`<br/>`vertical` | The orientation of the slider.                                       |
| **pin**         | `boolean`                               | Show current values on the thumbs.                                   |
| **step**        | `number`                                | Value to increment or decrement via arrow keys, mouse click or drag. |
| **value**       | `number`                                | Set the value attribute to set the value of the slider.              |

</div>

### Events

<div class="table-wrapper">

| Name       | Type                     | Bubbles | Composed | Description                                                 |
| ---------- | ------------------------ | ------- | -------- | ----------------------------------------------------------- |
| **change** | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'change' event when the slider value changes |

</div>
