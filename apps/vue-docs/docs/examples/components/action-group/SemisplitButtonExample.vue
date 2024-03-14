<template>
	<div>
		<VActionGroup shape="pill">
			<VButton label="My Action" appearance="ghost" shape="pill" />
			<VDivider orientation="vertical" />
			<VButton shape="pill" icon="chevron-down-solid" />
		</VActionGroup>
		<VActionGroup shape="pill" tight>
			<VButton label="My Action" appearance="ghost" shape="pill" />
			<VButton shape="pill" icon="chevron-down-solid" />
		</VActionGroup>
	</div>
</template>

<script setup lang="ts">
import { VButton, VActionGroup, VDivider } from '@vonage/vivid-vue';
</script>
