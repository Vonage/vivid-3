<template>
	<div class="example-container">
		<VAlert
			text="An important information for you"
			:connotation="connotation"
			open
		/>
		<VSelect v-model="connotation" label="Select a connotation">
			<VOption value="accent" text="accent" />
			<VOption value="success" text="success" />
			<VOption value="warning" text="warning" />
			<VOption value="alert" text="alert" />
			<VOption value="information" text="information" />
		</VSelect>
	</div>
</template>

<script setup lang="ts">
import { VAlert, VSelect, VOption } from '@vonage/vivid-vue';
import { ref } from 'vue';

const connotation =
	ref<InstanceType<typeof VAlert>['$props']['connotation']>('accent');
</script>

<style lang="scss" scoped>
.example-container {
	height: 200px;
	transform: translateX(0px);
}
</style>
