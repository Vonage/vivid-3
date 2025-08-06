<script setup lang="ts">
import { VButton, VCard } from '@vonage/vivid-vue';
import { ref } from 'vue';

const cards = ref([]);
</script>

<template>
	<main>
		<VButton label="Add Card" @click="cards.push(`Card ${cards.length}`)" />
		<VCard v-for="card in cards" :key="card" :headline="card" />
	</main>
</template>
