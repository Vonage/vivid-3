// main.ts
import Vue from 'vue';
import { setCustomComponentPrefix } from '@vonage/vivid-vue';
import App from './App.vue';

// set custom component prefix for the whole application (e.g. fraud-detection, etc.)
setCustomComponentPrefix('my-app');

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
