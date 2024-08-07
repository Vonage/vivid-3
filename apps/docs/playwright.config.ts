import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	testMatch: 'assets/scripts/**/*.test.ts',
	outputDir: '../../test-results',
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
