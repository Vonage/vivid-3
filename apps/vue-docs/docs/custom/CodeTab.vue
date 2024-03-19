<template>
	<div class="container">
		<div class="example-wrapper vvd-root">
			<div
				class="example"
				:class="{
					'example--no-padding': noPadding,
					'example--visible-overflow': visibleOverflow,
					'example--no-overflow': noOverflow,
				}"
			>
				<slot name="example" />
			</div>
		</div>
		<div class="controls">
			<VButton
				icon="code-solid"
				:appearance="isCodeVisible ? 'filled' : 'ghost'"
				@click="isCodeVisible = !isCodeVisible"
			/>
		</div>
		<div v-if="isCodeVisible" class="code">
			<slot name="code" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineClientComponent } from 'vitepress';
import { ref } from 'vue';

defineProps({
	noPadding: Boolean,
	visibleOverflow: Boolean,
	noOverflow: Boolean,
});

const VButton = defineClientComponent(
	async () => (await import('@vonage/vivid-vue')).VButton
);

const isCodeVisible = ref(false);
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
}

.controls {
	border-top: 1px solid lightgray;
	padding: 4px 8px;
	display: flex;
	flex-direction: row-reverse;

	border-left: 1px solid lightgray;
	border-right: 1px solid lightgray;
	border-bottom: 1px solid lightgray;
}

.example {
	background-image: url(data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22%23F5F5F5%22%2F%3E%0A%3Crect%20width%3D%2210%22%20height%3D%2210%22%20fill%3D%22%23fff%22%2F%3E%0A%3Crect%20x%3D%2210%22%20y%3D%2210%22%20width%3D%2210%22%20height%3D%2210%22%20fill%3D%22%23fff%22%2F%3E%0A%3C%2Fsvg%3E%0A);
	padding: 16px;

	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
	border: 1px solid lightgray;
	overflow-x: auto;

	transform: translateX(0);

	&--no-padding {
		padding: 0;
	}

	&--no-overflow {
		overflow: hidden;
	}

	&--visible-overflow {
		overflow: visible;
	}
}
.code {
	:deep([class*='language-']) {
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		margin: 0;
	}
}
</style>
