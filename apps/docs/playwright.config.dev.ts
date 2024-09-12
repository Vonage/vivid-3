import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	testMatch: 'assets/scripts/**/*.test.ts',
	timeout: 0,
	projects: [
		{
			name: 'Desktop Chromium',
			use: {
				browserName: 'chromium',
				headless: false,
			},
		},
	],
};
export default config;
