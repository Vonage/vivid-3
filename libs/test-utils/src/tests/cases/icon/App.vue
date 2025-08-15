<script setup lang="ts">
import { VButton, VIcon } from '@vonage/vivid-vue';
</script>

<template>
	<main>
		<VIcon data-test-id="icon" name="user-line" />
		<VButton label="With Icon Attribute" icon="user-line" />
		<VButton label="With Icon Slot">
			<template #icon><VIcon name="user-line" /></template>
		</VButton>
	</main>
</template>
