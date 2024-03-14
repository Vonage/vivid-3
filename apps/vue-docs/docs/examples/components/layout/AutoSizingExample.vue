<template>
	<div>
		<VLayout auto-sizing="fit">
			<VCard :elevation="2" text="fit" />
			<VCard :elevation="2" text="fit" />
		</VLayout>
		<VLayout auto-sizing="fill">
			<VCard :elevation="2" text="fill" />
			<VCard :elevation="2" text="fill" />
		</VLayout>
	</div>
</template>

<script setup lang="ts">
import { VLayout, VCard } from '@vonage/vivid-vue';
</script>
