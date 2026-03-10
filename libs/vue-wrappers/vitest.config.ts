import { defineConfig, mergeConfig } from 'vitest/config';

import baseVitestConfig from '@repo/vitest-config/base';

export default mergeConfig(
	baseVitestConfig,
	defineConfig({
		test: {
			coverage: {
				exclude: ['src/generated'],
			},
		},
	})
);
