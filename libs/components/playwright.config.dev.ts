import { PlaywrightTestConfig } from '@playwright/test';

interface PlaywrightTestConfigWithRegression extends PlaywrightTestConfig {

}

const config: PlaywrightTestConfigWithRegression = {
	testMatch: 'src/**/*.test.ts',
	timeout: 0,
	projects: [
		{
			name: 'Chrome Stable',
			use: {
				browserName: 'chromium',
				channel: 'chrome',
				headless: false
			},
		}
	]
};
export default config;
