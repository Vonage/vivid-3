// main.ts
import { createApp } from 'vue';
import { optionalStyles, vivid3 } from '@vonage/vivid-vue';
import App from './App.vue';

createApp(App)
  .use(vivid3, {
    styles: [optionalStyles.theme, optionalStyles.typography, optionalStyles.vivid2Compat],
  })
  .mount('#app');
