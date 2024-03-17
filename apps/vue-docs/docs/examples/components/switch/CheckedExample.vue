<template>
	<VSwitch v-model="value" />
</template>

<script setup lang="ts">
import { VSwitch } from '@vonage/vivid-vue';
import { ref } from 'vue';

const value = ref(false);
</script>
