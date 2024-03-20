<template>
	<div>
		<Layout />
	</div>
</template>

<script setup lang="ts">
import Layout from 'vitepress/dist/client/theme-default/Layout.vue';
</script>

<style lang="scss">
@forward '../../../../dist/libs/styles/tokens/theme-light.css';
@forward '../../../../dist/libs/styles/fonts/spezia-variable.css';
</style>

<style scoped lang="scss">
@forward '../../../../dist/libs/styles/core/all.css';
</style>
