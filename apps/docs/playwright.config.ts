import type { PlaywrightTestConfig } from '@playwright/test';

const isDocker = Boolean(process.env.PW_TEST_CONNECT_WS_ENDPOINT);

const config: PlaywrightTestConfig = {
	testMatch: 'assets/scripts/**/*.test.ts',
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
	snapshotPathTemplate: isDocker
		? `{testFilePath}-snapshots/{arg}-{projectName}-linux{ext}`
		: undefined,
	webServer: {
		command: isDocker
			? 'pnpm concurrently "../../scripts/start-playwright-docker.sh" "pnpm wait-on tcp:localhost:3000 && pnpm turbo run @repo/docs#build && http-server dist"'
			: 'pnpm turbo run @repo/docs#build && http-server dist',
		url: 'http://localhost:8080',
		stdout: 'ignore',
		stderr: 'pipe',
	},
};

export default config;
