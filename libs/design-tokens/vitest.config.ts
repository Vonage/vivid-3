import { defineConfig, mergeConfig } from 'vitest/config';
import vitestBaseConfig from '@repo/vitest-config/base';

export default mergeConfig(
	vitestBaseConfig,
	defineConfig({
		test: {
			include: ['scripts/**/*.spec.ts'],
		},
	})
);
