import { defineConfig, mergeConfig } from 'vitest/config';
import uiVitestConfig from '@repo/vitest-config/ui';
import vue from '@vitejs/plugin-vue';

export default mergeConfig(
	uiVitestConfig,
	defineConfig({
		plugins: [vue()],
		test: {
			setupFiles: ['vitest.setup.ts'],
		},
	})
);
