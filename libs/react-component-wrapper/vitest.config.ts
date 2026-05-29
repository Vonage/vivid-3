import { defineConfig, mergeConfig } from 'vitest/config';
import baseConfig from '@repo/vitest-config/ui';

export default mergeConfig(
	baseConfig,
	defineConfig({
		test: {
			include: [
				'src/**/*.spec.{ts,tsx,js,jsx}',
				'src/**/*.test.{ts,tsx,js,jsx}',
			],
		},
	})
);
