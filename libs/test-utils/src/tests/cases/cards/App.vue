<script setup lang="ts">
import { VButton, VCard } from '@vonage/vivid-vue';
import { ref } from 'vue';

const cards = ref([]);
</script>

<template>
	<main>
		<VButton
			label="Add Card"
			data-testid="add-card"
			@click="cards.push(`Card ${cards.length}`)"
		/>
		<div data-testid="cards">
			<VCard v-for="card in cards" :key="card" :headline="card" />
		</div>
		<pre>{}</pre>
	</main>
</template>
