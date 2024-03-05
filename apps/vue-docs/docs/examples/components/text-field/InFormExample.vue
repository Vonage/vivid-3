<template>
	<form method="post" action="">
		<VLayout column-spacing="small" column-basis="block">
			<VTextField
				required
				label="Add email"
				placeholder="e.g. john@doe.dev"
				type="email"
				name="email"
				autocomplete="email"
				icon="search"
				maxlength="30"
				char-count
				style="justify-self: flex-start"
			/>
			<VButton label="Submit" appearance="filled" type="submit" />
		</VLayout>
	</form>
</template>

<script setup lang="ts">
import { VLayout, VTextField, VButton } from '@vonage/vivid-vue';
</script>
