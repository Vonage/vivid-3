import type { StorybookConfig } from '@storybook/react-vite';
import type { InlineConfig } from 'vite';

const config: StorybookConfig = {
	stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	viteFinal(config: InlineConfig) {
		return {
			...config,
			optimizeDeps: {
				...config.optimizeDeps,
				include: [
					...(config.optimizeDeps?.include ?? []),
					'react',
					'react-dom',
					'react/jsx-runtime',
				],
			},
		};
	},
};
export default config;
