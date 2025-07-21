import { defineProject, mergeConfig } from 'vitest/config';
import baseConfig from './node-config.js';

export default mergeConfig(
	baseConfig,
	defineProject({
		test: {
			environment: 'jsdom',
		},
	})
);
