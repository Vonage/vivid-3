<template>
	<VTreeView>
		<VTreeItem text="Tree Item 1">
			<template #item>
				<VTreeItem text="Tree Item 1 - 1" />
			</template>
		</VTreeItem>
		<VTreeItem text="Tree Item 2" />
	</VTreeView>
</template>
<script setup lang="ts">
import { VTreeView, VTreeItem } from '@vonage/vivid-vue';
</script>
