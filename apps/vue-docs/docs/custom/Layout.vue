<template>
	<div>
		<Layout />
	</div>
</template>

<script setup lang="ts">
import Layout from 'vitepress/dist/client/theme-default/Layout.vue';
</script>

<style lang="scss">
@forward '@repo/styles/tokens/theme-light.css';
@forward '@repo/styles/fonts/spezia-variable.css';
</style>

<style scoped lang="scss">
@forward '@repo/styles/core/all.css';
</style>
