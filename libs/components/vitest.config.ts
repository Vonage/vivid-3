import { defineConfig, mergeConfig } from 'vitest/config';
import { packageVersion } from './vite.config.base';
import vitestBaseConfig from '@repo/vitest-config/ui';

export default mergeConfig(
	vitestBaseConfig,
	defineConfig({
		test: {
			setupFiles: ['vitest.setup.ts'],
			pool: 'threads',
		},
		define: {
			__PACKAGE_VERSION__: JSON.stringify(packageVersion),
		},
	})
);
