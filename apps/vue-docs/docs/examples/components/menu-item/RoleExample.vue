<template>
	<div style="text-align: center; height: 340px">
		<span id="anchor-role" />
		<VMenu anchor="anchor-role" open>
			<VMenuItem text="Menu item 1" />
			<VMenuItem text="Menu item 2" />
			<VDivider />
			<VMenuItem control-type="checkbox" text="Checkbox 1" />
			<VMenuItem control-type="checkbox" text="Checkbox 2" />
			<VDivider />
			<VMenuItem control-type="radio" text="Radio 1.1" />
			<VMenuItem control-type="radio" text="Radio 1.2" />
			<VDivider />
			<VMenuItem control-type="radio" text="Radio 2.1" />
			<VMenuItem control-type="radio" text="Radio 2.2" />
		</VMenu>
	</div>
</template>

<script setup lang="ts">
import { VDivider, VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>
