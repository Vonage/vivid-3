import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	testMatch: 'src/tests/**/*.pw.ts',
	timeout: 10000,
	use: {
		actionTimeout: 2000,
	},
	expect: {
		timeout: 3000,
	},
	projects: [
		{
			name: 'Desktop Chromium',
			use: {
				browserName: 'chromium',
			},
		},
		{
			name: 'Desktop Safari',
			use: {
				browserName: 'webkit',
			},
		},
		{
			name: 'Desktop Firefox',
			use: {
				browserName: 'firefox',
			},
		},
	],
};

export default config;
