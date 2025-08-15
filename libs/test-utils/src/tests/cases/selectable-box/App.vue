<script setup lang="ts">
import { ref } from 'vue';
import { VSelectableBox } from '@vonage/vivid-vue';

const data = ref({
	checked: false,
});
</script>

<template>
	<main>
		<VSelectableBox
			data-testid="selectable-box"
			:checked="data.checked"
			@input="data.checked = $event.currentTarget.checked"
		>
			Selectable Box
		</VSelectableBox>
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
