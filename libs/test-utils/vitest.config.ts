import { defineConfig, mergeConfig } from 'vitest/config';
import uiVitestConfig from '@repo/vitest-config/ui';

export default mergeConfig(
	uiVitestConfig,
	defineConfig({
		test: {
			setupFiles: ['vitest.setup.ts'],
		},
	})
);
