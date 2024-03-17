<template>
	<div style="text-align: center; height: 80px">
		<span id="anchor-secondary-text" />
		<VMenu anchor="anchor-secondary-text" open>
			<VMenuItem text="menu item" text-secondary="secondary text" />
		</VMenu>
	</div>
</template>

<script setup lang="ts">
import { VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>
