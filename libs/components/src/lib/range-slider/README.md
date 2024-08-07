# Range Slider

The range slider component allows users to select a range. It includes two thumb controls that can be dragged to set the start and end values.

```js
<script type="module">import '@vonage/vivid/range-slider';</script>
```

```html preview
<vwc-range-slider></vwc-range-slider>
```

## Members

### Min

The lowest value allowed for the range.

- Type: `number`
- Default: `0`

```html preview blocks
<div>
	<vwc-range-slider id="slider" min="-10"></vwc-range-slider>
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

### Max

The highest value allowed for the range.

- Type: `number`
- Default: `0`

```html preview blocks
<div>
	<vwc-range-slider id="slider" max="20"></vwc-range-slider>
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

### Step

Sets the granularity with which values can be incremented/decremented.

- Type: `number`
- Default: `1`

```html preview blocks
<div>
	<vwc-range-slider id="slider" step="0.5"></vwc-range-slider>
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

### Orientation

When used vertically, the range slider fills the height of its container.

- Type: `'horizontal'` | `'vertical'`
- Default: `'horizontal'`

```html preview center 300px
<vwc-range-slider orientation="vertical"></vwc-range-slider>
```

### Markers

Toggles markers display.

- Type: `boolean`
- Default: `false`

```html preview blocks
<vwc-range-slider markers></vwc-range-slider>
```

### Connotation

- Type: `'accent'` | `'cta'`
- Default: `'accent'`

```html preview blocks
<vwc-range-slider connotation="cta"></vwc-range-slider>
```

### Pin

Toggles display of the start and end values with a tooltip. Use the `valueTextFormatter` member to customize the format of the values.

- Type: `boolean`
- Default: `false`

```html preview
<vwc-range-slider pin></vwc-range-slider>
<vwc-range-slider
	orientation="vertical"
	style="height: 200px"
	pin
></vwc-range-slider>
<script>
	for (const slider of document.querySelectorAll('vwc-range-slider')) {
		slider.valueTextFormatter = (value) => `${value} units`;
	}
</script>
```

### Disabled

Toggle the `disabled` member to disable/enable the slider.

- Type: `boolean`
- Default: `false`

```html preview blocks
<vwc-range-slider disabled></vwc-range-slider>
```

### Start

The lower value of the range.

- Type: `string`
- Default: `min`

```html preview blocks
<vwc-range-slider start="5"></vwc-range-slider>
```

### End

The upper value of the range.

- Type: `string`
- Default: `max`

```html preview blocks
<vwc-range-slider end="5"></vwc-range-slider>
```

## Events

<div class="table-wrapper">

| Name          | Type                     | Bubbles | Composed | Description                                               |
| ------------- | ------------------------ | ------- | -------- | --------------------------------------------------------- |
| `input:start` | `CustomEvent<undefined>` | Yes     | Yes      | Event emitted when the start value changes                |
| `input:end`   | `CustomEvent<undefined>` | Yes     | Yes      | Event emitted when the end value changes                  |
| `input`       | `CustomEvent<undefined>` | Yes     | Yes      | Event emitted when either the start or end value changes. |
| `change`      | `CustomEvent<undefined>` | Yes     | Yes      | Event emitted when either the start or end value changes. |

</div>

## Accessibility

Both thumbs have a `role` of `slider`, which needs an accessible label. By default, they use a localized version of "min" and "max".
You can change the labels by setting the `aria-start-label` and `aria-end-label` attributes.

Vivid automatically sets the `aria-valuetext` attribute on the thumbs. The attribute is read by assistive technology. You can control its format using the `valueTextFormatter` property for a more human-readable value.

## Use Cases

```html preview
<div>
	<vwc-range-slider
		id="slider"
		min="0"
		max="7200"
		end="7200"
		step="15"
	></vwc-range-slider>
</div>
<div>
	Duration from
	<strong>
		<span id="start"></span>
		to
		<span id="end"></span>
	</strong>
</div>
<script>
	const slider = document.querySelector('#slider');
	const start = document.querySelector('#start');
	const end = document.querySelector('#end');

	const formatValue = (value) => {
		const totalSeconds = Number.parseFloat(value);
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = Math.floor(totalSeconds % 60);
		return `${hours.toString().padStart(2, '0')}:${minutes
			.toString()
			.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	};

	const updateDescription = () => {
		start.innerText = formatValue(slider.start);
		end.innerText = formatValue(slider.end);
	};
	customElements.whenDefined('vwc-range-slider').then(updateDescription);

	slider.valueTextFormatter = formatValue;
	slider.addEventListener('change', updateDescription);
</script>
```
