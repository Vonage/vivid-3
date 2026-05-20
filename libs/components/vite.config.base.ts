import * as path from 'path';
import * as fs from 'fs';
import { defineConfig, mergeConfig } from 'vite';
import { NodePackageImporter } from 'sass';
import baseViteConfig from '@repo/vite-config/base';

export const packageVersion = JSON.parse(
	fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8')
).version;

const isWatchMode = process.env.WATCH_MODE === 'true';

const baseConfig = mergeConfig(
	baseViteConfig,
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
					importers: [new NodePackageImporter()],
				},
			},
		},
	})
);

export default baseConfig;
