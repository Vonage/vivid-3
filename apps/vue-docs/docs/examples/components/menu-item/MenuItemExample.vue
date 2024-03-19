<template>
	<div style="text-align: center; height: 60px">
		<span id="anchor-menu-item" />
		<VMenu anchor="anchor-menu-item" open>
			<VMenuItem text="Menu item" />
		</VMenu>
	</div>
</template>

<script setup lang="ts">
import { VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>
