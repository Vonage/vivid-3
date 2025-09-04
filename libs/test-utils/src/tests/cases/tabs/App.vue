<script setup lang="ts">
import { VButton, VTab, VTabPanel, VTabs } from '@vonage/vivid-vue';
import { ref } from 'vue';

const data = ref({
	activeTab: 'one',
	triggered: false,
});
</script>

<template>
	<main>
		<VTabs
			:activeid="data.activeTab"
			@change="data.activeTab = $event.currentTarget.activeid"
		>
			<VTab id="one" label="Tab one" />
			<VTabPanel></VTabPanel>
			<VTab id="two" label="Tab two" />
			<VTabPanel>
				<VButton label="Click me" @click="data.triggered = true" />
			</VTabPanel>
		</VTabs>
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
