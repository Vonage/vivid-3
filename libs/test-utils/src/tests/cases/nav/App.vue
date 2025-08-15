<script setup lang="ts">
import { VNav, VNavDisclosure, VNavItem } from '@vonage/vivid-vue';
import { ref } from 'vue';

const data = ref({
	open: false,
	triggered: false,
});
</script>

<template>
	<main>
		<VNav>
			<VNavDisclosure
				label="Disclosure 1"
				:open="data.open"
				@toggle="data.open = $event.currentTarget.open"
				current
			>
				<VNavItem label="Item 1" current @click="data.triggered = true" />
			</VNavDisclosure>
			<VNavItem label="Item 2" />
		</VNav>
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
