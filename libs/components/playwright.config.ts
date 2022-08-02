import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	shard: {
		total: process.env.TOTAL_SHARDS ? Number(process.env.TOTAL_SHARDS) : 1,
		current: process.env.CURRENT_SHARD ? Number(process.env.CURRENT_SHARD) : 1,
	},
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
