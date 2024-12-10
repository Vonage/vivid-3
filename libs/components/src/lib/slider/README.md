## Usage

<vwc-tabs>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/slider';
```

or, if you need to use a unique prefix:

```js
import { registerSlider } from '@vonage/vivid';

registerSlider('your-prefix');
```

```html preview
<script type="module">
	import { registerSlider } from '@vonage/vivid';
	registerSlider('your-prefix');
</script>

<your-prefix-slider></your-prefix-slider>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VSlider } from '@vonage/vivid-vue';
</script>
<template>
	<VSlider />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Value

Set the `value` attribute to set the value of the Slider.

```html preview blocks
<vwc-slider value="3"></vwc-slider>
```

### Value Text Formatter

Use the `valueTextFormatter` to generates a string for the Slider's "aria-valuetext" attribute based on the current value.  
Use this to configure the [`pin`](/variation/#pin) string.

## Min

Use the `min` attribute to set the lowest value allowed for the Slider.  
The default value of `min` is `0`.

```html preview blocks
<div>
	<vwc-slider id="slider" min="-5"></vwc-slider>
</div>
<div>
	Current value:
	<span id="slidervalue"></span>
</div>

<script>
	slider.addEventListener(
		'change',
		(e) => (slidervalue.innerText = slider.value)
	);
</script>
```

## Max

Use the `max` attribute to set the highest value allowed for the Slider.  
The default value `max` of is `0`.

```html preview blocks
<div>
	<vwc-slider id="slider" max="100"></vwc-slider>
</div>
<div>
	Current value:
	<span id="slidervalue"></span>
</div>

<script>
	slider.addEventListener(
		'change',
		(e) => (slidervalue.innerText = slider.value)
	);
</script>
```

## Step

Use the `step` attribute sets the granularity with which values can be incremented/decremented.  
The default value `step` of is `1`.

```html preview blocks
<div>
	<vwc-slider id="slider" step="0.5"></vwc-slider>
</div>
<div>
	Current value:
	<span id="slidervalue"></span>
</div>

<script>
	slider.addEventListener(
		'change',
		(e) => (slidervalue.innerText = slider.value)
	);
</script>
```

## API Reference

### Properties

<div class="table-wrapper">

| Name            | Type                                    | Description                                                          |
| --------------- | --------------------------------------- | -------------------------------------------------------------------- |
| **connotation** | _Enum_:<br/>`accent`<br/>`cta`          | The connotation of the component                                     |
| **disabled**    | \_`boolean`                             | Sets the element's disabled state                                    |
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

| Name     | Type                     | Bubbles | Composed | Description                                                 |
| -------- | ------------------------ | ------- | -------- | ----------------------------------------------------------- |
| `change` | `CustomEvent<undefined>` | Yes     | Yes      | Fires a custom 'change' event when the slider value changes |

</div>
