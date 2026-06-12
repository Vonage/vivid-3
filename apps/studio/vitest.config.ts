import { resolve } from 'node:path';
import { defineConfig, mergeConfig } from 'vitest/config';
import vitestBaseConfig from '@repo/vitest-config/ui';

export default mergeConfig(
	vitestBaseConfig,
	defineConfig({
		test: {
			setupFiles: ['./vitest.setup.ts'],
		},
		resolve: {
			alias: {
				'virtual:vivid-metadata': resolve(
					import.meta.dirname,
					'../../libs/components/metadata.json'
				),
			},
		},
	})
);
