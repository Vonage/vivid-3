<template>
	<div style="text-align: center; height: 150px">
		<span id="anchor-max-inline-size" />
		<VMenu
			anchor="anchor-max-inline-size"
			open
			style="--menu-max-inline-size: 300px"
		>
			<VMenuItem
				text="Lorem ipsum dolor sit amet, consectetur adipisicing elit"
			/>
		</VMenu>
	</div>
</template>

<script setup lang="ts">
import { VMenu, VMenuItem } from '@vonage/vivid-vue';
</script>
