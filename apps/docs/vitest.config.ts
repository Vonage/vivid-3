import { defineConfig, mergeConfig } from 'vitest/config';
import vitestBaseConfig from '@repo/vitest-config/ui';

export default mergeConfig(
	vitestBaseConfig,
	defineConfig({
		test: {
			include: ['assets/scripts/**/*.spec.ts'],
			setupFiles: ['./vitest.setup.ts'],
		},
	})
);
