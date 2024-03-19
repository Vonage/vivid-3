<template>
	<div>
		<VBadge text="accent" appearance="duotone" connotation="accent" />
		<VBadge text="cta" appearance="duotone" connotation="cta" />
		<VBadge text="information" appearance="duotone" connotation="information" />
		<VBadge text="success" appearance="duotone" connotation="success" />
		<VBadge text="warning" appearance="duotone" connotation="warning" />
		<VBadge text="alert" appearance="duotone" connotation="alert" />
	</div>
</template>

<script setup lang="ts">
import { VBadge } from '@vonage/vivid-vue';
</script>
