<script setup lang="ts">
import { ref } from 'vue';
import { VSplitButton } from '@vonage/vivid-vue';

const data = ref({
	actionClicked: false,
	indicatorClicked: false,
});
</script>

<template>
	<main>
		<VSplitButton
			label="Button"
			indicator-aria-label="More actions"
			@action-click="data.actionClicked = true"
			@indicator-click="data.indicatorClicked = true"
		/>
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
