<template>
	<VActionGroup role="radiogroup" aria-label="Text Alignment">
		<VButton
			type="button"
			role="radio"
			icon="align-left-line"
			aria-checked="false"
			tabindex="0"
			aria-label="Text Align Left"
		/>
		<VButton
			type="button"
			role="radio"
			icon="align-center-line"
			aria-checked="true"
			tabindex="-1"
			aria-label="Text Align Center"
			appearance="filled"
		/>
		<VButton
			type="button"
			role="radio"
			icon="align-right-line"
			aria-checked="false"
			tabindex="-1"
			aria-label="Text Align Right"
		/>
	</VActionGroup>
</template>

<script setup lang="ts">
import { VButton, VActionGroup } from '@vonage/vivid-vue';
</script>
