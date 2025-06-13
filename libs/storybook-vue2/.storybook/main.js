/** @type { import('@storybook/vue-vite').StorybookConfig } */
const config = {
	stories: ['../../vue-wrappers/stories/*.stories.js'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
	],
	framework: {
		name: '@storybook/vue-vite',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
};
export default config;
