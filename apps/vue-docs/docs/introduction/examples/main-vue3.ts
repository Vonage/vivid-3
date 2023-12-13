// main.ts
import { createApp } from 'vue';
import { vivid3 } from '@vonage/vivid-vue';
import App from './App.vue';

createApp(App)
  .use(vivid3, {
    font: 'spezia',
    customComponentPrefix: 'my-app',
  })
  .mount('#app');
