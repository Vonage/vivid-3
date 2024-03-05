<template>
	<div style="block-size: 460px">
		<form>
			<VLayout column-spacing="small" column-basis="block">
				<div>
					<VDateRangePicker name="date" label="Date range" required />
				</div>
				<div class="buttons">
					<VButton label="Reset" type="reset" />
					<VButton label="Submit" appearance="filled" type="submit" />
				</div>
			</VLayout>
		</form>
	</div>
</template>

<script setup lang="ts">
import { VButton, VDateRangePicker, VLayout } from '@vonage/vivid-vue';
</script>

<style lang="scss" scoped>
.buttons {
	display: flex;
	gap: 12px;
}
</style>
