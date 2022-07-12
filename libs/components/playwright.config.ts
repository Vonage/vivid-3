import type { PlaywrightTestConfig } from '@playwright/test';

interface PlaywrightTestConfigWithRegression extends PlaywrightTestConfig {

}

const config: PlaywrightTestConfigWithRegression = {
	testMatch: 'src/**/*.test.ts',
	outputDir: '../../test-results',
	projects: [
		{
			name: 'Chrome Stable',
			use: {
				browserName: 'chromium',
				channel: 'chrome',
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
