<template>
	<VCard>
		<template #main>
			<VLayout column-basis="block" gutters="small">
				Choose the button you like best in this card :)

				<VDivider />

				<div class="demo-footer">
					<VButton label="cancel" appearance="outlined" />
					<VButton label="Submit" appearance="filled" />
				</div>
			</VLayout>
		</template>
	</VCard>
</template>

<script setup lang="ts">
import { VButton, VLayout, VCard, VDivider } from '@vonage/vivid-vue';
</script>
<style scoped lang="scss">
vvd3-card {
	width: 400px;
}

.demo-footer {
	display: flex;
	column-gap: 8px;
	justify-content: flex-end;
}
</style>
