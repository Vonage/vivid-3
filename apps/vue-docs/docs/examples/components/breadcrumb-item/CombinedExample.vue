<template>
	<div style="display: flex">
		<VBreadcrumbItem text="Breadcrumb" href="https://apps.vivid.vonage.com" />
		<VBreadcrumbItem text="Breadcrumb" href="https://apps.vivid.vonage.com" />
		<VBreadcrumbItem text="..." />
		<VBreadcrumbItem text="Breadcrumb" />
	</div>
</template>

<script setup lang="ts">
import { VBreadcrumbItem } from '@vonage/vivid-vue';
</script>
