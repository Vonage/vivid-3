<script setup lang="ts">
import { ref } from 'vue';
import { VTag, VTagGroup } from '@vonage/vivid-vue';

const data = ref({
	clicked: false,
	removed: false,
	selected: false,
});
</script>

<template>
	<main>
		<VTagGroup>
			<VTag label="Tag" @click="data.clicked = true" />
			<VTag label="Removable" removable @removed="data.removed = true" />
			<VTag
				label="Selectable"
				selectable
				@selected-change="data.selected = $event.currentTarget.selected"
			/>
			<VTag label="Selected" selected />
			<VTag label="Disabled" disabled />
		</VTagGroup>
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
