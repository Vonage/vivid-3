<template>
	<div style="height: 250px">
		<VDialog
			open
			headline="Dialog with footer"
			subtitle="this is an example of the dialog with slotted buttons inside footer"
		>
			<template #footer>
				<div class="demo-footer">
					<VButton appearance="outlined" label="Cancel" />
					<VButton appearance="filled" label="Action" />
				</div>
			</template>
		</VDialog>
	</div>
</template>

<script setup lang="ts">
import { VDialog, VButton } from '@vonage/vivid-vue';
</script>

<style scoped>
.demo-footer {
	display: flex;
	justify-content: flex-end;
	column-gap: 8px;
	margin-top: 16px;
}
</style>
