<template>
	<div>
		<div>
			<VSlider v-model="slidervalue" max="100" :value="slidervalue" />
		</div>
		<div>
			Current value: <span id="slidervalue">{{ slidervalue }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { VSlider } from '@vonage/vivid-vue';
import { ref } from 'vue';

const slidervalue = ref(50);
</script>
