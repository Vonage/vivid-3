import type { PlaywrightTestConfig } from '@playwright/test';

const isDocker = Boolean(process.env.PW_TEST_CONNECT_WS_ENDPOINT);

const config: PlaywrightTestConfig = {
	testMatch: 'src/**/*.test.ts',
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
				viewport: { width: 1200, height: 750 },
			},
		},
		{
			name: 'Desktop Firefox',
			use: {
				browserName: 'firefox',
				viewport: { width: 800, height: 600 },
			},
		},
	],
	expect: {
		toMatchSnapshot: {
			threshold: 0.05,
		},
	},
	snapshotPathTemplate: isDocker
		? `{testFilePath}-snapshots/{arg}-{projectName}-linux{ext}`
		: undefined,
	webServer: {
		command: isDocker
			? 'pnpm concurrently "../../scripts/start-playwright-docker.sh" "pnpm wait-on tcp:localhost:3000 && pnpm turbo run @vonage/vivid#build && pnpm http-server ../.."'
			: 'pnpm turbo run @vonage/vivid#build && npx http-server ../..',
		url: 'http://localhost:8080',
		stdout: 'ignore',
		stderr: 'pipe',
		gracefulShutdown: { signal: 'SIGTERM', timeout: 5000 }, // Without this, SIGKILL would not shutdown docker container
	},
};

export default config;
