import { createApp } from 'vue';
import { vivid3 } from '@vonage/vivid-vue';

const test = new URL(import.meta.url).searchParams.get('test');
const Comp = (await import(`./${test}/App.vue`)).default;

createApp(Comp)
	.use(vivid3, {
		font: 'spezia',
		customComponentPrefix: 'vwc',
	})
	.mount('body');
