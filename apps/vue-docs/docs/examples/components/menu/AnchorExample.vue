<template>
	<div style="height: 150px">
		<VMenu :open="open1">
			<template #anchor>
				<VButton
					label="Toggle Menu"
					appearance="outlined"
					@click="open1 = !open1"
				/>
			</template>
			<VMenuItem text="Menu item 1" />
			<VMenuItem text="Menu item 2" />
		</VMenu>

		<VButton
			ref="button"
			label="Toggle Menu"
			appearance="outlined"
			@click="open2 = !open2"
		/>
		<VMenu :anchor="$refs.button?.$el" :open="open2">
			<VMenuItem text="Menu item 1" />
			<VMenuItem text="Menu item 2" />
		</VMenu>
	</div>
</template>

<script setup lang="ts">
import { VButton, VMenu, VMenuItem } from '@vonage/vivid-vue';
import { ref } from 'vue';

const open1 = ref(false);
const open2 = ref(false);
</script>
