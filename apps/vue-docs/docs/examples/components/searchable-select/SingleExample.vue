<template>
	<div class="container">
		<VSearchableSelect v-model="value" label="Countries">
			<VOption value="afghanistan" text="Afghanistan" />
			<VOption value="albania" text="Albania" />
			<VOption value="algeria" text="Algeria" />
		</VSearchableSelect>
	</div>
</template>

<script setup lang="ts">
import { VSearchableSelect, VOption } from '@vonage/vivid-vue';
import { ref } from 'vue';

const value = ref('');
</script>

<style scoped>
.container {
	block-size: 230px;
}
</style>
