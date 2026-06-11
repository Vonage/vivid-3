import { defineConfig, mergeConfig } from 'vitest/config';
import baseConfig from '@repo/vitest-config/base';

export default mergeConfig(
	baseConfig,
	defineConfig({
		test: {
			include: ['{src,scripts}/**/*.{spec,test}.{js,ts,jsx,tsx}'],
		},
	})
);
