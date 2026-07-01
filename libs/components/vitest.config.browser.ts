import { defineConfig, mergeConfig } from 'vitest/config';
import type { PlaywrightProviderOptions } from '@vitest/browser-playwright';
import { playwright } from '@vitest/browser-playwright';
import baseViteConfig from './vite.config.base';
import BrowserCommands from '@repo/browser-tests/browser-commands-plugin';
import ServeLocalIcons from '@repo/browser-tests/serve-local-icons-plugin';

const isDocker = Boolean(process.env.PW_TEST_CONNECT_WS_ENDPOINT);
const wsEndpoint = process.env.PW_TEST_CONNECT_WS_ENDPOINT;

const providerOptions: PlaywrightProviderOptions = isDocker
	? {
			connectOptions: {
				wsEndpoint: wsEndpoint!,
				exposeNetwork: '<loopback>',
			},
		}
	: {
			launchOptions: {
				executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
			},
		};

export default mergeConfig(
	baseViteConfig,
	defineConfig({
		oxc: {
			jsx: {
				runtime: 'automatic',
				importSource: '@repo/vvd-jsx',
			},
		},
		plugins: [BrowserCommands(), ServeLocalIcons()],

		test: {
			include: ['src/lib/*/**/*.browser-spec.{ts,tsx}'],
			setupFiles: ['@repo/browser-tests/setup'],
			browser: {
				enabled: true,
				provider: playwright({
					...providerOptions,
					contextOptions: {
						viewport: {
							width: 1000,
							height: 1000,
						},
						reducedMotion: 'reduce',
					},
				}),
				headless: true,
				viewport: {
					width: 1000,
					height: 1000,
				},
				instances: [
					{ browser: 'chromium' },
					{ browser: 'firefox' },
					{ browser: 'webkit' },
				],
				expect: {
					toMatchScreenshot: {
						// When using docker, use `linux` as the platform instead of the host platform
						resolveScreenshotPath: (data) =>
							`${data.root}/${data.testFileDirectory}/${data.screenshotDirectory}/${data.testFileName}/${data.arg}-${data.browserName}-${isDocker ? 'linux' : data.platform}${data.ext}`,
					},
				},
			},
		},
	})
);
