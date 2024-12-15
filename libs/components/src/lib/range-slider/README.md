## Usage

<vwc-tabs>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```js
import '@vonage/vivid/range-slider';
```

or, if you need to use a unique prefix:

```js
import { registerRangeSlider } from '@vonage/vivid';

registerRangeSlider('your-prefix');
```

```html preview
<script type="module">
	import { registerRangeSlider } from '@vonage/vivid';
	registerRangeSlider('your-prefix');
</script>

<your-prefix-range-slider></your-prefix-range-slider>
```

</vwc-tab-panel>
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```html
<script setup lang="ts">
	import { VRangeSlider } from '@vonage/vivid-vue';
</script>
<template>
	<VRangeSlider />
</template>
```

</vwc-tab-panel>
</vwc-tabs>

## Min

Use the `min` attribute to set the lowest value allowed for the Range Slider.  
The default value of `min` is `0`.

```html preview blocks
<div>
	<vwc-range-slider min="-10" id="slider"></vwc-range-slider>
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

## Max

Use the `max` attribute to set the highest value allowed for the Range Slider.  
The default value `max` of is `10`.

```html preview blocks
<div>
	<vwc-range-slider max="20" id="slider"></vwc-range-slider>
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

## Step

Use the `step` attribute sets the granularity with which values can be incremented/decremented.  
The default value `step` of is `1`.

```html preview blocks
<div>
	<vwc-range-slider step="0.5" id="slider" markers></vwc-range-slider>
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

## Start

Use the `start` attribute to set the lower position of the range indicator.  
The default value of `start` is [`min`](/components/range-slider/code/#min).

```html preview blocks
<vwc-range-slider start="5" markers></vwc-range-slider>
```

## End

Use the `end` attribute to set the upper position of the range indicator.  
The default value of `end` is [`max`](/components/range-slider/code/#max).

```html preview blocks
<vwc-range-slider end="5" markers></vwc-range-slider>
```

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

| Name          | Type                     | Bubbles | Composed | Description                                               |
| ------------- | ------------------------ | ------- | -------- | --------------------------------------------------------- |
| `input:start` | `CustomEvent<undefined>` | Yes     | Yes      | Event emitted when the start value changes                |
| `input:end`   | `CustomEvent<undefined>` | Yes     | Yes      | Event emitted when the end value changes                  |
| `input`       | `CustomEvent<undefined>` | Yes     | Yes      | Event emitted when either the start or end value changes. |
| `change`      | `CustomEvent<undefined>` | Yes     | Yes      | Event emitted when either the start or end value changes. |

</div>
