<template>
	<VLayout>
		<VProgress :min="0" :max="50" :value="25" shape="rounded" />
		<VProgress :min="0" :max="50" :value="25" shape="sharp" />
	</VLayout>
</template>

<script setup lang="ts">
import { VLayout, VProgress } from '@vonage/vivid-vue';
</script>
