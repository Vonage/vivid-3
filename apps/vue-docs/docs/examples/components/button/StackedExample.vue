<template>
	<VLayout column-spacing="small" column-basis="small">
		<VButton stacked appearance="filled" label="Stacked" />
		<VButton
			stacked
			appearance="filled"
			icon="message-sent-line"
			label="With Icon"
		/>
		<VButton
			stacked
			appearance="filled"
			icon="message-sent-line"
			icon-trailing
			label="Icon Trailing"
		/>
		<VButton stacked appearance="filled" icon="message-sent-line" />
	</VLayout>
</template>
<script setup lang="ts">
import { VLayout, VButton } from '@vonage/vivid-vue';
</script>
