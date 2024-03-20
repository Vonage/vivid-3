<template>
	<div class="example-container">
		<VAlert class="small-alert" placement="top-start" text="top-start" open />
		<VAlert class="small-alert" placement="top" text="top" open />
		<VAlert class="small-alert" placement="top-end" text="top-end" open />
		<VAlert
			class="small-alert"
			placement="bottom-start"
			text="bottom-start"
			open
		/>
		<VAlert class="small-alert" placement="bottom" text="bottom" open />
		<VAlert class="small-alert" placement="bottom-end" text="bottom-end" open />
	</div>
</template>

<script setup lang="ts">
import { VAlert } from '@vonage/vivid-vue';
</script>

<style lang="scss" scoped>
.example-container {
	height: 200px;
	transform: translateX(0px);
}

.small-alert {
	--alert-min-inline-size: 200px;
}
</style>
