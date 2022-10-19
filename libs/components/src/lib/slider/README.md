# Slider

Represents a slider custom element.

```js
<script type="module">import '@vonage/vivid/slider';</script>
```

```html preview
<vwc-slider></vwc-slider>
```

## Members

### Min, max and step

Use the `min`, `max` and `step` attributes to determine the range and values of the slider.
```html preview blocks
<div style="display: flex; align-items: center">
	<span>-5</span>
	<vwc-slider min="-5" max="5" step="0.5"></vwc-slider>
	<span>+5</span>
</div>
<div>Current value: <span id="slidervalue"></span></div>

<script>
	const slider = document.querySelector('vwc-slider');
	const output = document.getElementById('slidervalue');
	slider.addEventListener('change', (e) => output.innerText = slider.value);
</script>
```

### Orientation

When used vertically, the slider fills the height of its container.

- Type: `'horizontal'` | `'vertical'`
- Default: `horizontal`

```html preview blocks
<div style="height: 200px">
 	<vwc-slider orientation="vertical"></vwc-slider>
</div>
```

### Markers

Toggles markers display.

- Type: `boolean`
- Default: `false`

```html preview blocks
<vwc-slider markers></vwc-slider>
```

### Disabled

Toggle the `disabled` member to disable/enable the slider.

- Type: `boolean`
- Default: `false`

```html preview blocks
<vwc-slider disabled></vwc-slider>
```

### Readonly

Use the `readonly` member to make the slider read-only.
A readonly slider is enabled but cannot be modified.

- Type: `boolean`
- Default: `false`

```html preview blocks
<vwc-slider readonly></vwc-slider>
```
