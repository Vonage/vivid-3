import { defineConfig, mergeConfig } from 'vitest/config';
import vitestBaseConfig from '@repo/vitest-config/ui';
import { packageVersion } from './vite.config.base';

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
