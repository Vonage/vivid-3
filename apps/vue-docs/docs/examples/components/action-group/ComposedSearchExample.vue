<template>
	<VActionGroup shape="pill">
		<VButton
			label="Action"
			appearance="ghost"
			icon="chevron-down-solid"
			icon-trailing
			shape="pill"
		/>
		<VDivider orientation="vertical" />
		<VTextField
			icon="search-line"
			placeholder="Search..."
			appearance="ghost"
			shape="pill"
			style="min-width: 160px"
		/>
	</VActionGroup>
</template>

<script setup lang="ts">
import { VActionGroup, VButton, VDivider, VTextField } from '@vonage/vivid-vue';
</script>
