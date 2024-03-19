<template>
	<div>
		<VLayout gutters="small" column-spacing="small">
			<VCard :elevation="2" text="small" />
			<VCard :elevation="2" text="small" />
			<VCard :elevation="2" text="small" />
		</VLayout>
		<VLayout gutters="small" column-spacing="medium">
			<VCard :elevation="2" text="medium" />
			<VCard :elevation="2" text="medium" />
			<VCard :elevation="2" text="medium" />
		</VLayout>
		<VLayout gutters="small" column-spacing="large">
			<VCard :elevation="2" text="large" />
			<VCard :elevation="2" text="large" />
			<VCard :elevation="2" text="large" />
		</VLayout>
	</div>
</template>

<script setup lang="ts">
import { VLayout, VCard } from '@vonage/vivid-vue';
</script>
