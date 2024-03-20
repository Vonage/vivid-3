<template>
	<div style="height: 250px">
		<VDialog headline="Returning Dialog" :open="open" @close="open = false">
			<template #footer>
				<div class="demo-footer">
					<VButton
						appearance="outlined"
						label="Cancel"
						@click="handleReturn('Cancel')"
					/>
					<VButton
						appearance="filled"
						label="Action"
						@click="handleReturn('Action')"
					/>
				</div>
			</template>
		</VDialog>
		<div>Returned Value: {{ returnValue }}</div>
		<VButton label="Open Dialog" @click="open = true" />
	</div>
</template>

<script setup lang="ts">
import { VButton, VDialog } from '@vonage/vivid-vue';
import { ref } from 'vue';

const open = ref(true);
const returnValue = ref('');

function handleReturn(value: string) {
	returnValue.value = value;
	open.value = false;
}
</script>

<style scoped>
.demo-footer {
	display: flex;
	justify-content: flex-end;
	column-gap: 8px;
	margin-top: 8px;
}
</style>
