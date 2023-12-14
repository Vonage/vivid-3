// App.vue
<template>
  <RouterView />
</template>

<style lang="scss">
/* Import Tokens For Light Theme */
@forward '@vonage/vivid/styles/tokens/theme-light.css';
/* Load Spezia Variable fonts */
@forward '@vonage/vivid/styles/fonts/spezia-variable.css';
/* (Optional) Import Theme Styles */
@forward '@vonage/vivid/styles/core/theme.css';
/* (Optional) Import Typography Styles */
@forward '@vonage/vivid/styles/core/typography.css';
/* (Optional) Import Vivid 2 Compatibility Styles */
@forward '@vonage/vivid/styles/tokens/vivid-2-compat.css';
</style>
