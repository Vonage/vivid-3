<template>
	<VLayout>
		<VProgress :min="0" :max="100" :value="25" connotation="accent" />
		<VProgress :min="0" :max="100" :value="25" connotation="cta" />
		<VProgress :min="0" :max="100" :value="25" connotation="success" />
		<VProgress :min="0" :max="100" :value="25" connotation="alert" />
		<VProgress :min="0" :max="100" :value="25" connotation="pacific" />
	</VLayout>
</template>

<script setup lang="ts">
import { VLayout, VProgress } from '@vonage/vivid-vue';
</script>
