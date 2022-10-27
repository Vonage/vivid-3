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
	<vwc-slider min="-5"></vwc-slider>
</div>
<div>Current value: <span id="slidervalue"></span></div>

<script>
	const slider = document.querySelector('vwc-slider');
	const output = document.getElementById('slidervalue');
	slider.addEventListener('change', (e) => output.innerText = slider.value);
</script>
```

### Max

Use `max` to set the greatest value allowed for the slider.

- Type: `number`
- Default: `10`

```html preview blocks
<div>
	<vwc-slider max="100"></vwc-slider>
</div>
<div>Current value: <span id="slidervalue"></span></div>

<script>
	const slider = document.querySelector('vwc-slider');
	const output = document.getElementById('slidervalue');
	slider.addEventListener('change', (e) => output.innerText = slider.value);
</script>
```

### Step

Use `step` to set determine the granularity with which values can be incremented/decremented.

- Type: `number`
- Default: `1`

```html preview blocks
<div>
	<vwc-slider step="0.5"></vwc-slider>
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
