import { defineConfig, mergeConfig } from 'vitest/config';

import baseVitestConfig from '@repo/vitest-config/base';

export default mergeConfig(
	baseVitestConfig,
	defineConfig({
		resolve: {
			alias: {
				vue: 'vue3',
			},
		},
		define: {
			__IMPORT_META_ENV_PLACEHOLDER__: JSON.stringify({ SSR: false }),
		},
		test: {
			coverage: {
				exclude: ['src/generated'],
			},
		},
	})
);
