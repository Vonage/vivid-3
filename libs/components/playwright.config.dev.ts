import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	testMatch: 'src/**/*.test.ts',
	timeout: 0,
	projects: [
		{
			name: 'Desktop Chromium',
			use: {
				browserName: 'chromium',
				headless: false
			},
		},
	]
};
export default config;
