<template>
	<VLayout column-spacing="small" column-basis="small">
		<VButton label="ghost" appearance="ghost" />
		<VButton label="filled" appearance="filled" />
		<VButton label="outlined" appearance="outlined" />
	</VLayout>
</template>
<script setup lang="ts">
import { VLayout, VButton } from '@vonage/vivid-vue';
</script>
