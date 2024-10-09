<template>
	<div class="container">
		<VSearchableSelect
			:values="values"
			multiple
			label="Countries"
			@update:values="values = $event"
		>
			<VOption value="afghanistan" text="Afghanistan" />
			<VOption value="albania" text="Albania" />
			<VOption value="algeria" text="Algeria" />
		</VSearchableSelect>
		<!-- In Vue 3 you can use v-model shorthand instead of values and @update:values
      <VSearchableSelect v-model:values="values">
    -->
	</div>
</template>

<script setup lang="ts">
import { VSearchableSelect, VOption } from '@vonage/vivid-vue';
import { ref } from 'vue';

const values = ref([]);
</script>

<style scoped>
.container {
	block-size: 230px;
}
</style>
