<template>
	<div style="height: 100px; text-align: center">
		<VSplitButton
			ref="splitButton"
			appearance="filled"
			icon="compose-line"
			aria-label="Write a new message"
		>
			<VTooltip :anchor="splitButton?.$el.action" text="Write a new message" />
		</VSplitButton>
	</div>
</template>

<script setup lang="ts">
import { VSplitButton, VTooltip } from '@vonage/vivid-vue';
import { ref } from 'vue';

const splitButton = ref(null);
</script>
