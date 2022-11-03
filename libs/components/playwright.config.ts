import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	testMatch: 'src/**/*.test.ts',
	outputDir: '../../test-results',
	projects: [
		{
			name: 'Desktop Chromium',
			use: {
				browserName: 'chromium'
			},
		},
		{
			name: 'Desktop Safari',
			use: {
				browserName: 'webkit',
				viewport: { width: 1200, height: 750 },
			}
		},
		{
			name: 'Desktop Firefox',
			use: {
				browserName: 'firefox',
				viewport: { width: 800, height: 600 },
			}
		},
	]
};

export default config;
