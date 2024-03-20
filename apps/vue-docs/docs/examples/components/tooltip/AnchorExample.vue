<template>
	<div class="example-container">
		<VTooltip text="I'm a tooltip">
			<template #anchor><VButton icon="help-line" shape="pill" /></template>
		</VTooltip>
		<VButton id="buttonAnchor" icon="help-line" shape="pill" />
		<VTooltip anchor="buttonAnchor" text="I'm a tooltip" />
		<VButton ref="button" icon="help-line" shape="pill" />
		<VTooltip :anchor="button?.$el" text="My anchor is an HTMLElement" />
	</div>
</template>

<script setup lang="ts">
import { VTooltip, VButton } from '@vonage/vivid-vue';
import { ref } from 'vue';

const button = ref<typeof VButton | null>(null);
</script>

<style lang="scss" scoped>
.example-container {
	text-align: center;
	height: 100px;
}
</style>
