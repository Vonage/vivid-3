import { defineConfig } from 'vitepress';
import components from '../components/_index.json';
import { getComponentsMenu } from './components';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { version } from '../../../../libs/components/package.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Vivid Vue',
	description: 'Vue Wrappers for Vivid',
	lastUpdated: false,
	appearance: false,
	base: '/vivid-vue',
	themeConfig: {
		logo: { light: '/logo/vivid-logo.svg', dark: '/logo/vivid-logo.svg' },

		nav: [
			{ text: 'Home', link: '/' },
			{
				text: `v${version}`,
				items: [
					{
						text: 'Releases',
						link: 'https://github.com/Vonage/vivid-3/releases',
					},
				],
			},
		],

		sidebar: [
			{
				text: 'Components',
				collapsed: false,
				items: getComponentsMenu(components),
			},
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/Vonage/vivid-3' },
		],
	},
	head: [
		[
			'link',
			{
				rel: 'icon',
				href: '/vivid-vue/logo/vivid-logo.svg',
				type: 'image/svg+xml',
			},
		],
		// preload fonts to avoid FOUT (flash of unstyled text)
		[
			'link',
			{
				rel: 'preload',
				href: 'https://fonts.resources.vonage.com/fonts/v2/SpeziaCompleteVariableUprightWeb.woff2',
				type: 'font/woff2',
				as: 'font',
				crossorigin: 'anonymous',
			},
		],
		[
			'link',
			{
				rel: 'preload',
				href: 'https://fonts.resources.vonage.com/fonts/v2/SpeziaMonoCompleteVariableWeb.woff2',
				type: 'font/woff2',
				as: 'font',
				crossorigin: 'anonymous',
			},
		],
	],
	outDir: '../../../dist/apps/docs/vivid-vue',
});
