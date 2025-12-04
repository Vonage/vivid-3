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

		define: {
			// Prevent vite from replacing import.meta.env?.SSR with false:
			__IMPORT_META_ENV_PLACEHOLDER__: 'import.meta.env',
		},
	})
);
