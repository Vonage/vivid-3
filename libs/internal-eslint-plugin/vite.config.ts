import { defineConfig, mergeConfig } from 'vite';
import dts from 'vite-plugin-dts';
import baseViteConfig from '@repo/vite-config/base';
import baseVitestConfig from '@repo/vitest-config/base';

export default mergeConfig(
	mergeConfig(baseViteConfig, baseVitestConfig),
	defineConfig({
		plugins: [dts()],

		build: {
			lib: {
				entry: 'src/index.ts',
				fileName: 'index',
				formats: ['es', 'cjs'],
			},
			target: 'esnext',
			rolldownOptions: {
				external: ['@microsoft/fast-element', '@typescript-eslint/utils'],
			},
		},
	})
);
