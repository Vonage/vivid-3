<template>
	<VAccordion>
		<VAccordionItem heading="Accordion item 1" expanded>
			This is the first item's accordion body.
		</VAccordionItem>
		<VAccordionItem heading="Accordion item 2">
			This is the second item's accordion body.
		</VAccordionItem>
		<VAccordionItem heading="Accordion item 3">
			This is the third item's accordion body.
		</VAccordionItem>
		<VAccordionItem heading="Accordion item 4">
			This is the fourth item's accordion body.
		</VAccordionItem>
	</VAccordion>
</template>

<script setup lang="ts">
import { VAccordion, VAccordionItem } from '@vonage/vivid-vue';
</script>
