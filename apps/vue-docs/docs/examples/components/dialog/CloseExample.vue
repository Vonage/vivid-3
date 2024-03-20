<template>
	<div style="height: 230px">
		<VDialog ref="dialog" open headline="Open Dialog" />
		<VButton label="Close Dialog" @click="closeDialog" />
	</div>
</template>

<script setup lang="ts">
import { VButton, VDialog } from '@vonage/vivid-vue';
import { ref } from 'vue';

const dialog = ref<VDialog>(null);

function closeDialog() {
	dialog.value.close();
}
</script>
