/// <reference types="vitest/config" />
import * as path from 'path';
import * as fs from 'fs';
import { defineConfig, mergeConfig } from 'vite';
import { NodePackageImporter } from 'sass';
import vitestBaseConfig from '@repo/vitest-config/ui';

const packageVersion = JSON.parse(
	fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8')
).version;

const isWatchMode = process.env.WATCH_MODE === 'true';

export default mergeConfig(
	vitestBaseConfig,
	defineConfig({
		build: {
			outDir: 'dist',
			cssMinify: true,
			target: 'esnext',
			watch: isWatchMode
				? {
						exclude: ['**/*.md'],
				  }
				: null,
		},
		define: {
			__PACKAGE_VERSION__: JSON.stringify(packageVersion),
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
					importers: [new NodePackageImporter()],
				},
			},
		},
	})
);
