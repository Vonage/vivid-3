<template>
	<VTreeView>
		<VTreeItem text="Tree Item 1">
			<template #item>
				<VTreeItem slot="item" text="Tree Item 1 - 1" />
			</template>
		</VTreeItem>
		<VTreeItem text="Tree Item 2" />
	</VTreeView>
</template>
<script setup lang="ts">
import { VTreeItem, VTreeView } from '@vonage/vivid-vue';
</script>
