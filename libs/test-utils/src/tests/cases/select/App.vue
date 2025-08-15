<script setup lang="ts">
import { VOption, VSelect } from '@vonage/vivid-vue';
import { ref } from 'vue';

const value = ref('1');
</script>

<template>
	<main>
		<VSelect label="Select" v-model="value">
			<VOption value="1" label="Option 1" text="Text 1" />
			<VOption value="2" label="Option 2" text="Text 2" />
			<VOption value="3" label="Option 3" text="Text 3" />
		</VSelect>
		<pre>{{
			JSON.stringify({
				value,
			})
		}}</pre>
	</main>
</template>
