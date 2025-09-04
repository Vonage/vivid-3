<script setup lang="ts">
import { VOption, VSearchableSelect } from '@vonage/vivid-vue';
import { ref } from 'vue';

const data = ref({
	value: '',
	values: [],
});
</script>

<template>
	<main>
		<VSearchableSelect label="Searchable Select" v-model="data.value">
			<VOption value="1" text="Text 1" />
			<VOption value="2" text="Text 2" />
			<VOption value="3" text="Text 3" />
		</VSearchableSelect>
		<VSearchableSelect multiple label="Multiple" v-model:values="data.values">
			<VOption value="1" text="Text 1" />
			<VOption value="2" text="Text 2" />
			<VOption value="3" text="Text 3" />
		</VSearchableSelect>
		<pre>{{ JSON.stringify(data) }}</pre>
	</main>
</template>
