<template>
	<div style="text-align: center; height: 60px">
		<span id="anchor-icon" />
		<VMenu anchor="anchor-icon" open>
			<VMenuItem icon="file-pdf-line" text="Export to PDF" />
		</VMenu>
	</div>
</template>

<script setup lang="ts">
import { VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>
