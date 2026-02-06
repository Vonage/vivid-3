## Duration Selector

<vwc-tabs gutters="none">
<vwc-tab label="Vue"></vwc-tab>
<vwc-tab-panel>

```vue preview
<script setup lang="ts">
import { ref } from 'vue';
import { VRangeSlider } from '@vonage/vivid-vue';
const startValue = ref('0');
const endValue = ref('7200');

const formatValue = (value: string | number) => {
	const totalSeconds = Number.parseFloat(value);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = Math.floor(totalSeconds % 60);
	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
</script>

<template>
	<div>
		<VRangeSlider :min="0" :max="7200" :step="15" v-model:start="startValue" v-model:end="endValue" :valueTextFormatter="formatValue" aria-label="Duration selector" />
	</div>
	<div>
		Duration from
		<strong>
			<span v-text="formatValue(startValue)"></span>
			to
			<span v-text="formatValue(endValue)"></span>
		</strong>
	</div>
</template>
```

</vwc-tab-panel>
<vwc-tab label="Web component"></vwc-tab>
<vwc-tab-panel>

```html preview
<div>
	<vwc-range-slider id="slider" min="0" max="7200" end="7200" step="15" aria-label="Duration selector"></vwc-range-slider>
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
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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

</vwc-tab-panel>
</vwc-tabs>
