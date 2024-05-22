# Slider

Represents a slider custom element.

```js
<script type="module">import '@vonage/vivid/slider';</script>
```

```html preview
<vwc-slider></vwc-slider>
```

## Members

### Min

Use `min` to set the lowest value allowed for the slider.

- Type: `number`
- Default: `0`

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

### Max

Use `max` to set the greatest value allowed for the slider.

- Type: `number`
- Default: `10`

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

### Step

Use `step` to set determine the granularity with which values can be incremented/decremented.

- Type: `number`
- Default: `1`

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

### Orientation

When used vertically, the slider fills the height of its container.

- Type: `'horizontal'` | `'vertical'`
- Default: `'horizontal'`

```html preview center 300px
<vwc-slider orientation="vertical"></vwc-slider>
```

### Markers

Toggles markers display.

- Type: `boolean`
- Default: `false`

```html preview blocks
<vwc-slider markers></vwc-slider>
```

### Connotation

- Type: `'accent'` | `'cta'`
- Default: `'accent'`

```html preview blocks
<vwc-slider connotation="cta"></vwc-slider>
```

### Pin

Toggles display the value through a tooltip. Use the `valueTextFormatter` member to customize the format of the value.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-slider pin></vwc-slider>
<vwc-slider orientation="vertical" style="height: 200px" pin></vwc-slider>
<script>
	for (const slider of document.querySelectorAll('vwc-slider')) {
		slider.valueTextFormatter = (value) => `${value} units`;
	}
</script>
```

### Disabled

Toggle the `disabled` member to disable/enable the slider.

- Type: `boolean`
- Default: `false`

```html preview blocks
<vwc-slider disabled></vwc-slider>
```

### Value

Use `value` to set the value of the slider.

- Type: `string`
- Default: `5`

```html preview blocks
<vwc-slider value="3"></vwc-slider>
```

## Accessibility

The slider has a `role` of `slider`, which needs an accessible label. You must provide it using `aria-label`.

You can set the `valueTextFormatter` member to customize how values will be formatted for the sliders' `aria-valuetext` attribute. The formatting will also be used for the tooltip when `pin` is enabled.
