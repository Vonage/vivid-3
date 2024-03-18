<template>
	<VTreeView>
		<VTreeItem text="Tree Item" expanded>
			<template #item>
				<VTreeItem text="Tree Item 1 - 1" />
			</template>
		</VTreeItem>
	</VTreeView>
</template>
<script setup lang="ts">
import { VTreeView, VTreeItem } from '@vonage/vivid-vue';
</script>
