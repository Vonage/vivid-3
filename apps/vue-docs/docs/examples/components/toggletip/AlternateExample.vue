<template>
	<div>
		<VButton id="button5" icon="help-solid" shape="pill" />
		<VToggletip anchor="button5" alternate>An alternate toggletip</VToggletip>
	</div>
</template>

<script setup lang="ts">
import { VButton, VToggletip } from '@vonage/vivid-vue';
</script>
