## Duration Selector

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
