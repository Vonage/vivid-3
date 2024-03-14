<template>
	<VNav>
		<VNavDisclosure label="1st level item">
			<VNavItem href="#" text="2nd level item" />
		</VNavDisclosure>
	</VNav>
</template>

<script setup lang="ts">
import { VNav, VNavDisclosure, VNavItem } from '@vonage/vivid-vue';
</script>
