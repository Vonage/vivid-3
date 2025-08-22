<script setup lang="ts">
import { VAccordion, VAccordionItem, VButton } from '@vonage/vivid-vue';
import { ref } from 'vue';

const data = ref({
	clicked: false,
});
</script>

<template>
	<main>
		<VAccordion>
			<VAccordionItem heading="Accordion Item 1" />
			<VAccordionItem heading="Accordion Item 2">
				<VButton label="Click me" @click="data.clicked = true" />
			</VAccordionItem>
		</VAccordion>
		<VAccordion expand-mode="multi">
			<VAccordionItem heading="Multi Item 1" />
		</VAccordion>
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
