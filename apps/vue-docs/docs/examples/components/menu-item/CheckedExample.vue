<template>
	<div style="text-align: center; height: 60px">
		<span id="anchor-checked" />
		<VMenu anchor="anchor-checked" open>
			<VMenuItem control-type="checkbox" checked text="Checked Menu item" />
		</VMenu>
	</div>
</template>

<script setup lang="ts">
import { VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>
