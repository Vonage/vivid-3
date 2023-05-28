import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	testMatch: 'src/**/*.a11y.ts',
	outputDir: '../../test-results',
	projects: [
		{
			name: 'Desktop Chromium',
			use: {
				browserName: 'chromium',
				launchOptions: {
					args: ['--remote-debugging-port=9222'],
				},
			},
		},
	]
};

export default config;
