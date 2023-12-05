<template>
  <div>
    <Layout />
  </div>
</template>

<script setup lang="ts">
import Layout from 'vitepress/dist/client/theme-default/Layout.vue';
</script>

<style lang="scss">
@forward '@vonage/vivid/styles/tokens/theme-light.css';
@forward '@vonage/vivid/styles/fonts/spezia-variable.css';
</style>

<style scoped lang="scss">
@forward '@vonage/vivid/styles/core/all.css';
</style>
